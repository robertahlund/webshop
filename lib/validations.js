const validator = require("validator");

export const validateRegistration = (username, password) => {
  if (validator.isEmpty(username) || validator.isEmpty(password)) {
    return false;
  }
  return true;
};
