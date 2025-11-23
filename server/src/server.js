import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from './config/passport.js';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Import security middleware
import { generalRateLimit } from './middleware/security.js';

// Global rate limiter
app.use(generalRateLimit);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import route files
import resumeRoutes from './routes/resumeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
import emailRoutes from "./routes/emailRoutes.js";


// Mount Routes
app.use('/api/resumes', resumeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/export', exportRoutes);
app.use("/api/email", emailRoutes);


// Base route
app.get('/', (req, res) => {
  res.json({ message: 'GrowZen API' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-builder');
    console.log('MongoDB Connected');

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit process with failure
  }
};

startServer();
