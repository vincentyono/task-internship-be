import { Elysia, t } from "elysia";
import { registerSchema } from "./schemas";
import AuthService from "./service";
import jwt from "@elysiajs/jwt";

export const auth = new Elysia({ prefix: "/auth" })
  .post("/register", ({ body: { name, email, password } }) => AuthService.register({ name, email, password }), {
    beforeHandle({ error }) { },
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    })
  })
  .post("/login", ({ body: { email, password } }) => AuthService.login({ email, password }), {
    beforeHandle({ error }) { },
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })
