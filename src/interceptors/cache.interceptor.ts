import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, BadGatewayException } from "@nestjs/common";
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    private readonly logger = new Logger(CacheInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {        
      this.logger.log(`CacheInterceptor invoked...`);
      const isCached = true;
      if(isCached) {
        return of([])
      }
      return next.handle()
    }
}
