import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono"
import { createSchema, updateSchema } from "@homosapien11/mediumclone";
import { Status } from "..";
import { cors } from "hono/cors";


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        jwt_secret: string
    },
    Variables:{
        userId: string
    }
}>();
blogRouter.use(cors())
blogRouter.post('/post', async (c: Context)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const body:{
            title: string,
            content: string
        } = await c.req.json()
        const response = createSchema.safeParse(body)
        if(!response.success){
            return c.text("Invalid title / content for the post ", Status.BADREQ)
        }

        const post = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: c.get("userId") as string
            },
            select:{
                title:true,
                content:true,
                authorId:true,
                id: true
            }
        })
        console.log(post)

        return c.json({
            message: "Post created successfully",
            id: post.id
        }, Status.PASS)
    }catch{
        return c.text("Error encountered while creating the post", Status.ERROR)
    }
})
blogRouter.put('/update', async (c: Context)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const body:{
            id: string,
            title: string,
            content: string
        } = await c.req.json()

        const response = updateSchema.safeParse(body)
        if(!response.success){
            return c.text("invalid post / user id", Status.BADREQ)

        }
        const updatedPost = await prisma.post.update({
            where:{
                id: body.id,
                authorId: c.get('userId')
            },
            data:{
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            message: "updated the post successfully",
            id: updatedPost.id
        }, Status.PASS)
    }catch{
        return c.text("error while updating", Status.BADREQ)
    }

})
blogRouter.get('/find/:id', async (c: Context)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const postId = c.req.param("id")
        const result = await prisma.post.findFirst({
            where:{
                id: postId
            },
            select:{
                id: true,
                title: true,
                content: true,
                authorId: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        if(!result){
            return c.text("post not found1234", Status.NOTFOUND)
        }
    
        return c.json({
            post: result
        }, Status.PASS)
    }catch{
        return c.text("error encountered", Status.ERROR)
    }

})

blogRouter.get('/bulk', async (c: Context)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const result = await prisma.post.findMany({
            select:{
                id: true,
                title: true,
                content: true,
                
                author: {
                    select:{
                        name: true
                    }
                },
                authorId: true
            }
        })
        if(!result){
            return c.text("no posts found", Status.NOTFOUND)
        }

        return c.json({result},Status.PASS)
    }catch{
        return c.text("error encountered ", Status.BADREQ)
    }
})