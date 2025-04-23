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
} from '../controllers/driver.controller.js';

// Import restaurant owner controllers
import {
  resOwnerregisterController,
  resOwneractivateAccountController,
  resOwnerloginController,
  resOwnerresendOTPController,
  resOwnerextendSessionController,
  resOwnerlogoutController,
  resOwnersignOutController,
  resOwnerforgotPasswordController,
  resOwnerreactivateAccountController,
  resOwnerresetPasswordController,
  resOwnercheckAuthController,
  resOwnerrefreshTokenController,
} from '../controllers/restaurantOwner.controller.js';

const router = express.Router();

// Map roles to their controller sets
const roleConfigs = [
  {
    role: 'driver',
    controllers: {
      register: registerController,
      activate: activateAccountController,
      login: loginController,
      resendOTP: resendOTPController,
      extendSession: extendSessionController,
      logout: logoutController,
      signOut: signOutController,
      forgotPassword: forgotPasswordController,
      reactivateAccount: reactivateAccountController,
      resetPassword: resetPasswordController,
      checkAuth: checkAuthController,
      refreshToken: refreshTokenController,
    },
  },
  {
    role: 'restaurantOwner',
    controllers: {
      register: resOwnerregisterController,
      activate: resOwneractivateAccountController,
      login: resOwnerloginController,
      resendOTP: resOwnerresendOTPController,
      extendSession: resOwnerextendSessionController,
      logout: resOwnerlogoutController,
      signOut: resOwnersignOutController,
      forgotPassword: resOwnerforgotPasswordController,
      reactivateAccount: resOwnerreactivateAccountController,
      resetPassword: resOwnerresetPasswordController,
      checkAuth: resOwnercheckAuthController,
      refreshToken: resOwnerrefreshTokenController,
    },
  },
];

// Dynamically create routes for each role
roleConfigs.forEach(({ role, controllers }) => {
  // Public routes
  router.post(`/${role}/sign-up`, controllers.register);
  router.post(`/${role}/activate-account`, controllers.activate);
  router.post(`/${role}/login`, controllers.login);
  router.post(`/${role}/resend-otp`, controllers.resendOTP);
  router.post(`/${role}/forgot-password`, controllers.forgotPassword);
  router.post(`/${role}/reactivate-account`, controllers.reactivateAccount);
  router.post(`/${role}/reset-password`, controllers.resetPassword);

  // Protected routes
  router.post(`/${role}/logout`, authGuard, controllers.logout);
  router.post(`/${role}/sign-out`, authGuard, controllers.signOut);
  router.get(`/${role}/check-auth`, authGuard, controllers.checkAuth);
  router.post(`/${role}/refresh-token`, authGuard, controllers.refreshToken);
  router.post(`/${role}/extend-session`, authGuard, controllers.extendSession);
});

export default router;
