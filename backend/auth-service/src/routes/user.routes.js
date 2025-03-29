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
  validateSessionController,
  forgotPasswordController,
  reactivateAccountController,
} from '../controllers/user.controller.js';

const router = express.Router();

// Public Routes
router.post('/register', registerController);
router.post('/activate-account', activateAccountController);
router.post('/login', loginController);
router.post('/resend-otp', resendOTPController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reactivate-account', reactivateAccountController);

// Protected Routes (Require authGuard)
router.post('/extend-session', authGuard, extendSessionController);
router.post('/logout', authGuard, logoutController);
router.post('/sign-out', authGuard, signOutController);
router.get('/validate-session/:sessionId', authGuard, validateSessionController);

export default router;