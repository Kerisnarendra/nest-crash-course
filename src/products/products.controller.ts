import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

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
}
