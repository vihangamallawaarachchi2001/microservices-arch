import {
  register,
  activateAccount,
  login,
  resendOTP,
  extendSession,
  logout,
  signOut,
  validateSession,
  forgotPassword,
  reactivateAccount,
} from '../services/user.service.js';
import ApiError from '../utils/ApiError.js';

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { success, data, message } = await register(req.body);
    if (!success) return res.status(400).json({ success, message });
    return res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// Activate Account Controller
export const activateAccountController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const { success, token, session, message } = await activateAccount({ email, otp }, req);
    if (!success) return res.status(400).json({ success, message });
    return res.status(200).json({ success: true, token, session });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const { success, token, session, message } = await login(emailOrUsername, password, req);
    if (!success) return res.status(400).json({ success, message });
    return res.status(200).json({ success: true, token, session });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// Resend OTP Controller
export const resendOTPController = async (req, res) => {
  try {
    const { email } = req.body;
    const { success, message } = await resendOTP(email);
    if (!success) return res.status(400).json({ success, message });
    return res.status(200).json({ success: true, message });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// Extend Session Controller
export const extendSessionController = async (req, res, next) => {
  try {
    const { userId } = req.user; // Extract user ID from authenticated session
    const deviceInfo = JSON.stringify(req.headers['user-agent']);
    const { success, message, session } = await services.auth.extendSession(userId, deviceInfo);
    if (!success) return res.status(400).json({ success, message });
    return res.status(200).json({ success: true, session });
  } catch (error) {
    next(error);
  }
};

// Logout Controller
export const logoutController = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const { success, message } = await logout(sessionId);
    if (!success) return res.status(400).json({ success, message });
    return res.status(200).json({ success: true, message });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// Sign Out From All Devices Controller
export const signOutController = async (req, res) => {
  try {
    const { userId } = req.user; // Extract user ID from the authenticated session
    const { success, message } = await signOut(userId);
    if (!success) return res.status(400).json({ success, message });
    return res.status(200).json({ success: true, message });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// Validate Session Controller
export const validateSessionController = async (req, res) => {
  try {
    const { sessionId } = req.session._id;
    const { success, message } = await validateSession(sessionId, req);
    if (!success) return res.status(400).json({ success, message });
    return res.status(200).json({ success: true, message });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const { success, message } = await forgotPassword(email);
    if (!success) return res.status(400).json({ success, message });
    return res.status(200).json({ success: true, message });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// Reactivate Account Controller
export const reactivateAccountController = async (req, res) => {
  try {
    const { email } = req.body;
    const { success, message } = await reactivateAccount(email);
    if (!success) return res.status(400).json({ success, message });
    return res.status(200).json({ success: true, message });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};