import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../styles/Account.module.scss";
import AccountTabs from "../../components/AccountTabs";
import { SelectedAccountTab } from "../../types/types";
import AccountInformation from "../../components/AccountInformation";
import UserOrderList from "../../components/UserOrderList";

const Account: FC = () => {
  const [activeTab, setActiveTab] = useState<SelectedAccountTab>(
    SelectedAccountTab.MyInformation
  );
  return (
    <div className={styles.accountContainer}>
      <Head>
        <title>My Account</title>
      </Head>
      <h1 className={styles.accountHeading}>My account</h1>
      <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === SelectedAccountTab.MyInformation ? (
        <AccountInformation />
      ) : (
        <UserOrderList />
      )}
    </div>
  );
};

export default Account;
