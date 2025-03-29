import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";

export const hashPassword = async (password) => {
    if (!password) {
        throw new ApiError(400, "Password cannot be empty.");
    }
    try {    
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.error(`Password Hashing Error: ${error.message}`);
        throw new ApiError(500, "Failed to hash password.");
    }
};

export const verifyPassword = async (userPassword, dbPassword) => {
    if (!userPassword || !dbPassword) {
        throw new ApiError(400, "Password comparison failed: Missing input.");
    }

    try {
        return await bcrypt.compare(userPassword, dbPassword);
    } catch (error) {
        console.error(`Password Verification Error: ${error.message}`);
        throw new ApiError(500, "Failed to verify password.");
    }
};