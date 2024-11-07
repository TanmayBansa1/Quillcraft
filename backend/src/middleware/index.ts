import { Context, Hono, Next } from "hono";
import { verify } from "hono/jwt";
import { Status } from "..";
import { useImperativeHandle } from "hono/jsx";
import { cors } from "hono/cors";

export default async function middleware(c: Context, next: Next) {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
  const payload = await verify(token, c.env.jwt_secret) as { id: string };

	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set("userId", payload.id);
	await next()
}

