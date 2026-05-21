import { z } from "zod";

export const assistantLeadSchema = z.object({
  businessType: z.string().trim().min(2).max(160),
  websiteType: z.string().trim().min(2).max(160),
  features: z.string().trim().min(2).max(800),
  budget: z.string().trim().min(2).max(120),
  timeline: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(6).max(60),
  company: z.string().trim().max(160).optional(),
  transcript: z.array(
    z.object({
      role: z.enum(["assistant", "user"]),
      content: z.string().trim().min(1).max(1200),
    }),
  ).max(40),
});

export type AssistantLeadInput = z.infer<typeof assistantLeadSchema>;

