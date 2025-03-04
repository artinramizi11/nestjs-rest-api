import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { createProductDto, createProductSchema } from 'src/zodSchema/create-product.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){}

    // Get all products
    @Get()
    getProduct(){
        return this.productsService.getProducts()
    }

    // Create new product for the user id
    @Post()
    @UseGuards(AuthGuard)
    createProduct(@Body(new ZodValidationPipe(createProductSchema)) body: createProductDto){
        return this.productsService.addProduct(body)
    }

    // Delete product from user's id
    @Delete("/:productId/users/:userId")
    @UseGuards(AuthGuard)
    deleteProduct(
        @Param("productId",ParseIntPipe) productId: number, @Param("userId", ParseIntPipe) userId: number
    ) {
        return this.productsService.removeProduct(productId)
    }
}
