import React, { FC, useState } from "react";
import { IOrderItem } from "../types/types";
import OrderInformation from "./OrderInformation";
import OrderProductList from "./OrderProductList";
import styles from "../styles/UserOrder.module.scss";
import ChevronDown from "./icons/ChevronDown";

interface UserOrderProps {
  order: IOrderItem;
}

const UserOrder: FC<UserOrderProps> = ({ order }) => {
  const [showProducts, setShowProducts] = useState<boolean>(false);
  return (
    <div className={styles.userOrderContainer}>
      <OrderInformation order={order} />
      <div className={styles.iconContainer}>
        <ChevronDown
          height="24px"
          width="24px"
          customClass={showProducts ? "rotate" : ""}
          onClickFunction={() =>
            setShowProducts((prevState: boolean) => !prevState)
          }
        />
      </div>
      {showProducts && <OrderProductList orderId={order.id} />}
    </div>
  );
};

export default UserOrder;
