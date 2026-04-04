export interface MotoclickClientOnboardingForm {
  // Section A
  legal_name: string;
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
  operating_hours: any[];

  // Section B
  avg_orders: number;
  avg_ticket?: number | null;
  peak_hours?: string;
  own_drivers: string;
  self_delivering: string;
  using_3pl?: string;
  pain_points?: string;

  // Section C
  delivery_platforms: string[];
  pos_system: string;
  middleware_system: string;
  own_website?: string;
  own_app?: string;

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
  pos_access_name?: string;
  pos_access_user?: string;
  pos_access_pass?: string;
  pos_access_owner?: string;
  pos_access_phone?: string;
  pos_access_email?: string;
}
