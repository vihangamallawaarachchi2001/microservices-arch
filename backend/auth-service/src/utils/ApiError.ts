/**
 * Custom error class for handling API errors with a status code.
 * 
 * This class extends the built-in `Error` class, allowing you to specify an HTTP status code
 * and a message for the error. It also captures the stack trace to aid in debugging.
 * 
 * @class ApiError
 * @extends {Error}
 */
class ApiError extends Error {
    statusCode: number;

    /**
     * Creates an instance of the ApiError.
     * 
     * @param statusCode - The HTTP status code associated with the error (e.g., 400, 404, 500).
     * @param message - A human-readable message describing the error.
     */
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor); // Captures the stack trace for debugging.
    }
}

export default ApiError;
