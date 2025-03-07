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
        const productId = request.params?.id

        const product = await this.productService.getProductById(Number(productId))

        if(product) {
            const ownsProduct = product.user.id === user.sub  

            if(ownsProduct) {
                return true
            }

        }


        throw new HttpException("You dont have permission for this action", HttpStatus.UNAUTHORIZED)
     }
}