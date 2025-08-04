// ✅ PURPOSE:
// This custom `ApiError` class is used to standardize error handling in APIs.
// Instead of throwing generic errors, we throw instances of ApiError with:
// - a specific HTTP status code,
// - a consistent message format,
// - optional error details,
// - and stack trace support.
// This improves debugging and makes API error responses predictable.

class ApiError extends Error {
    constructor(
        statusCode,                     // HTTP status code (e.g., 400, 500)
        message = "Something went Wrong", // Default error message
        error = [],                     // Additional error details (optional)
        stack = ""                      // Optional stack trace
    ) {
        super(message);                // Call built-in Error constructor with message
        this.statusCode = statusCode; // Assign status code to the instance
        this.data = null;             // Optional data field (set to null)
        this.message = message;       // Explicit message assignment
        this.success = false;         // Indicates this is a failed response
        this.errors = error;          // Attach detailed error info

        if (stack) {
            this.stack = stack;       // Use provided stack if available
        } else {
            // Automatically capture stack trace for debugging
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError}
