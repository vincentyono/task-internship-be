import { RegisterSchema, LoginSchema } from "./schemas";
import jwt from "jsonwebtoken";
import db from "../../database";

abstract class AuthService {
  static async register({ name, email, password }: RegisterSchema) {
    const user = await db.users.findUnique({
      where: {
        email
      }
    })

    if (user) throw new Error("");

    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10
    })

    const newUser = await db.users.create({
      data: { name, email, hashedPassword }
    })

    return newUser;
  }
  static async login({ email, password }: LoginSchema) {
    const user = await db.users.findUnique({
      where: {
        email
      }
    })

    if (!user) throw new Error();

    const isPasswordCorrect = await Bun.password.verify(password, user.hashedPassword);

    if (!isPasswordCorrect) throw new Error("Invalid Credential.");

    const token = jwt.sign({
      data: user.id,
    }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN as string }
    )

    return token;
  }
}

export default AuthService;
