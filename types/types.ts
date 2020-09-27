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
  id: string;
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
  guid: string;
}

export interface IAuth {
  userId: string | null;
  roles: IUserRoles[];
  initialLoad?: boolean;
}

export interface ISelectedSize {
  size: number;
  productStockId: number;
}

export interface IconProps {
  height: string;
  width: string;
  customClass?: string;
  onClickFunction?: () => void;
}

export interface LoginForm {
  username: FormValue;
  password: FormValue;
}

export interface RegistrationForm extends LoginForm {}

export interface FormValue {
  value: string;
  isValid: boolean;
  validationMessage: string;
}

export interface IUserAccountQuery {
  id: number;
  name: string;
  address: string;
  zip_code: string;
  email: string;
  phone_number: string;
  username: string;
  city: string;
  customer_number: number;
}

export interface IUserAccount {
  id: number;
  name: string;
  address: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  username: string;
  city: string;
  customerNumber: number;
}

export interface IUserAccountForm {
  id: number;
  name: FormValue;
  address: FormValue;
  zipCode: FormValue;
  email: FormValue;
  phoneNumber: FormValue;
  username: string;
  city: FormValue;
  customerNumber: number;
  newPassword: FormValue;
}

export interface IUpdateUserAccount {
  name: string;
  address: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  city: string;
  newPassword: string;
}

export type MyAccountTab = "My information" | "My orders";
