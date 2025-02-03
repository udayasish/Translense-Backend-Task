export class ApiError extends Error {
    statusCode;
    data;
    message;
    errors;
    success;
    constructor(statusCode, message, errors, stack) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.errors = errors;
        this.success = false;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
