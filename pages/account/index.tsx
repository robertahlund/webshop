import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Account.module.scss";
import AccountsTabs from "../../components/AccountTabs";
import { IUserAccount, MyAccountTab } from "../../types/types";
import AccountInformation from "../../components/AccountInformation";
import axios, { AxiosResponse } from "axios";

const initialUserData: IUserAccount = {
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

const Account: FC = () => {
  const [activeTab, setActiveTab] = useState<MyAccountTab>("My information");
  const [userData, setUserData] = useState<IUserAccount>(initialUserData);
  const {
    isAuthenticated,
    initialLoad,
  }: {
    isAuthenticated: boolean;
    initialLoad: boolean | undefined;
  } = useSelector((state: RootState) => {
    return {
      isAuthenticated: !!state.auth.userId,
      initialLoad: state.auth.initialLoad,
    };
  });
  const router = useRouter();

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
    if (!isAuthenticated && initialLoad) {
      router.push("/");
    }
  }, [isAuthenticated, initialLoad, router]);

  return (
    <div className={styles.accountContainer}>
      <Head>
        <title>My Account</title>
      </Head>
      <h1 className={styles.accountHeading}>My account</h1>
      <AccountsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "My information" ? (
        <AccountInformation userData={userData} />
      ) : null}
    </div>
  );
};

export default Account;
