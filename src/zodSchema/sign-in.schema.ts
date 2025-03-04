import { z } from "zod";

export const signInSchema = z.object({
    email: z.string(),
    password: z.string()
}).required()

export type signInDto = z.infer<typeof signInSchema>