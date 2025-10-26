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
  exportUserData 
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

// Protected routes
router.get('/me', protect, getMe);
router.put('/update-password', protect, validatePasswordUpdate, handleValidationErrors, updatePassword);
router.put('/profile', protect, updateProfile);
router.put('/preferences', protect, updatePreferences);
router.delete('/account', protect, deleteAccount);
router.get('/export-data', protect, exportUserData);

export default router;