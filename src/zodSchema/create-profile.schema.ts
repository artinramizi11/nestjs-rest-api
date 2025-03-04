import { z } from "zod";

export const createProfileSchema = z.object({

    address: z.string(),
    city: z.string() ,
    country: z.string(),
    gender: z.string(),
    userId: z.number()
})

export type createProfileDto = z.infer<typeof createProfileSchema>