import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, BadGatewayException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    private readonly logger = new Logger(ExceptionInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {        
      this.logger.log(`ExceptionInterceptor invoked...`);
        return next
          .handle()
          .pipe(
            catchError(err => throwError(() => new BadGatewayException())),
          );
    }
}
