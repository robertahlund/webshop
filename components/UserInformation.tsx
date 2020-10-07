import { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import styles from "../styles/UserInformation.module.scss";
import { IUserAccount } from "../types/types";
import axios from "axios";
import { initialUserData } from "./AccountInformation";

const UserInformation: FC = () => {
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

  return (
    <div className={styles.userInformationContainer}>
      <div className={styles.userInformationHeader}>
        <h2 className={styles.userInformationHeading}>Your information</h2>
      </div>
      <div className={styles.userInformationItemContainer}>
        <ul className={styles.userInformationList}>
          <li className={styles.userInformationListItem}>
            <span>Name: </span>
            <span className={styles.userInformationListItemValue}>
              {userData.name}
            </span>
          </li>
          <li className={styles.userInformationListItem}>
            <span>Address: </span>
            <span className={styles.userInformationListItemValue}>
              {userData.address}
            </span>
          </li>
          <li className={styles.userInformationListItem}>
            <span>Zip Code: </span>
            <span className={styles.userInformationListItemValue}>
              {userData.zipCode}
            </span>
          </li>
          <li className={styles.userInformationListItem}>
            <span>City: </span>
            <span className={styles.userInformationListItemValue}>
              {" "}
              {userData.city}
            </span>
          </li>
          <li className={styles.userInformationListItem}>
            <span>Email: </span>
            <span className={styles.userInformationListItemValue}>
              {userData.email}
            </span>
          </li>
          <li className={styles.userInformationListItem}>
            <span>Phone Number: </span>
            <span className={styles.userInformationListItemValue}>
              {" "}
              {userData.phoneNumber}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInformation;
