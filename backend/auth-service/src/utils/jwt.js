import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const generateToken = async (payload) => {
    if (!process.env.JWT_SECRET) {
        throw new ApiError(500, "JWT Secret is missing in environment variables.");
    }
    try {
        

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
    } catch (error) {
        console.error(`JWT Token Generation Error: ${error.message}`);
        throw new ApiError(500, "Failed to generate authentication token.");
    }
};

export const verifyToken = async (token) => {
    if (!process.env.JWT_SECRET) {
        throw new ApiError(500, "JWT Secret is missing in environment variables.");
    }

    try {
       
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error(`JWT Verification Error: ${error.message}`);

        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Session expired. Please log in again.");
        } else if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Invalid authentication token.");
        }

        throw new ApiError(500, "Failed to verify authentication token.");
    }
};
