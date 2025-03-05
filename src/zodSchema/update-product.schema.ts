import { z } from "zod";

export const updateProductSchema = z.object({
    product_name: z.string().optional(),
    product_price:  z.number().optional(),
    product_category:  z.string().optional(),
    userId: z.number()
})

// We create a dto type from zod schema
export type UpdateProductDto = z.infer<typeof updateProductSchema>
