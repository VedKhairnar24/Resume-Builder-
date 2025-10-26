import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from '../server.js';
import User from '../models/User.js';

// Test database setup
const testDB = 'mongodb://localhost:27017/resume-builder-test';

beforeAll(async () => {
  await mongoose.connect(testDB);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Authentication System Tests', () => {
  describe('User Registration', () => {
    test('should register a new user successfully', async () => {
      const userData = {
        name: {
          first: 'John',
          last: 'Doe'
        },
        email: 'john@example.com',
        password: 'Password123!'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(userData.email);
      expect(response.body.data.name.first).toBe(userData.name.first);
      expect(response.body.data.name.last).toBe(userData.name.last);
    });

    test('should reject weak passwords', async () => {
      const userData = {
        name: {
          first: 'John',
          last: 'Doe'
        },
        email: 'john@example.com',
        password: 'weak'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.details).toBeDefined();
    });

    test('should reject duplicate emails', async () => {
      const userData = {
        name: {
          first: 'John',
          last: 'Doe'
        },
        email: 'john@example.com',
        password: 'Password123!'
      };

      // Register first user
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Try to register with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('already exists');
    });
  });

  describe('User Login', () => {
    beforeEach(async () => {
      const user = new User({
        name: {
          first: 'John',
          last: 'Doe'
        },
        email: 'john@example.com',
        password: 'Password123!',
        emailVerified: true
      });
      await user.save();
    });

    test('should login with valid credentials', async () => {
      const loginData = {
        email: 'john@example.com',
        password: 'Password123!'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
      expect(response.body.data.email).toBe(loginData.email);
    });

    test('should reject invalid credentials', async () => {
      const loginData = {
        email: 'john@example.com',
        password: 'WrongPassword123!'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Invalid credentials');
    });

    test('should lock account after multiple failed attempts', async () => {
      const loginData = {
        email: 'john@example.com',
        password: 'WrongPassword123!'
      };

      // Make 5 failed attempts
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/auth/login')
          .send(loginData)
          .expect(401);
      }

      // 6th attempt should be locked
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(423);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('locked');
    });
  });

  describe('Password Reset', () => {
    beforeEach(async () => {
      const user = new User({
        name: {
          first: 'John',
          last: 'Doe'
        },
        email: 'john@example.com',
        password: 'Password123!',
        emailVerified: true
      });
      await user.save();
    });

    test('should send password reset email', async () => {
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'john@example.com' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('sent');
    });

    test('should reject password reset for non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'nonexistent@example.com' })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('No user found');
    });
  });

  describe('Profile Management', () => {
    let authToken;
    let userId;

    beforeEach(async () => {
      const user = new User({
        name: {
          first: 'John',
          last: 'Doe'
        },
        email: 'john@example.com',
        password: 'Password123!',
        emailVerified: true
      });
      await user.save();
      
      userId = user._id;
      authToken = user.getSignedJwtToken();
    });

    test('should get current user profile', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe('john@example.com');
    });

    test('should update user profile', async () => {
      const updateData = {
        name: {
          first: 'Jane',
          last: 'Smith'
        },
        targetRole: 'Senior Developer',
        industry: 'Technology'
      };

      const response = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name.first).toBe('Jane');
      expect(response.body.data.careerProfile.targetRole).toBe('Senior Developer');
    });

    test('should update password', async () => {
      const passwordData = {
        currentPassword: 'Password123!',
        newPassword: 'NewPassword123!'
      };

      const response = await request(app)
        .put('/api/auth/update-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send(passwordData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('updated');
    });

    test('should export user data', async () => {
      const response = await request(app)
        .get('/api/auth/export-data')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.profile).toBeDefined();
      expect(response.body.data.exportedAt).toBeDefined();
    });
  });

  describe('Two-Factor Authentication', () => {
    let authToken;
    let userId;

    beforeEach(async () => {
      const user = new User({
        name: {
          first: 'John',
          last: 'Doe'
        },
        email: 'john@example.com',
        password: 'Password123!',
        emailVerified: true
      });
      await user.save();
      
      userId = user._id;
      authToken = user.getSignedJwtToken();
    });

    test('should setup 2FA', async () => {
      const response = await request(app)
        .post('/api/auth/2fa/setup')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.secret).toBeDefined();
      expect(response.body.data.qrCode).toBeDefined();
      expect(response.body.data.backupCodes).toHaveLength(10);
    });

    test('should get 2FA status', async () => {
      const response = await request(app)
        .get('/api/auth/2fa/status')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.enabled).toBe(false);
    });
  });

  describe('Rate Limiting', () => {
    test('should limit login attempts', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'WrongPassword123!'
      };

      // Make multiple requests quickly
      const promises = Array(6).fill().map(() =>
        request(app)
          .post('/api/auth/login')
          .send(loginData)
      );

      const responses = await Promise.all(promises);
      
      // Some requests should be rate limited
      const rateLimitedResponses = responses.filter(r => r.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });

  describe('Security Headers', () => {
    test('should include security headers', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401); // Unauthorized, but headers should still be present

      expect(response.headers['x-frame-options']).toBe('DENY');
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-xss-protection']).toBe('1; mode=block');
    });
  });
});

// Utility functions for testing
export const createTestUser = async (userData = {}) => {
  const defaultData = {
    name: {
      first: 'Test',
      last: 'User'
    },
    email: 'test@example.com',
    password: 'Password123!',
    emailVerified: true,
    ...userData
  };

  const user = new User(defaultData);
  await user.save();
  return user;
};

export const getAuthToken = (user) => {
  return user.getSignedJwtToken();
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
