import { Body, Controller, Get, HttpException, HttpStatus, Post, Param, ParseIntPipe, NotFoundException, UsePipes, UseGuards, SetMetadata, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CustomException } from 'src/exceptions/custom-exception';
import { CustomPipe } from 'src/pipes/custom-pipe';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipe';
import { createProductSchema } from './schemas/create-product.schema';
import { ClassValidatorPipe } from 'src/pipes/class-validator-pipe copy';
import { AuthGuard } from 'src/guards/auth-guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ExceptionInterceptor } from 'src/interceptors/exception.interceptor';
import { error } from 'console';
import { CacheInterceptor } from 'src/interceptors/cache.interceptor';
import { ProductDecorator } from 'src/decorators/product.decorator';
import Product from './product.entity';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    // @SetMetadata('roles', ['admin'])
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
      return await this.productsService.create(createProductDto);
    }

    @Post('bulk')
    // @SetMetadata('roles', ['admin'])
    async createBulk(@Body() createProductDto: CreateProductDto[]): Promise<Product[]> {
      console.log('bulk')
      console.log(createProductDto)
      return await this.productsService.createBulk(createProductDto);
    }

    @Get()
    async findAll(): Promise<Product[]> {
      return await this.productsService.findAll();
    }

    @Get('guard')
    @UseGuards(AuthGuard)
    async findAllWithGuard(): Promise<Product[]>  {
      return await this.productsService.findAll();
    }

    @Get('interceptor')
    @UseInterceptors(LoggingInterceptor)
    async findAllWithInterceptor(): Promise<Product[]>  {
      return await this.productsService.findAll();
    }

    @Get('transform-interceptor')
    @UseInterceptors(TransformInterceptor)
    async findAllWithTransformInterceptor(): Promise<Product[]>  {
      return await this.productsService.findAll();
    }

    @Get('exception-interceptor')
    @UseInterceptors(ExceptionInterceptor)
    async findAllWithExceptionInterceptor(): Promise<Product[]> {
      throw error();
    }

    @Get('cache-interceptor')
    @UseInterceptors(CacheInterceptor)
    async findAllWithCacheInterceptor(): Promise<Product[]> {
      return await this.productsService.findAll();
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
    async createWithValidationPipe(@Body() createProductDto: CreateProductDto): Promise<Product> {
      return await this.productsService.create(createProductDto);
    }

    @Post('class-validator-pipes')
    async createWithClassValidatorPipe(@Body(new ClassValidatorPipe()) createProductDto: CreateProductDto): Promise<Product> {
      return await this.productsService.create(createProductDto);
    }    

    @Post('with-decorator')
    async createWithDecorator(@ProductDecorator() createProductDto: CreateProductDto): Promise<Product> {
      return await this.productsService.create(createProductDto);
    }    
}
