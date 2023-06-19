import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    private readonly products: Product[] = [{ id: Date.now(), name: 'Nest' }];

    create(createProductDto: CreateProductDto) {
      const newProduct = { id: Date.now(), ...createProductDto };
      this.products.push(newProduct);
      return newProduct;
    }
  
    findAll(): Product[] {
      return this.products;
    }
}
