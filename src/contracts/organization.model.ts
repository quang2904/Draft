export interface IRegisterAsEmployee {
  registerAsEmployee?: boolean;
  startedWorkOn?: Date;
}

export enum OrganizationPermissionsEnum {
  ALLOW_MANUAL_TIME = 'ALLOW_MANUAL_TIME',
  ALLOW_MODIFY_TIME = 'ALLOW_MODIFY_TIME',
  ALLOW_DELETE_TIME = 'ALLOW_DELETE_TIME',
  ALLOW_FUTURE_DATE = 'FUTURE_DATE_ALLOWED',
}

export enum ListsInputTypeEnum {
  DEPARTMENTS = 'DEPARTMENTS',
  POSITIONS = 'POSITIONS',
  VENDORS = 'VENDORS',
}

export enum OrganizationSelectInput {
  id = 'id',
  name = 'name',
  profile_link = 'profile_link',
  valueDate = 'valueDate',
  imageUrl = 'imageUrl',
  currency = 'currency',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  isActive = 'isActive',
  tags = 'tags',
}

export enum RegionsEnum {
  'EN' = 'English (United States)',
  'BG' = 'Bulgarian (Bulgaria)',
  'HE' = 'Hebrew (Israel)',
  'RU' = 'Russian (Russia)',
}

export enum DefaultValueDateTypeEnum {
  TODAY = 'TODAY',
  END_OF_MONTH = 'END_OF_MONTH',
  START_OF_MONTH = 'START_OF_MONTH',
}

export enum ProjectBillingEnum {
  RATE = 'RATE',
  FLAT_FEE = 'FLAT_FEE',
  MILESTONES = 'MILESTONES',
}

export enum AlignmentOptions {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
}

export enum CurrencyPosition {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum WeekDaysEnum {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum BonusTypeEnum {
  PROFIT_BASED_BONUS = 'PROFIT_BASED_BONUS',
  REVENUE_BASED_BONUS = 'REVENUE_BASED_BONUS',
}

export enum ClientFocusEnum {
  VERY_SMALL_BUSINESSES = 'Very Small Businesses',
  SMALL_BUSINESSES = 'Small Businesses',
  MEDIUM_BUSINESSES = 'Medium Businesses',
  LARGE_BUSINESSES = 'Large Businesses',
}

export enum ProjectOwnerEnum {
  CLIENT = 'CLIENT',
  INTERNAL = 'INTERNAL',
}

export enum MinimumProjectSizeEnum {
  ONE_THOUSAND = '1000+',
  FIVE_THOUSAND = '5000+',
  TEN_THOUSAND = '10000+',
  TWENTY_FIVE_THOUSAND = '25000+',
  FIFTY_THOUSAND = '50000+',
  ONE_HUNDRED_THOUSAND = '100000+',
}

export const DEFAULT_PROFIT_BASED_BONUS = 75;
export const DEFAULT_REVENUE_BASED_BONUS = 10;
export const DEFAULT_INVITE_EXPIRY_PERIOD = 7;

export enum CrudActionEnum {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export const DEFAULT_DATE_FORMATS: string[] = ['L', 'LL', 'dddd, LL'];
export const DEFAULT_TIME_FORMATS: number[] = [12, 24];

export interface IKeyValuePair {
  key: string;
  value: boolean | string;
}

export const DEFAULT_INACTIVITY_TIME_LIMITS: number[] = [1, 5, 10, 20, 30];
export const DEFAULT_ACTIVITY_PROOF_DURATIONS: number[] = [1, 3, 5, 10];

export const DEFAULT_SCREENSHOT_FREQUENCY_OPTIONS: number[] = [1, 3, 5, 10];

export interface IOrganizationTimerSetting {
  allowTrackInactivity?: boolean;
  inactivityTimeLimit?: number;
  activityProofDuration?: number;
  isRemoveIdleTime?: boolean;
  allowScreenshotCapture?: boolean;
  randomScreenshot?: boolean;
  trackOnSleep?: boolean;
  screenshotFrequency?: number;
  enforced?: boolean;
}
