import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        name: z.string().trim()
            .min(2, "Name must be at least 2 characters long")
            .max(50, "Name must be at most 50 characters long")
            .regex(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
        email: z.string().trim()
            .toLowerCase()
            .email("Invalid email address"),
        password: z.string().trim()
            .min(8, "Password must be at least 8 characters long")
            .max(100, "Password is too long"),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim()
            .toLowerCase()
            .email("Invalid email address"),
        password: z.string().trim()
            .min(8, "Password must be at least 8 characters long"),
    }),
});