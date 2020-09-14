import { IProduct } from "../types/types";
import validator from "validator";

export const validateRegistration = (
  username: string,
  password: string
): boolean => {
  if (validator.isEmpty(username) || validator.isEmpty(password)) {
    return false;
  }
  return true;
};

export const validateProduct = (
  product: IProduct,
  shouldValidateId: boolean
): boolean => {
  const { id, name, description, price, isActive } = product;
  if (
    (!validator.isInt(String(id)) && shouldValidateId) ||
    validator.isEmpty(name) ||
    validator.isEmpty(description) ||
    !validator.isCurrency(String(price)) ||
    !validator.isBoolean(String(isActive))
  ) {
    return false;
  }
  return true;
};
