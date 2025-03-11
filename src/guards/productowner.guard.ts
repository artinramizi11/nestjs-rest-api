import { CanActivate, ExecutionContext , HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Product } from "src/entities/product.entity";
import { User } from "src/entities/user.entity";
import { ProductsService } from "src/products/products.service";

@Injectable()
export class ProductOwnerGuard implements CanActivate {
    constructor(
        private productService: ProductsService
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest()
        const user = request.user
        const productId = request.params?.id

        const product: Product = await this.productService.getProductById(Number(productId))

        if(product) {
            const ownsProduct = product.user.id === user.sub  

            if(ownsProduct) {
                return true
            }

        }


        throw new HttpException("You dont have permission for this action", HttpStatus.UNAUTHORIZED)
     }
}