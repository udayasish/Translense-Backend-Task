class ApiResponse {
    statusCode;
    message;
    data;
    success;
    constructor(statusCode, message = "Success", data) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}
export { ApiResponse };
