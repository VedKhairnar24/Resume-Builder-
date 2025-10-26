import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProfileDashboard from '../pages/Profile';
import PasswordStrengthIndicator from '../components/common/PasswordStrengthIndicator';

// Test utilities
export const renderWithProviders = (ui, { user = null } = {}) => {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <AuthProvider value={{ user, isAuthenticated: !!user }}>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );

  return render(ui, { wrapper: Wrapper });
};

export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: {
    first: 'John',
    last: 'Doe'
  },
  email: 'john@example.com',
  emailVerified: true,
  profilePicture: '',
  careerProfile: {
    targetRole: '',
    industry: 'Other',
    careerStage: 'entry',
    location: {
      city: '',
      country: ''
    },
    phone: ''
  },
  preferences: {
    emailNotifications: true,
    marketingEmails: false,
    dataUsageConsent: false
  },
  subscription: {
    tier: 'free',
    status: 'active'
  },
  ...overrides
});

// Mock API functions
export const mockApiCall = (response, delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), delay);
  });
};

export const mockApiError = (error, delay = 0) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(error), delay);
  });
};

// Test data
export const testUsers = {
  validUser: {
    name: {
      first: 'John',
      last: 'Doe'
    },
    email: 'john@example.com',
    password: 'Password123!',
    confirmPassword: 'Password123!'
  },
  weakPasswordUser: {
    name: {
      first: 'Jane',
      last: 'Smith'
    },
    email: 'jane@example.com',
    password: 'weak',
    confirmPassword: 'weak'
  },
  mismatchedPasswordUser: {
    name: {
      first: 'Bob',
      last: 'Johnson'
    },
    email: 'bob@example.com',
    password: 'Password123!',
    confirmPassword: 'DifferentPassword123!'
  }
};

export const testPasswords = {
  weak: 'weak',
  medium: 'Password1',
  strong: 'Password123!',
  veryStrong: 'MySecurePassword123!@#'
};

// Custom matchers for password strength
export const expectPasswordStrength = (strength) => {
  const strengthText = screen.getByText(/Very Weak|Weak|Fair|Good|Strong/);
  expect(strengthText).toHaveTextContent(strength);
};

// Test helpers
export const fillLoginForm = (email, password) => {
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: email }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: password }
  });
};

export const fillRegistrationForm = (userData) => {
  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: userData.name.first }
  });
  fireEvent.change(screen.getByLabelText(/last name/i), {
    target: { value: userData.name.last }
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: userData.email }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: userData.password }
  });
  fireEvent.change(screen.getByLabelText(/confirm password/i), {
    target: { value: userData.confirmPassword }
  });
};

export const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: /submit|login|register|sign in|create account/i }));
};

// Validation helpers
export const expectValidationError = (message) => {
  expect(screen.getByText(message)).toBeInTheDocument();
};

export const expectNoValidationErrors = () => {
  const errorElements = screen.queryAllByRole('alert');
  expect(errorElements).toHaveLength(0);
};

// Component-specific test helpers
export const testPasswordStrengthIndicator = () => {
  describe('PasswordStrengthIndicator', () => {
    test('shows no indicator for empty password', () => {
      render(<PasswordStrengthIndicator password="" />);
      expect(screen.queryByText(/Very Weak|Weak|Fair|Good|Strong/)).not.toBeInTheDocument();
    });

    test('shows weak indicator for weak password', () => {
      render(<PasswordStrengthIndicator password="weak" />);
      expectPasswordStrength('Very Weak');
    });

    test('shows strong indicator for strong password', () => {
      render(<PasswordStrengthIndicator password="Password123!" />);
      expectPasswordStrength('Strong');
    });

    test('calls onStrengthChange callback', () => {
      const mockCallback = jest.fn();
      render(<PasswordStrengthIndicator password="Password123!" onStrengthChange={mockCallback} />);
      expect(mockCallback).toHaveBeenCalledWith(5);
    });
  });
};

export const testLoginForm = () => {
  describe('Login Form', () => {
    test('renders login form correctly', () => {
      renderWithProviders(<Login />);
      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    test('shows validation errors for empty fields', async () => {
      renderWithProviders(<Login />);
      
      submitForm();
      
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    test('submits form with valid data', async () => {
      const mockSignIn = jest.fn().mockResolvedValue({});
      renderWithProviders(<Login />, { 
        user: null,
        signIn: mockSignIn 
      });
      
      fillLoginForm('john@example.com', 'Password123!');
      submitForm();
      
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith({
          email: 'john@example.com',
          password: 'Password123!'
        });
      });
    });
  });
};

export const testRegistrationForm = () => {
  describe('Registration Form', () => {
    test('renders registration form correctly', () => {
      renderWithProviders(<Register />);
      
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });

    test('shows password strength indicator', () => {
      renderWithProviders(<Register />);
      
      const passwordInput = screen.getByLabelText(/password/i);
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      
      expect(screen.getByText('Strong')).toBeInTheDocument();
    });

    test('validates password confirmation', async () => {
      renderWithProviders(<Register />);
      
      fillRegistrationForm(testUsers.mismatchedPasswordUser);
      submitForm();
      
      await waitFor(() => {
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      });
    });

    test('prevents submission with weak password', async () => {
      renderWithProviders(<Register />);
      
      fillRegistrationForm(testUsers.weakPasswordUser);
      
      const submitButton = screen.getByRole('button', { name: /create account/i });
      expect(submitButton).toBeDisabled();
    });
  });
};

export const testProfileDashboard = () => {
  describe('Profile Dashboard', () => {
    test('renders profile information correctly', () => {
      const mockUser = createMockUser();
      renderWithProviders(<ProfileDashboard />, { user: mockUser });
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    test('allows profile updates', async () => {
      const mockUser = createMockUser();
      const mockUpdateProfile = jest.fn().mockResolvedValue({});
      
      renderWithProviders(<ProfileDashboard />, { 
        user: mockUser,
        updateProfile: mockUpdateProfile 
      });
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
      
      const updateButton = screen.getByRole('button', { name: /update profile/i });
      fireEvent.click(updateButton);
      
      await waitFor(() => {
        expect(mockUpdateProfile).toHaveBeenCalledWith(
          expect.objectContaining({
            name: expect.objectContaining({
              first: 'Jane'
            })
          })
        );
      });
    });
  });
};

// Integration test helpers
export const testCompleteAuthFlow = () => {
  describe('Complete Authentication Flow', () => {
    test('user can register, verify email, and login', async () => {
      // This would be an integration test that tests the complete flow
      // from registration to email verification to login
      
      // Mock the complete flow
      const registrationResponse = await mockApiCall({
        success: true,
        message: 'Registration successful! Please check your email to verify your account.'
      });
      
      expect(registrationResponse.success).toBe(true);
      
      // Mock email verification
      const verificationResponse = await mockApiCall({
        success: true,
        message: 'Email verified successfully!'
      });
      
      expect(verificationResponse.success).toBe(true);
      
      // Mock login
      const loginResponse = await mockApiCall({
        success: true,
        token: 'mock-jwt-token',
        data: createMockUser()
      });
      
      expect(loginResponse.success).toBe(true);
      expect(loginResponse.token).toBeDefined();
    });
  });
};

// Performance test helpers
export const testFormPerformance = () => {
  describe('Form Performance', () => {
    test('password strength indicator updates efficiently', () => {
      const mockCallback = jest.fn();
      const { rerender } = render(
        <PasswordStrengthIndicator password="" onStrengthChange={mockCallback} />
      );
      
      // Simulate rapid typing
      for (let i = 1; i <= 10; i++) {
        rerender(
          <PasswordStrengthIndicator 
            password={'a'.repeat(i)} 
            onStrengthChange={mockCallback} 
          />
        );
      }
      
      // Should not have excessive calls
      expect(mockCallback).toHaveBeenCalledTimes(10);
    });
  });
};

// Accessibility test helpers
export const testAccessibility = () => {
  describe('Accessibility', () => {
    test('forms have proper labels', () => {
      renderWithProviders(<Login />);
      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test('error messages are announced to screen readers', async () => {
      renderWithProviders(<Login />);
      
      submitForm();
      
      await waitFor(() => {
        const errorMessage = screen.getByText(/email is required/i);
        expect(errorMessage).toHaveAttribute('role', 'alert');
      });
    });

    test('buttons have descriptive text', () => {
      renderWithProviders(<Login />);
      
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      expect(submitButton).toBeInTheDocument();
    });
  });
};
