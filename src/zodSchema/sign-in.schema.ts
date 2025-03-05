import { z } from "zod";

export const signInSchema = z.object({
    email: z.string(),
    password: z.string()
}).required()


// We create a dto type from zod schema
export type signInDto = z.infer<typeof signInSchema>