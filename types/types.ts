export interface IUser {
  id: number;
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

export interface IUserNameAlreadyTaken {
  usernamealreadytaken: string;
}

export interface IUserId {
  userid: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

export interface IProductQuery {
  id: number;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
}

export interface IHomeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  path: string;
}

export interface IProductList extends IHomeProduct {}

export interface IProductImages {
  path: string;
}

export interface IAvailableSizes {
  size: number;
  stock: number;
  //product_stock.id
  id: number;
}

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  imagePath: string;
  size: number;
  productStockId: number;
}

export interface IAuth {
  userId: string | null;
  roles: IUserRoles[];
}

export interface ISelectedSize {
  size: number;
  productStockId: number;
}
