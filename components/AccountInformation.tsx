import axios, { AxiosResponse } from "axios";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import styles from "../styles/Account.module.scss";
import {
  IUpdateUserAccount,
  IUserAccount,
  IUserAccountForm,
} from "../types/types";
import Input from "./common/Input";

const initialUserAccountForm: IUserAccountForm = {
  id: 0,
  name: {
    value: "",
    isValid: true,
    validationMessage: "",
  },
  address: {
    value: "",
    isValid: true,
    validationMessage: "",
  },
  zipCode: {
    value: "",
    isValid: true,
    validationMessage: "",
  },
  email: {
    value: "",
    isValid: true,
    validationMessage: "",
  },
  phoneNumber: {
    value: "",
    isValid: true,
    validationMessage: "",
  },
  username: "",
  city: {
    value: "",
    isValid: true,
    validationMessage: "",
  },
  customerNumber: 0,
  newPassword: {
    value: "",
    isValid: true,
    validationMessage: "",
  },
};

export const initialUserData: IUserAccount = {
  id: 0,
  name: "",
  address: "",
  zipCode: "",
  email: "",
  phoneNumber: "",
  username: "",
  city: "",
  customerNumber: 0,
};

const AccountInformation: FC = () => {
  const [userAccountForm, setUserAccountForm] = useState<IUserAccountForm>(
    initialUserAccountForm
  );
  const [userData, setUserData] = useState<IUserAccount>(initialUserData);
  const [isAuthenticated, initialLoad] = useAuth();

  const getUserInformation = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.get("/api/account");
      const userInformation: IUserAccount = response.data;
      setUserData(userInformation);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && initialLoad) {
      getUserInformation();
    }
  }, [isAuthenticated, initialLoad]);

  useEffect(() => {
    setUserAccountForm({
      id: userData.id,
      name: {
        ...initialUserAccountForm.name,
        value: userData.name ? userData.name : "",
      },
      address: {
        ...initialUserAccountForm.address,
        value: userData.address ? userData.address : "",
      },
      zipCode: {
        ...initialUserAccountForm.zipCode,
        value: userData.zipCode ? userData.zipCode : "",
      },
      email: {
        ...initialUserAccountForm.email,
        value: userData.email ? userData.email : "",
      },
      phoneNumber: {
        ...initialUserAccountForm.phoneNumber,
        value: userData.phoneNumber ? userData.phoneNumber : "",
      },
      username: userData.username,
      city: {
        ...initialUserAccountForm.city,
        value: userData.city ? userData.city : "",
      },
      customerNumber: userData.customerNumber,
      newPassword: {
        ...initialUserAccountForm.city,
        value: "",
      },
    });
  }, [userData]);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserAccountForm({
      ...userAccountForm,
      [event.target.name]: {
        value: event.target.value,
        isValid: true,
        validationMessage: "",
      },
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const userDataUpdate: IUpdateUserAccount = {
        name: userAccountForm.name.value,
        address: userAccountForm.address.value,
        zipCode: userAccountForm.zipCode.value,
        email: userAccountForm.email.value,
        phoneNumber: userAccountForm.phoneNumber.value,
        city: userAccountForm.city.value,
        newPassword: userAccountForm.newPassword.value,
      };
      await axios.put("/api/account", userDataUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.formContainer}>
      <div className={styles.row}>
        <div className={styles.column}>
          <span className={styles.label}>Username</span>
          <span className={styles.value}>{userAccountForm.username}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.label}>Customer no.</span>
          <span className={styles.value}>{userAccountForm.customerNumber}</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <Input
            value={userAccountForm.name.value}
            labelValue="Name"
            type="text"
            name="name"
            onFormChange={handleFormChange}
            valid={userAccountForm.name.isValid}
            validationMessage={userAccountForm.name.validationMessage}
          />
        </div>
        <div className={styles.column}>
          <Input
            value={userAccountForm.email.value}
            labelValue="Email"
            type="text"
            name="email"
            onFormChange={handleFormChange}
            valid={userAccountForm.email.isValid}
            validationMessage={userAccountForm.email.validationMessage}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <Input
            value={userAccountForm.zipCode.value}
            labelValue="Zip Code"
            type="text"
            name="zipCode"
            onFormChange={handleFormChange}
            valid={userAccountForm.zipCode.isValid}
            validationMessage={userAccountForm.zipCode.validationMessage}
          />
        </div>
        <div className={styles.column}>
          <Input
            value={userAccountForm.address.value}
            labelValue="Address"
            type="text"
            name="address"
            onFormChange={handleFormChange}
            valid={userAccountForm.address.isValid}
            validationMessage={userAccountForm.address.validationMessage}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <Input
            value={userAccountForm.city.value}
            labelValue="City"
            type="text"
            name="city"
            onFormChange={handleFormChange}
            valid={userAccountForm.city.isValid}
            validationMessage={userAccountForm.city.validationMessage}
          />
        </div>
        <div className={styles.column}>
          <Input
            value={userAccountForm.phoneNumber.value}
            labelValue="Phone Number"
            type="text"
            name="phoneNumber"
            onFormChange={handleFormChange}
            valid={userAccountForm.phoneNumber.isValid}
            validationMessage={userAccountForm.phoneNumber.validationMessage}
          />
        </div>
      </div>
      <div className={styles.row}>
        <Input
          value={userAccountForm.newPassword.value}
          labelValue="New Password"
          type="password"
          name="newPassword"
          onFormChange={handleFormChange}
          valid={userAccountForm.newPassword.isValid}
          validationMessage={userAccountForm.newPassword.validationMessage}
        />
      </div>
      <div className={styles.rowCenter}>
        <button className="button-default" type="button" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </form>
  );
};

export default AccountInformation;
