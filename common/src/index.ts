
import {z} from "zod"

export const signUpschema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    name: z.string()
})

export const signInschema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})

export const createSchema = z.object({
    title: z.string(),
    content: z.string(),

})

export const updateSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
})

export type SignupType = z.infer<typeof signUpschema>
export type SigninType = z.infer<typeof signInschema>
export type createType = z.infer<typeof createSchema>
export type updateType = z.infer<typeof updateSchema>