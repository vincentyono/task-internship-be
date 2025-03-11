import { Elysia } from "elysia";
import jwt from "jsonwebtoken";
import db from "../../database";

abstract class UserService {
  static async getProfile(id: number) {
    const user = await db.users.findUnique({
      where: {
        id
      }
    })

    return user;
  }

  static async updateProfile(id: number, name: string, email: string) {
    const user = await db.users.findUnique({
      where: {
        id
      }
    })
    if (user) {
      const updatedUser = await db.users.update({
        where: {
          id
        },
        data: {
          name,
          email
        }
      })

      return updatedUser;
    }
    return null;
  }

  static async deleteProfile(id: number) {
    const user = await db.users.findUnique({
      where: {
        id
      }
    })

    if (user) {
      const response = await db.users.delete({
        where: {
          id
        }
      })

      return response
    }

    return null;
  }
}

export default UserService;
