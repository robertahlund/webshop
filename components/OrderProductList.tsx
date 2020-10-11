import { AxiosResponse } from "axios";
import React, { FC, useEffect, useState } from "react";
import { IProductOrder } from "../types/types";
import axios from "axios";
import styles from "../styles/OrderProductList.module.scss";
import OrderProduct from "./OrderProduct";

interface OrderProductListProps {
  orderId: number;
}

const OrderProductList: FC<OrderProductListProps> = ({ orderId }) => {
  const [productList, setProductList] = useState<IProductOrder[]>([]);

  useEffect(() => {
    try {
      const getOrderProducts = async (): Promise<void> => {
        const response: AxiosResponse = await axios.get(
          `/api/order/products?orderId=${orderId}`
        );
        const products: IProductOrder[] = response.data;
        setProductList(products);
      };
      getOrderProducts();
    } catch (error) {
      console.log(error);
    }
  }, [orderId]);

  return (
    <div className={styles.orderProductListContainer}>
      {productList.map((product: IProductOrder) => (
        <OrderProduct product={product} key={product.id} />
      ))}
    </div>
  );
};

export default OrderProductList;
