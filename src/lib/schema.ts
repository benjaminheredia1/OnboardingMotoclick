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
  legal_name: z.string().min(1, "Legal Name is required"),
  trade_name: z.string().min(1, "Trade Name is required"),
  contact_name: z.string().min(1, "Primary Contact Name is required"),
  title_role: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City / Borough is required"),
  zip_code: z.string().optional(),
  locations: z.coerce.number().min(1, "Must be at least 1 location"),
  address: z.string().min(1, "Main Address is required"),
  business_type: z.enum([
    "Restaurant",
    "Bakery",
    "Grocery",
    "Dark Kitchen",
    "Chain",
    "Franchise",
  ]),
  operating_hours: z.array(operatingHoursSlotSchema).min(1, "At least one operating hours slot is required"),

  // Section B
  avg_orders: z.coerce.number().min(0).default(0),
  avg_ticket: z.coerce.number().optional().nullable(),
  peak_hours: z.string().optional(),
  own_drivers: z.enum(["Yes", "No", "Partially"]),
  self_delivering: z.enum(["Yes", "No"]),
  using_3pl: z.enum(["Yes", "No"]).optional(),
  pain_points: z.array(z.string()).optional().default([]),

  // Section C
  delivery_platforms: z.array(z.string()).optional().default([]),
  pos_system: z.array(z.string()).optional().default([]),
  pos_system_other: z.string().optional(),
  own_website: z.enum(["Yes", "No"]).optional(),
  website_url: z.string().optional(),
  own_app: z.enum(["Yes", "No"]).optional(),
  app_link: z.string().optional(),

  // Section D
  service_type: z.enum(["API", "Own Integration"]),
  main_problem: z.string().optional(),

  // Section E
  contract_name: z.string().min(1, "Legal Name for Contract is required"),
  ein_tax_id: z.string().optional(),
  billing_address: z.string().min(1, "Billing Address is required"),
  authorized_signatory: z.string().min(1, "Authorized Signatory is required"),

  // Section F
  comm_channel: z.enum(["Slack", "WhatsApp", "Email"]),
  notes: z.string().optional(),

  // Section G
  cred_doordash_user: z.string().optional(),
  cred_doordash_pass: z.string().optional(),
  cred_doordash_notes: z.string().optional(),

  cred_uber_user: z.string().optional(),
  cred_uber_pass: z.string().optional(),
  cred_uber_notes: z.string().optional(),

  cred_delivery_user: z.string().optional(),
  cred_delivery_pass: z.string().optional(),
  cred_delivery_notes: z.string().optional(),

  cred_own_user: z.string().optional(),
  cred_own_pass: z.string().optional(),
  cred_own_notes: z.string().optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
