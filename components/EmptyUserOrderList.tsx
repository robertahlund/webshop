import React, { FC } from "react";
import styles from "../styles/EmptyUserOrderList.module.scss";
import Collection from "./icons/Collection";

const EmptyUserOrderList: FC = () => {
  return (
    <div className={styles.emptyUserOrderListContainer}>
      <Collection height="48px" width="48px" />
      <span className={styles.emptyMessage}>
        You have not placed any orders yet :(
      </span>
    </div>
  );
};

export default EmptyUserOrderList;
