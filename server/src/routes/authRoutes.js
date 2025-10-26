import express from 'express';
import { 
  register, 
  login, 
  getMe, 
  verifyEmail, 
  forgotPassword, 
  resetPassword, 
  updatePassword, 
  updateProfile, 
  updatePreferences, 
  deleteAccount, 
  exportUserData,
  googleAuth,
  googleCallback,
  linkedinAuth,
  linkedinCallback,
  githubAuth,
  githubCallback,
  setup2FA,
  verify2FASetup,
  disable2FA,
  verify2FALogin,
  get2FAStatus
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { 
  validateRegistration, 
  validateLogin, 
  validatePasswordReset, 
  validatePasswordUpdate, 
  handleValidationErrors,
  loginRateLimit,
  registerRateLimit,
  passwordResetRateLimit
} from '../middleware/security.js';

const router = express.Router();

// Public routes
router.post('/register', registerRateLimit, validateRegistration, handleValidationErrors, register);
router.post('/login', loginRateLimit, validateLogin, handleValidationErrors, login);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', passwordResetRateLimit, validatePasswordReset, handleValidationErrors, forgotPassword);
router.put('/reset-password/:token', resetPassword);

// OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/linkedin', linkedinAuth);
router.get('/linkedin/callback', linkedinCallback);
router.get('/github', githubAuth);
router.get('/github/callback', githubCallback);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update-password', protect, validatePasswordUpdate, handleValidationErrors, updatePassword);
router.put('/profile', protect, updateProfile);
router.put('/preferences', protect, updatePreferences);
router.delete('/account', protect, deleteAccount);
router.get('/export-data', protect, exportUserData);

// 2FA routes
router.get('/2fa/status', protect, get2FAStatus);
router.post('/2fa/setup', protect, setup2FA);
router.post('/2fa/verify', protect, verify2FASetup);
router.post('/2fa/disable', protect, disable2FA);
router.post('/2fa/verify-login', verify2FALogin);

export default router;