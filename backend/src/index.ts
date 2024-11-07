import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { verify } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import middleware from './middleware';

export enum Status{
  BADREQ = 400,
  NOTFOUND = 404,
  NOTPERMISSION = 403,
  ERROR = 405,
  PASS = 200,
  ALREADY = 409
}

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    jwt_secret: string
  },
  Variables:{
    userId: string
  }
}>()
app.use(cors());
app.use('/api/v1/blog/*', middleware)

app.route('/api/v1/user',userRouter)

app.route('/api/v1/blog',blogRouter)

export default app
