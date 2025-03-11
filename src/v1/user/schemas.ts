import { z } from "zod";

export const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
})

export const updateProfileSchema = z.object({
  name: z.string({
    required_error: "Name is required.",
    invalid_type_error: "Name must be a string"
  }).min(1, "Name cannot be empty"),
  email: z.string({
    required_error: "Email is required.",
    invalid_type_error: "Email must be a string."
  }).email({ message: "Email must be valid." }),
})

export type ProfileSchema = z.infer<typeof profileSchema>;
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

