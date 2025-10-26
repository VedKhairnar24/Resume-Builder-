import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmailVerification, sendPasswordReset, sendWelcomeEmail } from '../services/emailService.js';
import { auditLogger } from '../middleware/security.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email address'
      });
    }

    // Create user
    user = await User.create({
      name: {
        first: name.first,
        last: name.last
      },
      email,
      password
    });

    // Generate email verification token
    const verificationToken = user.getEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Send verification email
    try {
      await sendEmailVerification(user, verificationToken);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail registration if email sending fails
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        error: 'Account temporarily locked due to too many failed login attempts'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      // Increment login attempts
      await user.incLoginAttempts();
      
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    await user.updateLastLogin();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Verify email address
// @route   GET /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Verification token is required'
      });
    }

    // Hash the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with this token and check if it's not expired
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired verification token'
      });
    }

    // Update user
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    // Send welcome email
    try {
      await sendWelcomeEmail(user);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Email verified successfully! Welcome to Resume Builder!'
    });
  } catch (err) {
    console.error('Email verification error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No user found with this email address'
      });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Send reset email
    try {
      await sendPasswordReset(user, resetToken);
      
      res.status(200).json({
        success: true,
        message: 'Password reset email sent'
      });
    } catch (emailError) {
      console.error('Password reset email failed:', emailError);
      
      user.passwordResetToken = undefined;
      user.passwordResetExpire = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(500).json({
        success: false,
        error: 'Failed to send password reset email'
      });
    }
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with this token and check if it's not expired
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired reset token'
      });
    }

    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (err) {
    console.error('Update password error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      'careerProfile.targetRole': req.body.targetRole,
      'careerProfile.industry': req.body.industry,
      'careerProfile.careerStage': req.body.careerStage,
      'careerProfile.location': req.body.location,
      'careerProfile.phone': req.body.phone,
      profilePicture: req.body.profilePicture
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => {
      if (fieldsToUpdate[key] === undefined) {
        delete fieldsToUpdate[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update user preferences
// @route   PUT /api/auth/preferences
// @access  Private
export const updatePreferences = async (req, res) => {
  try {
    const { emailNotifications, marketingEmails, dataUsageConsent } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        'preferences.emailNotifications': emailNotifications,
        'preferences.marketingEmails': marketingEmails,
        'preferences.dataUsageConsent': dataUsageConsent
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: user.preferences
    });
  } catch (err) {
    console.error('Update preferences error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/auth/account
// @access  Private
export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Password is incorrect'
      });
    }

    // Delete user
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (err) {
    console.error('Delete account error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Export user data
// @route   GET /api/auth/export-data
// @access  Private
export const exportUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get user's resumes
    const Resume = (await import('../models/Resume.js')).default;
    const resumes = await Resume.find({ user: req.user.id });

    const userData = {
      profile: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        careerProfile: user.careerProfile,
        preferences: user.preferences,
        subscription: user.subscription,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      },
      resumes: resumes,
      exportedAt: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (err) {
    console.error('Export data error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      profilePicture: user.profilePicture,
      careerProfile: user.careerProfile,
      preferences: user.preferences,
      subscription: user.subscription
    }
  });
};