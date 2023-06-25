import { Body, Controller, Get, HttpException, HttpStatus, Post, Param, ParseIntPipe, NotFoundException, UsePipes } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { CustomException } from 'src/exceptions/custom-exception';
import { CustomPipe } from 'src/pipes/custom-pipe';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipe';
import { createProductSchema } from './schemas/create-product.schema';
import { ClassValidatorPipe } from 'src/pipes/class-validator-pipe copy';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto): Product {
      return this.productsService.create(createProductDto);
    }
  
    @Get()
    findAll(): Product[] {
      return this.productsService.findAll();
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

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      try {
        if (id === 0) {
          throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return `Finding product with ID: ${id}`;
      } catch (error) {
        throw error;
      }
    }

    @Get(':id/built-in-pipes')
    findOneWithBuiltInPipes(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
      try {
        if (id === 0) {
          throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return `Finding product with ID: ${id}`;
      } catch (error) {
        throw error;
      }
    }    

    @Get(':id/custom-pipes')
    findOneWithCustomPipes(@Param('id', new CustomPipe()) id: number) {
      try {
        if (id === 0) {
          throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return `Finding product with ID: ${id}`;
      } catch (error) {
        throw error;
      }
    }
    
    @Post('joi-validation-pipes')
    @UsePipes(new JoiValidationPipe(createProductSchema))
    createWithValidationPipe(@Body() createProductDto: CreateProductDto): Product {
      return this.productsService.create(createProductDto);
    }

    @Post('class-validator-pipes')
    createWithClassValidatorPipe(@Body(new ClassValidatorPipe()) createProductDto: CreateProductDto): Product {
      return this.productsService.create(createProductDto);
    }    
}
