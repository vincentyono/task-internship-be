import { Elysia } from "elysia";
import { auth } from "./v1/auth/controller";
import { user } from "./v1/user/controller";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia({ prefix: "/v1" })
  .use(swagger())
  .use(auth)
  .use(user)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
