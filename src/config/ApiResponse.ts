class ApiResponse {
    statusCode: number;
    message: string;
    data?: any;
   
    success?: boolean;
    constructor(statusCode: number, message = "Success", data?){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }