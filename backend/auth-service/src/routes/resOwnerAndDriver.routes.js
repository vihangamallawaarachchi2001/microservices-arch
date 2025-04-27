import express from 'express';
import authGuard from '../middleware/auth.middleware.js';

// Import driver controllers
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
} from '../controllers/driverAndResOwner.controller.js';



const router = express.Router();



  // Public routes
  router.post(`/driverAndResOwner/sign-up`, registerController);
  router.post(`/driverAndResOwner/activate-account`, activateAccountController);
  router.post(`/driverAndResOwner/login`, loginController);
  router.post(`/driverAndResOwner/resend-otp`, resendOTPController);
  router.post(`/driverAndResOwner/forgot-password`, forgotPasswordController);
  router.post(`/driverAndResOwner/reactivate-account`, reactivateAccountController);
  router.post(`/driverAndResOwner/reset-password`, resetPasswordController);

  // Protected routes
  router.post(`/driverAndResOwner/logout`, authGuard, logoutController);
  router.post(`/driverAndResOwner/sign-out`, authGuard, signOutController);
  router.get(`/driverAndResOwner/check-auth`, authGuard, checkAuthController);
  router.post(`/driverAndResOwner/refresh-token`, authGuard, refreshTokenController);
  router.post(`/driverAndResOwner/extend-session`, authGuard, extendSessionController);

export default router;
