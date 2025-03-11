import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({
    required_error: "Name is required.",
    invalid_type_error: "Name must be a string"
  })
    .min(1, { message: "Name cannot be empty." }),
  email: z.string({
    required_error: "Email is required.",
    invalid_type_error: "Email must be a string"
  }).email(),
  password: z.string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long." })
})

export const loginSchema = z.object({
  email: z.string({ required_error: "Email cannot be empty." }).email(),
  password: z.string({ required_error: "Password is required." })
    .min(1, { message: "Password cannot be empty." }),
})

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
