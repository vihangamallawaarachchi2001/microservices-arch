import express from 'express';
import authGuard from '../middleware/auth.middleware.js';
import {
  registerControllerRes,
  activateAccountControllerRes,
  loginControllerRes,
  resendOTPControllerRes,
  extendSessionControllerRes,
  logoutControllerRes,
  signOutControllerRes,
  forgotPasswordControllerRes,
  reactivateAccountControllerRes,
  resetPasswordControllerRes,
  checkAuthControllerRes,
  refreshTokenControllerRes,
} from '../controllers/restaurantOwner.controller.js';

const router = express.Router();

// Public Routes
router.post('/restaurantOwner/sign-up', registerControllerRes);
router.post('/restaurantOwner/activate-account', activateAccountControllerRes);
router.post('/restaurantOwner/login', loginControllerRes);
router.post('/restaurantOwner/resend-otp', resendOTPControllerRes);
router.post('/restaurantOwner/forgot-password', forgotPasswordControllerRes);
router.post('/restaurantOwner/reactivate-account', reactivateAccountControllerRes);
router.post('/restaurantOwner/reset-password', resetPasswordControllerRes);

// Protected Routes (Require authGuard)
router.post('/restaurantOwner/logout', authGuard, logoutControllerRes);
router.post('/restaurantOwner/sign-out', authGuard, signOutControllerRes);
router.get('/restaurantOwner/check-auth', authGuard, checkAuthControllerRes);
router.post('/restaurantOwner/refresh-token', authGuard, refreshTokenControllerRes);

export default router;