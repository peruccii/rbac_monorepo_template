import { roleSchema } from "../roles.ts";
import { z } from 'zod'

export const userSchema = z.object({
    id: z.string(),
    role: roleSchema,
})

export type User = z.infer<typeof userSchema>