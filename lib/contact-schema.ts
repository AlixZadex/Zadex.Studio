import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(6, "Enter a valid phone number.").max(40),
  company: z.string().trim().max(120).optional(),
  service: z.string().trim().min(2, "Tell us which service you need.").max(120),
  message: z
    .string()
    .trim()
    .min(20, "Please share a bit more detail (at least 20 characters).")
    .max(5000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
