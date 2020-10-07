import React, { FC, useEffect } from "react";
import styles from "../styles/UserOrderList.module.scss";

interface UserOrderListItemProps {}

const UserOrderListItem: FC = () => {
  const fetchOrderRows = async (): Promise<void> => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrderRows();
  }, []);
  return (
    <div className={styles.userOrderListItemContainer}>
      <span>okoko</span>
    </div>
  );
};

export default UserOrderListItem;
