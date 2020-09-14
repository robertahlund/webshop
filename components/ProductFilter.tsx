import React, { FC } from "react";
import styles from "../styles/ProductFilter.module.scss";

const ProductFilter: FC = () => {
  return (
    <div className={styles.productFilterContainer}>
      <button className="button-default" type="button">
        Search
      </button>
    </div>
  );
};

export default ProductFilter;
