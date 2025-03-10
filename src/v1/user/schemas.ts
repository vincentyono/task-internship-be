import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
})

export const updateProfileSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type ProfileSchema = z.infer<typeof profileSchema>;
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

