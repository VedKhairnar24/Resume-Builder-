import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email verification
export const sendEmailVerification = async (user, token) => {
  const transporter = createTransporter();
  
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify Your Email Address - Resume Builder',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Resume Builder!</h1>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${user.name.first},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for signing up! To complete your registration and start building your professional resume, 
            please verify your email address by clicking the button below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; 
                      border-radius: 8px; font-weight: bold; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If the button doesn't work, you can also copy and paste this link into your browser:
          </p>
          
          <p style="color: #007bff; word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px;">
            ${verificationUrl}
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-top: 20px;">
            This verification link will expire in 24 hours. If you didn't create an account with us, 
            please ignore this email.
          </p>
        </div>
        
        <div style="background: #343a40; padding: 20px; text-align: center;">
          <p style="color: #adb5bd; margin: 0; font-size: 14px;">
            © 2024 Resume Builder. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email verification sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending email verification:', error);
    throw new Error('Failed to send verification email');
  }
};

// Send password reset email
export const sendPasswordReset = async (user, token) => {
  const transporter = createTransporter();
  
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: user.email,
    subject: 'Reset Your Password - Resume Builder',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Request</h1>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${user.name.first},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We received a request to reset your password. If you made this request, 
            click the button below to reset your password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #dc3545; color: white; padding: 15px 30px; text-decoration: none; 
                      border-radius: 8px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If the button doesn't work, you can also copy and paste this link into your browser:
          </p>
          
          <p style="color: #007bff; word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px;">
            ${resetUrl}
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-top: 20px;">
            This password reset link will expire in 10 minutes. If you didn't request a password reset, 
            please ignore this email and your password will remain unchanged.
          </p>
        </div>
        
        <div style="background: #343a40; padding: 20px; text-align: center;">
          <p style="color: #adb5bd; margin: 0; font-size: 14px;">
            © 2024 Resume Builder. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

// Send welcome email after verification
export const sendWelcomeEmail = async (user) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: user.email,
    subject: 'Welcome to Resume Builder! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome to Resume Builder!</h1>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${user.name.first},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Congratulations! Your email has been verified and your account is now active. 
            You're ready to start building your professional resume.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Complete your profile setup</li>
              <li>Choose from our professional templates</li>
              <li>Build your first resume</li>
              <li>Download as PDF</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/create-resume" 
               style="background: #007bff; color: white; padding: 15px 30px; text-decoration: none; 
                      border-radius: 8px; font-weight: bold; display: inline-block;">
              Start Building Your Resume
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-top: 20px;">
            Need help getting started? Check out our <a href="${process.env.CLIENT_URL}/help" style="color: #007bff;">help center</a> 
            or reach out to our support team.
          </p>
        </div>
        
        <div style="background: #343a40; padding: 20px; text-align: center;">
          <p style="color: #adb5bd; margin: 0; font-size: 14px;">
            © 2024 Resume Builder. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error for welcome email as it's not critical
  }
};
