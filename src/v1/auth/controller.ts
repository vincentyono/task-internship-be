import { Elysia, t } from "elysia";
import { registerSchema, loginSchema } from "./schemas";
import AuthService from "./service";

export const auth = new Elysia({ prefix: "/auth" })
  .post("/register", async ({ body: { name, email, password } }) => await AuthService.register({ name, email, password }), {
    beforeHandle: ({ body, error }) => {
      const e = registerSchema.safeParseAsync(body)
        .then(parsedBody => {
          if (!parsedBody.success) {
            return error(400, parsedBody.error.issues)
          }
        })

      if (e) return e;
    },
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
    }),
  })
  .post("/login", async ({ set, error, body: { email, password } }) => {
    const token = await AuthService.login({ email, password });
    set.headers["www-authenticate"] = `Bearer ${token}`
    return {
      message: "Successfully Login.",
      data: {
        token
      }
    };
  }, {
    beforeHandle: ({ body, error }) => {
      const e = loginSchema.safeParseAsync(body)
        .then(parsedBody => {
          if (!parsedBody.success) {
            return error(400, parsedBody.error.issues)
          }
        })
      if (e) return e;
    },
    body: t.Object({
      email: t.String(),
      password: t.String()
    }),
  })
