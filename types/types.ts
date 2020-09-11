export interface IUser {
  userId: string;
  name: string;
  username: string;
  email: string;
  roles: IUserRoles[];
}

export type IUserRoles = "Administrator" | "User";

export interface IRefreshToken {
  token: string;
  expiresAt: Date;
}
