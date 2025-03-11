import { Elysia, t } from "elysia";
import { profileSchema, updateProfileSchema } from "./schemas";
import UserService from "./service";
import { getBearerToken, verifyToken } from "./utils";

export const user = new Elysia({ prefix: "/user" })
  .get("/profile", async ({ error, headers }) => {
    const bearer = headers["www-authenticate"]

    const payload = verifyToken(bearer!);

    if (!payload) return error(401, "Unauthorized.")

    const user = await UserService.getProfile(payload.data);

    if (user) {
      return await profileSchema.parseAsync({
        id: user.id, name: user.name, email: user.email
      })
    }

    return error(400, "User not found.")
  }, {
    beforeHandle: ({ headers, error }) => {
      if (!getBearerToken(headers)) {
        return error(401, "Unauthorized.")
      }
    }
  })
  .put("/profile", async ({ error, headers, body: { name, email } }) => {
    const bearer = headers["www-authenticate"]

    const payload = verifyToken(bearer!);

    if (!payload) return error(401, "Unauthorized.")

    const user = await UserService.updateProfile(parseInt(payload.data as string), name, email);

    if (user) {
      return {
        message: "Successfully updated.",
        date: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    }
  },
    {
      beforeHandle: async ({ headers, body, error }) => {
        if (!getBearerToken(headers)) return error(401, "Unauthorized.")
        const payload = await updateProfileSchema.safeParseAsync(body);
        if (!payload.success) return error(400, payload.error.issues)
      },
      body: t.Object({
        name: t.String(),
        email: t.String()
      }),
    })
  .delete("/profile/:id", async ({ headers, error, params: { id } }) => {
    const bearer = headers["www-authenticate"]

    const payload = verifyToken(bearer!);

    if (!payload) return error(401, "Unauthorized.")

    const user = await UserService.deleteProfile(id)

    if (user) {
      return {
        message: "Successfully deleted.",
        date: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    }

    return error(400, "User not found.")
  }, {
    beforeHandle: ({ headers, error }) => {
      if (!getBearerToken(headers)) {
        return error(401, "Unauthorized.")
      }
    },
    params: t.Object({
      id: t.Number()
    })
  })
