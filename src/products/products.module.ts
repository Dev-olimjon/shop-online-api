import { Module } from '@nestjs/common';
import { Products } from './dto/product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [
    SequelizeModule.forFeature([Products]),
    ],
    providers: [ProductsService],
    controllers: [ProductsController]
})
export class ProductsModule { }
