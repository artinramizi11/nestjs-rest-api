import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { createProductDto } from 'src/zodSchema/create-product.schema';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private usersService: UsersService
    ){}
    
    // Get all products from all users
    async getProducts(): Promise<Product[] | {message: string}>{
        const products = await this.productRepository.find()
        if(products.length === 0) {
            return {message: "There is no products available"}
        }
       return products
    }

    // Add product for the user id
    async addProduct(product: createProductDto): Promise<User | {message: string}>{
        const user = await this.usersService.findUserById(product.userId)
        if(!user) {
            throw new NotFoundException()
        }
        const newProduct = this.productRepository.create({...product, user: {id: product.userId}})
        await this.productRepository.save(newProduct)
       return {message: "Sucessfully added a new product"} 
    }

    // Remove product by id - is secured by the product ownership guard
    async removeProduct(id: number): Promise<Product | {message: string}> {
        const product = await this.productRepository.findOne({where: {id}})
        if(!product) {
            throw new NotFoundException()
        }
        await this.productRepository.remove(product)
        return {message: "sucessfully removed the product"}
    
    }

    async updateProduct(updated) {
        const product = await this.productRepository.findOne({where: {user: {id: updated.userId}}})
        if(!product){
            throw new HttpException("You dont have any product on this user id", HttpStatus.NOT_FOUND)
        }
        Object.assign(product,updated)
        return product
    }

    async getProductById(id: number){
        const product = await this.productRepository.findOne({where: {id},relations: ['user']})
        if(!product){
            throw new HttpException("No product found with this id",HttpStatus.NOT_FOUND)
        }
        return product
    }

       

}
