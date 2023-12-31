import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const userAgent = request.get('user-agent') || '';
        const {ip, method, path, url} = request;

        this.logger.log(`${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${context.getHandler().name} invoked...`);

        const now = Date.now();
        return next
          .handle()
          .pipe(
            tap(() => this.logger.log(`After... ${Date.now() - now}ms`)),
          );
    }
}
