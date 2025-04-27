import express from 'express';
import authGuard from '../middleware/auth.middleware.js';
import {
  registerController,
  activateAccountController,
  loginController,
  resendOTPController,
  extendSessionController,
  logoutController,
  signOutController,
  forgotPasswordController,
  reactivateAccountController,
  resetPasswordController,
  checkAuthController,
  refreshTokenController,
} from '../controllers/user.controller.js';

const router = express.Router();

// Public Routes
router.post('/sign-up', registerController);
router.post('/activate-account', activateAccountController);
router.post('/login', loginController);
router.post('/resend-otp', resendOTPController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reactivate-account', reactivateAccountController);
router.post('/reset-password', resetPasswordController);

// Protected Routes (Require authGuard)
router.post('/logout', authGuard, logoutController);
router.post('/sign-out', authGuard, signOutController);
router.get('/check-auth', authGuard, checkAuthController);
router.post('/refresh-token', authGuard, refreshTokenController);

export default router;