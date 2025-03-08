import { z } from "zod";

export const paginationSchema = z.object({
    skip: z.string(),
    take: z.string()
})

export type PaginationDto = z.infer<typeof paginationSchema>