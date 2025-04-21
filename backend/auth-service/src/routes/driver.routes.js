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
} from '../controllers/driver.controller.js';

const router = express.Router();

// Public Routes
router.post('/driver/sign-up', registerController);
router.post('/driver/activate-account', activateAccountController);
router.post('/driver/login', loginController);
router.post('/driver/resend-otp', resendOTPController);
router.post('/driver/forgot-password', forgotPasswordController);
router.post('/driver/reactivate-account', reactivateAccountController);
router.post('/driver/reset-password', resetPasswordController);

// Protected Routes (Require authGuard)
router.post('/driver/logout', authGuard, logoutController);
router.post('/driver/sign-out', authGuard, signOutController);
router.get('/driver/check-auth', authGuard, checkAuthController);
router.post('/driver/refresh-token', authGuard, refreshTokenController);

export default router;