import React, { FC } from "react";
import styles from "../styles/HomeProducts.module.scss";
import { IHomeProduct } from "../types/types";
import HomeProduct from "./HomeProduct";

interface HomeProductsProps {
  products: IHomeProduct[];
}

const HomeProducts: FC<HomeProductsProps> = ({ products }) => {
  return (
    <div className={styles.productsContainer}>
      {products.map((product: IHomeProduct) => {
        return <HomeProduct product={product} key={product.id} />;
      })}
    </div>
  );
};

export default HomeProducts;
