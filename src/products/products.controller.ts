import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { CustomException } from 'src/exceptions/custom-exception';

@Controller('products')
export class ProductsController {
    constructor(private usersService: ProductsService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto): Product {
      return this.usersService.create(createProductDto);
    }
  
    @Get()
    findAll(): Product[] {
      return this.usersService.findAll();
    }

    @Get('throw-exception')
    findWithException() {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }

    @Get('throw-overrided-exception')
    findWithOverridedException() {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN);
    }

    @Get('throw-custom-exception')
    findWithCustomException() {
      throw new CustomException();
    }
}
