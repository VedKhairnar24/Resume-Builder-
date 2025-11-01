import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

// Generate 2FA secret for user
export const generate2FASecret = (user) => {
  const secret = speakeasy.generateSecret({
    name: `GrowZen (${user.email})`,
    issuer: 'GrowZen',
    length: 32
  });

  return {
    secret: secret.base32,
    qrCodeUrl: secret.otpauth_url
  };
};

// Generate QR code for 2FA setup
export const generateQRCode = async (otpauthUrl) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(otpauthUrl);
    return qrCodeDataURL;
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
};

// Verify 2FA token
export const verify2FAToken = (secret, token) => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 2 // Allow 2 time steps (60 seconds) tolerance
  });
};

// Generate backup codes
export const generateBackupCodes = () => {
  const codes = [];
  for (let i = 0; i < 10; i++) {
    codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
  }
  return codes;
};

// Verify backup code
export const verifyBackupCode = (userBackupCodes, code) => {
  const index = userBackupCodes.indexOf(code);
  if (index > -1) {
    // Remove used backup code
    userBackupCodes.splice(index, 1);
    return true;
  }
  return false;
};
