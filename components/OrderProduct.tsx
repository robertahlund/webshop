import React, { FC } from "react";
import { IProductOrder } from "../types/types";
import styles from "../styles/OrderProduct.module.scss";
import Link from "next/link";

interface OrderProductProps {
  product: IProductOrder;
}

const OrderProduct: FC<OrderProductProps> = ({ product }) => {
  return (
    <div className={styles.orderProductContainer}>
      <div className={styles.column}>
        <img className={styles.image} src={product.path} alt="" />
      </div>
      <div className={styles.column}>
        <Link href={`/product/[id]`} as={`/product/${product.productId}`}>
          <a
            href={`/product/${product.productId}`}
            className={styles.orderProductHeading}
          >
            {product.name}
          </a>
        </Link>
        <span className={styles.orderProductSizeLabel}>Size</span>
        <span className={styles.orderProductSize}>{product.size}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.orderProductPrice}>{product.amount}</span>
      </div>
    </div>
  );
};

export default OrderProduct;
