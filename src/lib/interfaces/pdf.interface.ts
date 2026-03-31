export interface MotoclickClientOnboardingForm {
  // A. BUSINESS INFORMATION
  legalBusinessName: string;
  dbaTradeName: string;
  primaryContactName: string;
  titleRole: string;
  businessEmailAddress: string;
  businessPhoneNumber: string;
  cityBorough: string;
  zipCode: string;
  numberOfLocations: number;
  businessType: string;
  mainAddress: string;
  operatingHours: string;

  // B. OPERATIONAL PROFILE
  averageOrdersPerDay: number;
  averageTicket: number;
  peakHours: string;
  ownDeliveryDrivers: boolean;
  currentlySelfDelivering: boolean;
  usesLogisticsCompany: boolean;
  currentPainPoints: string;

  // C. CURRENT CHANNELS & TECH
  activeDeliveryPlatforms: string;
  posMiddlewareSystem: string;
  ownWebsiteWithOrders: boolean;
  ownApp: boolean;

  // D. MOTOCLICK INTEGRATION
  targetGoLiveDate: string;
  mainProblemToSolve: string;

  // E. BILLING & PAYMENT INFORMATION
  legalNameForContract: string;
  einTaxId: string;
  billingAddress: string;
  authorizedSignatory: string;

  // F. INTEGRATION POINT OF CONTACT
  integrationContactFullName: string;
  integrationContactPhoneNumber: string;
  integrationContactEmailAddress: string;

  // G. PLATFORM ACCOUNT INFORMATION
  uberEatsUsername?: string;
  uberEatsPassword?: string;
  doordashUsername?: string;
  doordashPassword?: string;
  grubhubUsername?: string;
  grubhubPassword?: string;
  sliceUsername?: string;
  slicePassword?: string;
  deliveryComUsername?: string;
  deliveryComPassword?: string;
  sharebitesUsername?: string;
  sharebitesPassword?: string;
  otherPlatformName?: string;
  otherPlatformUsername?: string;
  otherPlatformPassword?: string;

  // H. POS ACCESS INFORMATION
  posSystemName: string;
  posUsernameLoginEmail: string;
  posPassword?: string;
  posAccountOwnerName: string;
  posPhoneNumber: string;
  posSupportContactEmail: string;
}
