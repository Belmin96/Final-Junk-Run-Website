import { z } from "zod";

// Shared validation for the "Post a Job" form, used both client-side
// (for inline errors) and server-side (in the API route) so the two
// never drift apart.
export const jobPhotoSchema = z.object({
  dataUrl: z.string().startsWith("data:image/", "Must be an image file"),
  caption: z.string().max(140).optional(),
});

export const jobFormSchema = z.object({
  title: z.string().trim().min(3, "Give the job a short title").max(120),
  description: z
    .string()
    .trim()
    .min(10, "Add a bit more detail so contractors can estimate accurately")
    .max(4000),
  pickupAddressLine1: z.string().trim().min(3, "Street address is required"),
  pickupAddressLine2: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().min(1, "City is required"),
  state: z
    .string()
    .trim()
    .min(2, "Use a 2-letter state code")
    .max(2, "Use a 2-letter state code")
    .toUpperCase(),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  pickupDate: z
    .string()
    .refine((v) => !Number.isNaN(Date.parse(v)), "Pick a valid date"),
  photos: z.array(jobPhotoSchema).max(8, "You can attach up to 8 photos"),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;

export const reviewFormSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const contractorProfileFormSchema = z.object({
  businessName: z.string().trim().min(2, "Business name is required").max(160),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
});

export const estimateFormSchema = z.object({
  amountCents: z
    .number()
    .int()
    .min(500, "Estimate must be at least $5")
    .max(10_000_00, "Estimate must be under $10,000"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const arrivalFormSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const profileFormSchema = z.object({
  firstName: z.string().trim().max(80).optional().or(z.literal("")),
  lastName: z.string().trim().max(80).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal("")),
  addressLine1: z.string().trim().max(200).optional().or(z.literal("")),
  addressLine2: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  state: z.string().trim().max(2).optional().or(z.literal("")),
  zip: z.string().trim().max(10).optional().or(z.literal("")),
});
