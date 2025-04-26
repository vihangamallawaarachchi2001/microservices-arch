const Session = require("../models/session.model.js");
const ApiError = require("../utils/ApiError.js");
const { verifyToken } = require("../utils/jwt.js");

/*)*
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
        

        if (!session._id) {
            return next(new ApiError(401, "Invalid session. Please log in again."));
        }
        //const sessionAuth = await Session.findById(session._id)
        //if (!sessionAuth) {
        //    return next(new ApiError(401, "Session expired. Please log in again."));
        //}
        console.log(verification)
        req.user = verification;
        req.session = session;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authGuard;
