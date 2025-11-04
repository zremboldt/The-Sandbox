import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export type User = {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
};

export type UserInput = z.infer<typeof userSchema>;
