import { CanActivate, ExecutionContext , HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProductsService } from "src/products/products.service";

@Injectable()
export class ProductOwnerGuard implements CanActivate {
    constructor(
        private productService: ProductsService
    ){}
    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        const user = request.user
        const productId = Number(request.params.id)

        const product = await this.productService.getProductById(productId)

        const ownsProduct = user.sub === product.user.id 

        if(ownsProduct){
            return true 
        }

        throw new HttpException("You dont own this product to update", HttpStatus.UNAUTHORIZED)
     }
}