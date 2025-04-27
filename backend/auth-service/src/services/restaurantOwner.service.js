import RestaurantOwner from '../models/restaurantOwner.js';
import OTP from '../models/OTP.js';
import Session from '../models/session.model.js';
import ApiError from '../utils/ApiError.js';
import { generateOTP } from '../utils/GenerateOTP.js';
import { sendEmail, getOtpEmail, getLinkEmail } from '../utils/emails.js';
import { generateToken, verifyToken } from '../utils/jwt.js';
import { hashPassword, verifyPassword } from '../utils/bcrypt.js';
import userAgent from 'useragent';

export const register = async (registrationData) => {
  try {
    
    // if (
    //   !registrationData ||
    //   !registrationData.address ||
    //   !registrationData.email ||
    //   !registrationData.password ||
    //   !registrationData.phoneNumber ||
    //   !registrationData.username
    // ) {
    //   throw new ApiError(400, 'Required data fields are missing');
    // }

    const hashedPassword = (await hashPassword(registrationData.password)).toString();
    const isActive = false;
    const alergy = []; 
    const avatar = 'https://img.rasset.ie/0003696e-500.jpg'; 

    const existingUser = await RestaurantOwner.findOne({ email: registrationData.email });
    if (existingUser && existingUser.isActive) {
      throw new ApiError(400, 'This email already exists');
    } else if (existingUser && !existingUser.isActive) {
      return { success: false, message: 'There is an inactive account under this email. Activate it or try with a new email.' };
    }

    const restaurantOwner = await RestaurantOwner.create({
      username: registrationData.username,
      email: registrationData.email,
      address: registrationData.address,
      phoneNo: registrationData.phoneNumber,
      isActive,
      alergy,
      password: hashedPassword,
      avatar,
    });

    const otp = (await generateOTP()).toString();
    await OTP.findOneAndUpdate(
      { email: restaurantOwner.email },
      { $set: { email: restaurantOwner.email, otp } },
      { new: true, upsert: true }
    );

    await sendEmail(restaurantOwner.email, 'Activate your account', getOtpEmail(otp));

    return { success: true, data: restaurantOwner };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const activateAccount = async (activationData, req) => {
  try {
    const storedOTP = await OTP.findOne({ email: activationData.email });
    if (!storedOTP || storedOTP.otp !== activationData.otp) {
      return { success: false, message: 'Invalid or expired OTP' };
    }

    await OTP.deleteMany({ email: activationData.email });

    const restaurantOwner = await RestaurantOwner.findOne({ email: activationData.email });
    if (!restaurantOwner) throw new ApiError(404, 'restaurantOwner not found');
    restaurantOwner.isActive = true;
    await restaurantOwner.save();

    const token = await generateToken({ id: restaurantOwner._id, email: restaurantOwner.email });
    const sessionPayload = {
      userId: restaurantOwner._id,
      token,
      expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      deviceInfo: JSON.stringify(userAgent.parse(req.headers['user-agent'])),
    };

    const newSession = await Session.findOneAndUpdate(
      { userId: restaurantOwner._id },
      sessionPayload,
      { new: true, upsert: true }
    );

    return { success: true, token, session: newSession };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (emailOrUsername, password, req) => {
  try {
    const restaurantOwner = await RestaurantOwner.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!restaurantOwner) return { success: false, message: 'restaurantOwner not found' };
    const isPasswordValid = await verifyPassword(password, restaurantOwner.password);
    if (!isPasswordValid) return { success: false, message: 'Invalid restaurantOwnername or password' };
    if (!restaurantOwner.isActive) return { success: false, message: 'Please activate your account before logging in' };
    const existingSession = await Session.findOne({
      userId: restaurantOwner._id,
      deviceInfo: JSON.stringify(userAgent.parse(req.headers['user-agent'])),
    });
    console.log(1);
    
    if (existingSession && existingSession.expiresIn > Date.now()) {
      return { success: true, message: 'Session already active on this device' };
    }
    console.log(1);
    const token = await generateToken({ userId: restaurantOwner._id });
    
    
    const sessionPayload = {
      userId: restaurantOwner._id,
      token,
      expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      deviceInfo: JSON.stringify(userAgent.parse(req.headers['user-agent'])),
    };

    const newSession = await Session.findOneAndUpdate(
      { userId: restaurantOwner._id },
      sessionPayload,
      { new: true, upsert: true }
    );

    return { success: true, token, session: newSession };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resendOTP = async (email) => {
  try {
    let otp = await generateOTP();
    otp = otp.toString();

    await OTP.findOneAndUpdate(
      { email },
      { $set: { email, otp } },
      { new: true, upsert: true }
    );

    await sendEmail(email, "Activate your account", getOtpEmail(otp));

    return {
      success: true,
      message: "A new OTP has been sent to your email.",
    };
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to resend OTP");
  }
};

export const extendSession = async (userId, deviceInfo) => {
  try {
    const session = await Session.findOne({ userId, deviceInfo });

    if (!session || session.expiresIn < Date.now()) {
      return { success: false, message: "Session expired, please log in again." };
    }

    session.expiresIn = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 ); 
    await session.save();

    return {
      success: true,
      message: "Session extended successfully.",
      session,
    };
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to extend session");
  }
};

export const logout = async (sessionId) => {
  try {
    await Session.findByIdAndDelete(sessionId);

    return {
      success: true,
      message: "Logged out successfully.",
    };
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to log out");
  }
};

export const signOut = async (userId) => {
  try {
    await Session.deleteMany({ userId });

    return {
      success: true,
      message: "Signed out from all devices.",
    };
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to sign out from all devices");
  }
};


export const forgotPassword = async (email) => {
  try {
    const driver = await RestaurantOwner.findOne({ email });
    if (!driver) {
      return { success: false, message: "driver not found." };
    }

    const otp = (await generateOTP()).toString();
    await OTP.findOneAndUpdate(
      { email: driver.email },
      { $set: { email: driver.email, otp } },
      { new: true, upsert: true }
    );
    await sendEmail(driver.email, 'Activate your account', getOtpEmail(otp));


    return {
      success: true,
      message: "A password reset link has been sent to your email.",
    };
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to process forgot password request");
  }
};

export const resetPassword = async (password, email, otp)  => {
  try {
    console.log(password, email, otp)
    const storedOTP = await OTP.findOne({ email: email });
    if (!storedOTP || storedOTP.otp !== otp) {
      return { success: false, message: 'Invalid or expired OTP' };
    }

    await OTP.deleteMany({ email: email });

    
    const driver  = await RestaurantOwner.findOne({email: email})
    if (!driver) {
      return { success : false, 'message': 'driver not find'}
    }

    console.log('hello world');
    

    if (!driver.isActive) return { success : false, 'message': 'uActivate your account first'}

    driver.password = (await hashPassword(password)).toString();

    driver.save();
    return { success : true, 'message': 'password reset successfully'}
  } catch (error) {
    console.error(error.message)
  }
}

export const reactivateAccount = async (email) => {
  try {
    const driver = await RestaurantOwner.findOne({ email });
    if (!driver) {
      throw new ApiError(404, "User not found.");
    }

    let otp = await generateOTP();
    otp = otp.toString();

    await OTP.findOneAndUpdate(
      { email },
      { $set: { email, otp } },
      { new: true, upsert: true }
    );

    await sendEmail(email, "Reactivate your account", getOtpEmail(otp));

    return {
      success: true,
      message: "A reactivation email has been sent to your email.",
    };
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to reactivate account");
  }
};