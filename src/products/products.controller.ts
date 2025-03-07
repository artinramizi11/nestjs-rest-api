import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { createProductDto, createProductSchema } from 'src/zodSchema/create-product.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateProductDto, updateProductSchema } from 'src/zodSchema/update-product.schema';
import { ProductOwnerGuard } from 'src/guards/productowner.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

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
    @Delete(":id")
    @UseGuards(AuthGuard,ProductOwnerGuard)
    deleteProduct(
        @Param("id",ParseIntPipe) id: number) {
        return this.productsService.removeProduct(id)
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard,ProductOwnerGuard)
    updateProduct(@Param("id") id: number, @Body(new ZodValidationPipe(updateProductSchema)) updateProduct: UpdateProductDto){
        return this.productsService.updateProduct(updateProduct)

    }
}
