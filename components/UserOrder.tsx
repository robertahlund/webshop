import { format } from "date-fns";
import React, { FC } from "react";
import styles from "../styles/UserOrder.module.scss";
import { IOrderItem } from "../types/types";

interface UserOrderProps {
  order: IOrderItem;
}

const UserOrder: FC<UserOrderProps> = ({ order }) => {
  return (
    <div className={styles.userOrderContainer}>
      <div className={styles.column}>
        <div className={styles.columnItem}>
          <span className={styles.orderLabel}>Order no.</span>
          <span className={styles.orderValue}>{order.orderNumber}</span>
        </div>
        <div className={styles.columnItem}>
          <span className={styles.orderLabel}>Status</span>
          <span className={styles.orderValue}>{order.orderStatusLabel}</span>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.columnItem}>
          <span className={styles.orderLabel}>Shipping Address</span>
          <span className={styles.orderValue}>{order.address}</span>
          <span className={styles.orderValue}>{order.zipCode}</span>
          <span className={styles.orderValue}>{order.city}</span>
          <span className={styles.orderValue}>{order.phoneNumber}</span>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.columnItem}>
          <span className={styles.orderLabel}>Date</span>
          <span className={styles.orderValue}>
            {format(new Date(order.orderDate), "MMM d, yyyy")}
          </span>
          <span className={styles.orderValue}>
            {format(new Date(order.orderDate), "HH:mm")}
          </span>
        </div>
        <div className={styles.columnItem}>
          <span className={styles.orderLabel}>Total</span>
          <span className={styles.orderPrice}>{order.orderTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;

//orderPrice
