export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  isVerified: boolean;
}
