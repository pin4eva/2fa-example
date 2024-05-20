export interface GenerateOtpInput {
  email: string;
  authId: string;
}

export interface GenerateOtpResponse {
  otpAuthUrl: string;
  secret: string;
}

export interface VerifyOTPInput {
  email: string;
  authId: string;
  token: string;
}

export interface VerifyOTPResponse {
  id: string;
  email: string;
  isOtpEnabled: boolean;
  isOtpVerified: boolean;
  token: string;
}
