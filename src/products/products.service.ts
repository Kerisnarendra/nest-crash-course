import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import Product from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
      private dataSource: DataSource,
      @InjectRepository(Product)
      private productsRepository: Repository<Product>
      ){}

    async create(createProductDto: CreateProductDto): Promise<Product> {
      const newProduct = { id: Date.now(), ...createProductDto };
      return await this.productsRepository.save(newProduct);
    }
  
    async findAll(): Promise<Product[]> {
      return this.productsRepository.find();
    }

    async findOne(id: number): Promise<Product | null> {
      return this.productsRepository.findOneBy({id})
    }

    async createBulk(createProductDto: CreateProductDto[]): Promise<Product[]> {
      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        let counter = 0;
        const products = createProductDto.map(newProduct => {
          const product = new Product();
          product.name = newProduct.name;
          product.id = Date.now()-(counter++);
          return product;
        });
        
        await Promise.all(products.map(product => queryRunner.manager.save(product)));
        await queryRunner.commitTransaction();
        return products;
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }
}
