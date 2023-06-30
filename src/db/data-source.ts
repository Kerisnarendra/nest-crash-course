import Photo from "src/photo/photo.entity";
import Product from "src/products/product.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: 'ShopDBProd.sqlite',
    entities: [Product, Photo],
    migrations: ['dist/db/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
