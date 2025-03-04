import { Injectable, NotFoundException } from '@nestjs/common';
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

    // Remove product from the user id
    async removeProduct(userId: number): Promise<User | {message: string}> {

        const user = await this.usersService.findUserById(userId);
        if(!user) {
            return {message: "No user found with that id"}
        }
        const product = await this.productRepository.findOne({where: {user: {id: userId}}})
        if(!product) {
            throw new NotFoundException()
        }
        await this.productRepository.remove(product)
        return {message: "sucessfully removed the product"}
    
    }
       

}
