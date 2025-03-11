import { z } from "zod";

export const UpdateUserSchema = z.object({
    email: z.string().optional(),
    password: z.string().optional(),
    username: z.string().optional(),
})



// We create a dto type from zod schema
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
