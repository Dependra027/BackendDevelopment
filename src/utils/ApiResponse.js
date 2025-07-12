// ✅ PURPOSE:
// This `ApiResponse` class is used to create consistent and standardized 
// response objects for successful API responses.
// It ensures all success responses follow the same structure with:
// - status code
// - data payload
// - message
// - success flag (true if statusCode < 400)

class ApiResponse {
    constructor(
        statusCode,         // HTTP status code (e.g., 200, 201)
        data,               // Actual data to send in the response
        message = "Success" // Optional success message
    ) {
        this.statusCode = statusCode;     // Assign status code
        this.data = data;                 // Assign response data
        this.message = message;           // Assign custom or default message
        this.success = statusCode < 400;  // true if status code indicates success
    }
}
