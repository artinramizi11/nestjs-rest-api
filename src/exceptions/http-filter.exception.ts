import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse()
        const request = host.switchToHttp().getRequest()
        const status = exception.getStatus()
        const message = exception.response
        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toLocaleString(),
            path: request.url
        
        })
    }
}