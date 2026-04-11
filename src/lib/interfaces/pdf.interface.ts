export interface MotoclickClientOnboardingForm {
  // Section A
  legal_name: string;
  business_logo?: { file: File, preview: string };
  dba_name: string;
  primary_contact_name: string;
  title_role?: string;
  email_address: string;
  phone_prefix?: string;
  phone_number: string;
  city_borough: string;
  zip_code?: string;
  number_of_locations: number;
  business_type: string;
  main_address: string;
  avg_orders_per_location: number;
  location_addresses?: { address: string }[];
  operating_hours: any[];

  // Section B
  avg_orders: number;
  avg_ticket?: number | null;
  peak_hours?: string;
  own_drivers: string;
  self_delivering: string;
  using_3pl?: string;
  using_3pl_use? : string;
  pain_points?: string;

  // Section C
  delivery_platforms: string[];
  pos_system: string;
  middleware_system: string;
  own_website?: string;
  own_website_url?: string;
  own_app?: string;
  own_app_url?: string;

  // Section D
  target_date: Date;
  main_problem?: string;

  // Section E
  contract_name: string;
  ein_tax_id?: string;
  billing_address: string;
  authorized_signatory: string;

  // Section F
  comm_channel?: string;
  notes?: string;

  // Section G
  uber_eats_user?: string;
  uber_eats_pass?: string;
  doordash_user?: string;
  doordash_pass?: string;
  grubhub_user?: string;
  grubhub_pass?: string;
  slice_user?: string;
  slice_pass?: string;
  delivery_com_user?: string;
  delivery_com_pass?: string;
  sharebites_user?: string;
  sharebites_pass?: string;
  other_platform_name?: string;
  other_platform_user?: string;
  other_platform_pass?: string;

  // Section H
  pos_access?: {
    name?: string;
    user?: string;
    pass?: string;
    owner?: string;
    phone?: string;
    email?: string;
  }[];
  other_accounts?: any[];
}
