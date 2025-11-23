import express from 'express';
import { protect } from '../middleware/auth.js';
import { generateEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/generate', protect, generateEmail);

export default router;
