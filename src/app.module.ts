import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ProductsModule, CommonModule, CoreModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {
}
