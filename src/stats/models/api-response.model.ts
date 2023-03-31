export interface ApiResponse{
    message: string;
    isSuccess :boolean;
    statusCode : number;
    statusCodeTitle:string;
    error?:string;
}