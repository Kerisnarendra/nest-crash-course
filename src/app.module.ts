import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { Middleware } from './middlewares/middleware';
import { ProductsController } from './products/products.controller';
import { FunctionMiddleware } from './middlewares/function-middleware';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guards/role-guard';

@Module({
  imports: [ProductsModule, CommonModule, CoreModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, {
    provide: APP_GUARD,
    useClass: RoleGuard
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware, FunctionMiddleware)
      .exclude(
        // { path: 'products', method: RequestMethod.GET },
        { path: 'products', method: RequestMethod.POST },
        'products/(.*)',
      )
      .forRoutes(ProductsController)
  }
}
