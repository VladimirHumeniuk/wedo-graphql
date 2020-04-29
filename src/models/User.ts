import { Roles, Timestamp } from '.';
export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  accountType: string;
  createdAt: Date | Timestamp;
  acceptTermsAndConditions: boolean;
  company?: string;
  roles: Roles;
}