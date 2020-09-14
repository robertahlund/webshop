import React, { FC } from "react";
import styles from "../styles/ProductList.module.scss";
import { IHomeProduct } from "../types/types";
import ProductListItem from "./ProductListItem";

interface HomeProductsProps {
  products: IHomeProduct[];
}

const HomeProducts: FC<HomeProductsProps> = ({ products }) => {
  return (
    <div className={styles.productsContainer}>
      {products.map((product: IHomeProduct) => {
        return <ProductListItem product={product} key={product.id} />;
      })}
    </div>
  );
};

export default HomeProducts;
