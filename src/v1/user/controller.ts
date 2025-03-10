import { Elysia, t } from "elysia";
import { profileSchema, updateProfileSchema, ProfileSchema, UpdateProfileSchema } from "./schemas";
import AuthService from "./service";
import jwt from "@elysiajs/jwt";

export const auth = new Elysia({ prefix: "/auth" })
  .use(jwt({
    name: "token",
    secret: process.env.JWT_SECRET as string,
    exp: '5m'
  }))
  .post("/register", ({ body: { name, email, password } }) => AuthService.register({ name, email, password }), {
    beforeHandle({ error }) {

    },
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    })
  })
