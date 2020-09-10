const validator = require("validator");

export const validateRegistration = (username, password) => {
  if (validator.isEmpty(username) || validator.isEmpty(password)) {
    return false;
  }
  return true;
};

export const validateProduct = (product) => {
  const { id, name, description, price, isActive } = product;
  if (
    !validator.isInt(String(id)) ||
    validator.isEmpty(name) ||
    validator.isEmpty(description) ||
    !validator.isCurrency(String(price)) ||
    !validator.isBoolean(String(isActive))
  ) {
    return false;
  }
  return true;
};
