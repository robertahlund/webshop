import React, { Dispatch, FC } from "react";
import styles from "../styles/Account.module.scss";
import { MyAccountTab } from "../types/types";

interface AccountTabsProps {
  activeTab: MyAccountTab;
  setActiveTab: Dispatch<React.SetStateAction<MyAccountTab>>;
}

const AccountsTabs: FC<AccountTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.accountTabContainer}>
      <span
        className={`${styles.accountTab} ${
          activeTab === "My information" ? styles.accountTabActive : ""
        }`}
        onClick={() => setActiveTab("My information")}
      >
        My information
      </span>
      <span
        className={`${styles.accountTab} ${
          activeTab === "My orders" ? styles.accountTabActive : ""
        }`}
        onClick={() => setActiveTab("My orders")}
      >
        My orders
      </span>
    </div>
  );
};

export default AccountsTabs;
