import { z } from "zod";

const cleanTextRegex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,&\-\/\(\)]*$/;
const cleanTextMsg = "No special characters allowed (only letters, numbers, spaces, and basic punctuation like . , & - / ( ))";

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
  legal_name: z.string().min(1, "Legal Business Name is required").max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg),
  dba_name: z.string().min(1, "DBA / Trade Name is required").max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg),
  primary_contact_name: z.string().min(1, "Primary Contact Name is required").max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg),
  title_role: z.string().max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  email_address: z.string().email("Invalid email address").max(100, "Max 100 characters"),
  phone_prefix: z.string().min(1, "Country code is required"),
  phone_number: z.string()
    .min(1, "Phone number is required")
    .max(30, "Max 30 digits")
    .regex(/^\d+$/, "Only numbers are allowed"),
  city_borough: z.string().min(1, "City / Borough is required").max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg),
  zip_code: z.string().max(20, "Max 20 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  number_of_locations: z.coerce.number().min(1, "Must be at least 1 location"),
  avg_orders_per_location: z.coerce
    .number()
    .min(0, "Must be a non-negative number")
    .default(0),
  location_addresses: z
    .string()
    .max(1000, "Max 1000 characters")
    .regex(cleanTextRegex, cleanTextMsg)
    .optional(),
  business_type: z.enum([
    "Restaurant",
    "Bakery",
    "Grocery",
    "Dark Kitchen",
    "Chain",
    "Franchise",
  ]),
  main_address: z.string().min(1, "Main Address is required").max(200, "Max 200 characters").regex(cleanTextRegex, cleanTextMsg),
  operating_hours: z.array(operatingHoursSlotSchema).min(1, "At least one operating hours slot is required"),

  // Section B
  avg_orders: z.coerce.number().min(0).default(0),
  avg_ticket: z.coerce.number().optional().nullable(),
  peak_hours: z.string().max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  own_drivers: z.enum(["Yes", "No", "Partially"]),
  self_delivering: z.enum(["Yes", "No"]),
  using_3pl: z.enum(["Yes", "No"]).optional(),
  using_3pl_use: z.string().max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  pain_points: z.string().max(500, "Max 500 characters").regex(cleanTextRegex, cleanTextMsg).optional(),

  // Section C
  delivery_platforms: z.array(z.string()).optional().default([]),
  pos_system: z.string().min(1, "POS System is required").max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg),
  middleware_system: z.string().min(1, "Middleware System is required").max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg),
  own_website: z.enum(["Yes", "No"]).optional(),
  own_app: z.enum(["Yes", "No"]).optional(),
  own_website_url: z.string().min(5).max(100).regex(cleanTextRegex, cleanTextMsg).optional(),
  own_app_url: z.string().min(5).max(100).regex(cleanTextRegex, cleanTextMsg).optional(),
  
  // Section D
  target_date: z.date(),
  main_problem: z.string().max(500, "Max 500 characters").regex(cleanTextRegex, cleanTextMsg).optional(),

  // Section E
  contract_name: z.string().min(1, "Legal Name for Contract is required").max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg),
  ein_tax_id: z.string().max(50, "Max 50 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  billing_address: z.string().min(1, "Billing Address is required").max(200, "Max 200 characters").regex(cleanTextRegex, cleanTextMsg),
  authorized_signatory: z.string().min(1, "Authorized Signatory is required").max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg),

  // Section F
  comm_channel: z.string().max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  notes: z.string().max(1000, "Max 1000 characters").regex(cleanTextRegex, cleanTextMsg).optional(),

  // Section G
  uber_eats_user: z.string().max(100, "Max 100 characters").optional(),
  uber_eats_pass: z.string().max(100, "Max 100 characters").optional(), // Passwords allow special chars
  doordash_user: z.string().max(100, "Max 100 characters").optional(),
  doordash_pass: z.string().max(100, "Max 100 characters").optional(), 
  grubhub_user: z.string().max(100, "Max 100 characters").optional(),
  grubhub_pass: z.string().max(100, "Max 100 characters").optional(),
  slice_user: z.string().max(100, "Max 100 characters").optional(),
  slice_pass: z.string().max(100, "Max 100 characters").optional(),
  delivery_com_user: z.string().max(100, "Max 100 characters").optional(),
  delivery_com_pass: z.string().max(100, "Max 100 characters").optional(),
  sharebites_user: z.string().max(100, "Max 100 characters").optional(),
  sharebites_pass: z.string().max(100, "Max 100 characters").optional(),
  other_platform_name: z.string().max(100, "Max 100 characters").optional(),
  other_platform_user: z.string().max(100, "Max 100 characters").optional(),
  other_platform_pass: z.string().max(100, "Max 100 characters").optional(),

  // Section H
  pos_access_name: z.string().max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  pos_access_user: z.string().max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  pos_access_pass: z.string().max(100, "Max 100 characters").optional(),
  pos_access_owner: z.string().max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  pos_access_phone: z.string().max(50, "Max 50 characters").regex(/^[0-9+\s\-()]*$/, "Invalid phone format").optional(), // Phone format
  pos_access_email: z.string().email("Invalid email address").max(100, "Max 100 characters").optional().or(z.literal("")),

  // Credit Card & Signature (New)
  card_holder_name: z.string().max(100, "Max 100 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  card_number: z.string().max(20, "Max 20 digits").regex(/^[0-9\s]*$/, "Only numbers allowed").optional(),
  card_expiry: z.string().max(7, "Max 7 characters").regex(/^[0-9\/]*$/, "MM/YY format").optional(),
  card_cvv: z.string().max(4, "Max 4 digits").regex(/^[0-9]*$/, "Digits only").optional(),
  card_zip: z.string().max(10, "Max 10 characters").regex(cleanTextRegex, cleanTextMsg).optional(),
  card_contact_email: z.string().email("Invalid email address").optional().or(z.literal("")),
  signature_data: z.string().optional(), // Base64 data, allow
  other_accounts: z.array(z.object({
    name: z.string().max(100, "Max 100 characters").optional(),
    user: z.string().max(100, "Max 100 characters").optional(),
    pass: z.string().max(100, "Max 100 characters").optional(),
  })).optional().default([]),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
