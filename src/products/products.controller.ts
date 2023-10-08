import { Body, Controller, Get, HttpException, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDto } from './dto/product.dto';
import { Roles } from 'src/auth/roles-auth.decorater';
import { RoleGuard } from 'src/auth/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }
  @Get()
    GetAll() {
    return this.productService.GetAll()
  }
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post()
   AddProduct(@Body() product: ProductsDto) {
   this.productService.AddProduct(product)
    try {
      return new HttpException('creaated', HttpStatus.CREATED)
    }
    catch (e) {
      return new HttpException('error', HttpStatus.BAD_REQUEST)
    }
  }
}

