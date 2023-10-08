import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './dto/product.model';
import { ProductsDto } from './dto/product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Products) private productRepository: typeof Products) { }
    async GetAll() {
        let allUsers = await this.productRepository.findAll()
        return allUsers
    }
    async AddProduct(Product: ProductsDto) {
        let product: ProductsDto = {
            id: uuid(),
            madel: Product.madel,
            color: Product.color,
            describtion: Product.describtion,
            brand: Product.brand,
            type: Product.type,
            price: Product.price,
            image: Product.image
        }
        let AddProduct = await this.productRepository.create(product)
        return AddProduct
    }
}
