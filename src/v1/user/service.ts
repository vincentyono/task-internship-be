import { Elysia } from "elysia";
import bcrypt from "bcryptjs";
import { db } from "../../database";

abstract class UserService {
  static async getProfile() { }
  static async updateProfile() { }
  static async deleteProfile() { }
}

export default UserService;
