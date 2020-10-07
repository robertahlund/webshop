import React, { Dispatch, FC } from "react";
import styles from "../styles/Account.module.scss";
import { SelectedAccountTab } from "../types/types";

interface AccountTabsProps {
  activeTab: SelectedAccountTab;
  setActiveTab: Dispatch<React.SetStateAction<SelectedAccountTab>>;
}

const AccountTabs: FC<AccountTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.accountTabContainer}>
      <span
        className={`${styles.accountTab} ${
          activeTab === SelectedAccountTab.MyInformation
            ? styles.accountTabActive
            : ""
        }`}
        onClick={() => setActiveTab(SelectedAccountTab.MyInformation)}
      >
        My information
      </span>
      <span
        className={`${styles.accountTab} ${
          activeTab === SelectedAccountTab.MyOrders
            ? styles.accountTabActive
            : ""
        }`}
        onClick={() => setActiveTab(SelectedAccountTab.MyOrders)}
      >
        My orders
      </span>
    </div>
  );
};

export default AccountTabs;
