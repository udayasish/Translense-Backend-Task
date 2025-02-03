export class ApiError extends Error {
    statusCode: number;
    data?: any;
    message: string;
    errors: string[];
    success: boolean;
  
    constructor(statusCode: number, message?: string, errors?: string[], stack?: any) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.errors = errors;
      this.success = false;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }