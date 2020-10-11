import { format } from "date-fns";
import React, { FC } from "react";
import { IOrderItem } from "../types/types";
import OrderInformation from "./OrderInformation";
import OrderProductList from "./OrderProductList";
import styles from "../styles/UserOrder.module.scss";

interface UserOrderProps {
  order: IOrderItem;
}

const UserOrder: FC<UserOrderProps> = ({ order }) => {
  return (
    <div className={styles.userOrderContainer}>
      <OrderInformation order={order} />
      <OrderProductList orderId={order.id} />
    </div>
  );
};

export default UserOrder;
