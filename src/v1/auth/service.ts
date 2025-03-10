import { Elysia } from "elysia";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema, RegisterSchema, LoginSchema } from "./schemas";
import { db } from "../../database";

abstract class AuthService {
  static async register({ name, email, password }: RegisterSchema) {
    try {
      const hash = await bcrypt.hash(password, 10);
      const user = await db.user.create({
        data: { name, email, password }
      })

      return user
    } catch (e) {
    }
  }
  static async login({ email, password }: LoginSchema) { }

}

export default AuthService;
