export enum UserRoleEnum {
  SUPER_ADMIN = "superAdmin",
  ADMIN = "admin",
  PRO_ADMIN = "proAdmin",
  PRO_INTERVIEW_RATER = "ProRater",
  STUDENT = "student",
  LEARNER = "learnerStudent",
  LEARNING_ADMIN = "learnerAdmin",
  USER = "User",
}

export enum UserStatusEnum {
  NOT_REGISTERED = "notRegistered",
  REGISTERED = "Registered",
}

export enum AccountStatusEnum {
  ACTIVE = "Active",
  SUSPENDED = "Suspended",
}

export interface Profile {
  id: string;
  learningProgramId: string;
  cnoNumber: string;
  name: string;
  examType: string;
  accountStatus: AccountStatusEnum;
  role: string;
  isStaff: boolean;
}

export interface IUser {
  id: string;
  authId: string;
  isStaff: boolean;
  username: string;
  email: string;
  avatar: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  legalStatus: string;
  countryOfBirth: string;
  motherTongue: string;
  streetAdress: string;
  streetAdressOpt: string;
  unitNumber: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  emergencyEmail: string;
  learningProgramId?: string;
  cnoNumber?: string;
  role: UserRoleEnum;
  accountStatus: AccountStatusEnum;
  examType: string;
  minc: string;
  isOtpEnabled: boolean;
  isOtpVerified: boolean;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  id: string;
  status: string;
  token: string;
  email: string;
  isOtpEnabled: boolean;
  profiles: Profile[];
  isStaff: boolean;
  user: IUser;
}
