import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

/**
 * Middleware to protect routes
 */
const authGuard = async (req, res, next) => {
    try {
        const session = req.cookies.session;
        if (!session || !session.token) {
            return next(new ApiError(401, "Unauthorized: No token provided"));
        }

        const token = session.token;

        const verification = await verifyToken(token);
        if (verification === "Token Expired") {
            return next(new ApiError(401, "Session expired. Please log in again."));
        }

        if (!session._id) {
            return next(new ApiError(401, "Invalid session. Please log in again."));
        }
        
        console.log(verification)
        req.user = verification;
        req.session = session;
        next();
    } catch (error) {
        next(error);
    }
};

export default authGuard;
