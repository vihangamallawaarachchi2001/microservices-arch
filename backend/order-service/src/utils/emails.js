import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a nodemailer transporter for sending emails via Brevo SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_LOGIN, // Email used for sending emails
        pass: process.env.SMTP_KEY, // SMTP password for the email
    },
    tls: {
        rejectUnauthorized: false, // Allow insecure connections (useful for testing or development)
    }
});

/**
 * Sends an email using the configured transporter.
 * @param to - The recipient's email address.
 * @param subject - The subject of the email.
 * @param html - The HTML body content of the email.
 * @returns Success message if email is sent, or throws an error if failed.
 */
export const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: `"PFT" <${process.env.SMTP_LOGIN}>`,
            to,
            subject,
            html,
        };
        
        const info = await transporter.sendMail(mailOptions);
        //logger.info(`Email sent: ${info.messageId}`);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        //logger.error(error);
        throw error;
    }
};

/**
 * Generates an HTML email template for account verification.
 * @param verificationLink - The verification URL to be included in the email.
 * @returns The HTML content for the verification email.
 */
export const getVerifyAccountEmail = (verificationLink) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verify Your Account</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background: #ffffff; padding: 20px; border-radius: 10px; text-align: center; }
        .button { background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Verify Your Email Address</h2>
        <p>Click the button below to verify your email and activate your account.</p>
        <a href="${verificationLink}" class="button">Verify Account</a>
    </div>
</body>
</html>`;

/**
 * Generates an HTML email template for OTP verification.
 * @param otpCode - The OTP code to be included in the email.
 * @returns The HTML content for the OTP email.
 */
export const getOtpEmail = (otpCode) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background: #ffffff; padding: 20px; border-radius: 10px; text-align: center; }
        .otp-box { font-size: 24px; font-weight: bold; color: #007bff; padding: 10px; border: 2px dashed #007bff; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Your OTP Code</h2>
        <p>Use the OTP below to verify your identity. It is valid for 10 minutes.</p>
        <div class="otp-box">${otpCode}</div>
        <p>If you did not request this, please ignore this email.</p>
    </div>
</body>
</html>`;

/**
 * Generates an HTML email template for password reset.
 * @param link - The password reset link to be included in the email.
 * @returns The HTML content for the password reset email.
 */
export const getLinkEmail = (link) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset Your Password</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background: #ffffff; padding: 20px; border-radius: 10px; text-align: center; }
        .button { background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Reset Your Password</h2>
        <p>We received a request to reset your password. Click the button below to proceed.</p>
        <a href="${link}" class="button">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
    </div>
</body>
</html>`;