import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "name must contain at least 2 characters"),
  email: z.email("invalid email address").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "password must contain at least 8 characters")
    .max(100),
});

export type RegisterDto = z.infer<typeof registerSchema>;
