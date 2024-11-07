import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Context } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { signInschema, signUpschema } from "@homosapien11/mediumclone";
import { cors } from "hono/cors";

enum Status{
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSION = 403,
    ERROR = 405,
    PASS = 200,
    ALREADY = 409
}

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        jwt_secret: string
    }
}>();
userRouter.use(cors())
userRouter.post('/signup', async (c:Context)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    try{

        const response = signUpschema.safeParse(body);
        if(!response.success){
            return c.text("Invalid user inputs", Status.BADREQ);
        }
        const alreadyExists = await prisma.user.findFirst({
            where:{
                email: body.email
            }
        })
        if(alreadyExists){
            return c.text("User already exists", Status.ALREADY)
        }
        const user = await prisma.user.create({
            data:{
                email: body.email,
                password: body.password,
                name: body.name
            }
        })

    
        const token = await sign({id: user.id}, c.env.jwt_secret)
    
        return c.json({
            message: "User signed up successfully",
            token: token
        }, Status.PASS)
    }catch{
        return c.text("error while signing up", Status.BADREQ)
    }

})
userRouter.post('/signin', async (c:Context)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const body = await c.req.json();

        const response = signInschema.safeParse(body)
        if(!response.success){
            return c.text("Invalid user inputs", Status.BADREQ)
        }

        const currUser = await prisma.user.findUnique({
            where:{
                email: body.email,
                password: body.password
            }
        })
        if(!currUser){
            return c.text("User not found", Status.NOTFOUND)
        }
        const token = await sign({id: currUser.id}, c.env.jwt_secret)

        return c.json({
            message: "Signed in successfully",
            token
        }, Status.PASS)
    }
    catch{
        return c.text("Error encountered", Status.BADREQ)
    }

})