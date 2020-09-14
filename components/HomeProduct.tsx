import React, { FC } from "react";
import styles from "../styles/HomeProduct.module.scss";
import { IHomeProduct } from "../types/types";
import Link from "next/link";

interface HomeProductProps {
  product: IHomeProduct;
}

const HomeProduct: FC<HomeProductProps> = ({ product }) => {
  return (
    <div className={styles.product}>
      <img className={styles.image} src={product.path} alt="" />
      <h4 className={styles.heading}>{product.name}</h4>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.productBottomContainer}>
        <p className={styles.price}>{product.price}</p>
        <Link href={`/product/[id]`} as={`/product/${product.id}`}>
          {/* eslint-disable-next-line */}
          <a className={styles.productLink}>View</a>
        </Link>
      </div>
    </div>
  );
};

export default HomeProduct;
