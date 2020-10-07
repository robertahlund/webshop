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

export enum SelectedAccountTab {
  MyInformation = "My information",
  MyOrders = "My orders",
}

export interface ICreateOrderRow {
  productId: string;
  quantity: number;
  amount: number;
  size: number;
  productStockId: number;
}

export interface IOrderId {
  id: number;
}

export interface IOrderListItem {
  id: number;
  quantity: number;
  amount: number;
  productName: string;
  productImagePath: string;
  size: number;
}

export interface IOrderListItemQuery {
  id: number;
  quantity: number;
  amount: number;
  name: string;
  path: string;
  size: number;
}

export interface IOrderItem {
  id: number;
  orderNumber: number;
  orderStatusLabel: string;
  address: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
  orderDate: string;
  orderTotal: number;
}

export interface IOrderItemQuery {
  id: number;
  order_number: number;
  label: string;
  address: string;
  city: string;
  zip_code: string;
  phone_number: string;
  order_date: string;
  order_total: number;
}
