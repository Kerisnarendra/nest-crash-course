import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    private readonly logger = new Logger(TransformInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {        
      this.logger.log(`TransformInterceptor invoked...`);
        return next
          .handle()
          .pipe(map(value => value === null ? {} : value));
    }
}
