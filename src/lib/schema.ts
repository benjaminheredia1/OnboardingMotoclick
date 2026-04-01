import { z } from "zod";

export const operatingHoursSlotSchema = z.object({
  id: z.number(),
  days: z.array(z.string()).min(1, "Select at least one day"),
  open: z.string().min(1, "Opening time is required"),
  close: z.string().min(1, "Closing time is required"),
  valid_from: z.string().optional().nullable(),
  valid_to: z.string().optional().nullable(),
});

export const onboardingSchema = z.object({
  // Section A
  legal_name: z.string().min(1, "Legal Business Name is required").max(100, "Max 100 characters"),
  dba_name: z.string().min(1, "DBA / Trade Name is required").max(100, "Max 100 characters"),
  primary_contact_name: z.string().min(1, "Primary Contact Name is required").max(100, "Max 100 characters"),
  title_role: z.string().max(100, "Max 100 characters").optional(),
  email_address: z.string().email("Invalid email address").max(100, "Max 100 characters"),
  phone_prefix: z.string().min(1, "Country code is required"),
  phone_number: z.string()
    .min(1, "Phone number is required")
    .max(30, "Max 30 digits")
    .regex(/^\d+$/, "Only numbers are allowed"),
  city_borough: z.string().min(1, "City / Borough is required").max(100, "Max 100 characters"),
  zip_code: z.string().max(20, "Max 20 characters").optional(),
  number_of_locations: z.coerce.number().min(1, "Must be at least 1 location"),
  business_type: z.enum([
    "Restaurant",
    "Bakery",
    "Grocery",
    "Dark Kitchen",
    "Chain",
    "Franchise",
  ]),
  main_address: z.string().min(1, "Main Address is required").max(100, "Max 100 characters"),
  operating_hours: z.array(operatingHoursSlotSchema).min(1, "At least one operating hours slot is required"),

  // Section B
  avg_orders: z.coerce.number().min(0).default(0),
  avg_ticket: z.coerce.number().optional().nullable(),
  peak_hours: z.string().optional(),
  own_drivers: z.enum(["Yes", "No", "Partially"]),
  self_delivering: z.enum(["Yes", "No"]),
  using_3pl: z.enum(["Yes", "No"]).optional(),
  pain_points: z.string().optional(),

  // Section C
  delivery_platforms: z.array(z.string()).optional().default([]),
  pos_system: z.string().optional(),
  own_website: z.enum(["Yes", "No"]).optional(),
  own_app: z.enum(["Yes", "No"]).optional(),

  // Section D
  target_date: z.date(),
  main_problem: z.string().optional(),

  // Section E
  contract_name: z.string().min(1, "Legal Name for Contract is required"),
  ein_tax_id: z.string().optional(),
  billing_address: z.string().min(1, "Billing Address is required"),
  authorized_signatory: z.string().min(1, "Authorized Signatory is required"),

  // Section F
  comm_channel: z.string().optional(),
  notes: z.string().optional(),

  // Section G
  uber_eats_user: z.string().optional(),
  uber_eats_pass: z.string().optional(),
  doordash_user: z.string().optional(),
  doordash_pass: z.string().optional(),
  grubhub_user: z.string().optional(),
  grubhub_pass: z.string().optional(),
  slice_user: z.string().optional(),
  slice_pass: z.string().optional(),
  delivery_com_user: z.string().optional(),
  delivery_com_pass: z.string().optional(),
  sharebites_user: z.string().optional(),
  sharebites_pass: z.string().optional(),
  other_platform_name: z.string().optional(),
  other_platform_user: z.string().optional(),
  other_platform_pass: z.string().optional(),

  // Section H
  pos_access_name: z.string().optional(),
  pos_access_user: z.string().optional(),
  pos_access_pass: z.string().optional(),
  pos_access_owner: z.string().optional(),
  pos_access_phone: z.string().optional(),
  pos_access_email: z.string().optional(),

  // Credit Card & Signature (New)
  card_holder_name: z.string().optional(),
  card_number: z.string().optional(),
  card_expiry: z.string().optional(),
  card_cvv: z.string().optional(),
  card_zip: z.string().optional(),
  card_contact_email: z.string().email("Invalid email address").optional().or(z.literal("")),
  signature_data: z.string().optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
