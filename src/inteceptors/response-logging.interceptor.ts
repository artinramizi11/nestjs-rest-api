import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class ResponseLogging implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): any {
        const loggedAt = new Date().toLocaleDateString()

        return next.handle().pipe(map((data) => {
            return {
                message: "Sucess",
                data,
                loggedAt
            }
        }))
      
    }
    
}