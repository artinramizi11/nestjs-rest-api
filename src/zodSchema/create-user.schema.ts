import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string(),
    password: z.string(),
    username: z.string(),
})



// We create a dto type from zod schema
export type CreateUserDto = z.infer<typeof createUserSchema>;
    