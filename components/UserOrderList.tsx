import React, { FC, useEffect, useState } from "react";
import styles from "../styles/UserOrderList.module.scss";
import axios, { AxiosResponse } from "axios";
import { IOrderItem } from "../types/types";
import UserOrder from "./UserOrder";
import Collection from "./icons/Collection";
import EmptyUserOrderList from "./EmptyUserOrderList";

const UserOrderList: FC = () => {
  const [orders, setOrders] = useState<IOrderItem[]>([]);

  const fetchOrders = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.get("/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {orders.length > 0 ? (
        <div className={styles.userOrderListContainer}>
          {orders.map((order: IOrderItem) => (
            <UserOrder order={order} key={order.id} />
          ))}
        </div>
      ) : (
        <EmptyUserOrderList />
      )}
    </>
  );
};

export default UserOrderList;
