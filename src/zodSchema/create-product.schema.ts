import { IsInt, IsString } from "class-validator";
import { z } from "zod";

export const createProductSchema = z.object({
    product_name: z.string(),
    product_price:  z.number(),
    product_category:  z.string(),
    userId: z.number()
})

export type createProductDto = z.infer<typeof createProductSchema>