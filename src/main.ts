import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalMiddleware } from './middlewares/global-middleware';
import { ClassValidatorPipe } from './pipes/class-validator-pipe copy';
import { RoleGuard } from './guards/role-guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(GlobalMiddleware);
  app.useGlobalPipes(new ClassValidatorPipe());
  app.useGlobalGuards(new RoleGuard());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
