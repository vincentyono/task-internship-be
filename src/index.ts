import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import { auth } from "./v1/auth/controller";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia({ prefix: "/v1" })
  .use(swagger())
  .use(jwt({
    name: "token",
    secret: process.env.JWT_SECRET as string,
    exp: process.env.JWT_EXP as string,
  }))
  .use(auth)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
