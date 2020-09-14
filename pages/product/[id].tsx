import React, { FC, useState } from "react";
import styles from "../../styles/Product.module.scss";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  IProductList,
  IProductImages,
  IAvailableSizes,
} from "../../types/types";
import {
  getProductById,
  getProductList,
  getProductImagesByProductId,
  getProductSizesByProductId,
} from "../api/products/products";
import Head from "next/head";
import Menu from "../../components/Menu";

interface ProductProps {
  product: IProductList;
  images: IProductImages[];
  availableSizes: IAvailableSizes[];
}

const Product: FC<ProductProps> = ({ product, images, availableSizes }) => {
  const [chosenSize, setChosenSize] = useState<string>("");

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Menu />
      <div className={styles.productContainer}>
        <div className={styles.column}>
          <div className={styles.textContainer}>
            <h1 className={styles.largeHeading}>{product.name}</h1>
            <p className={styles.text}>{product.description}</p>
            <span className={styles.sizesTitle}>Sizes</span>
            <div className={styles.sizesContainer}>
              {availableSizes.map((size: IAvailableSizes) => (
                <div
                  key={size.id}
                  className={`${styles.sizeItem} ${
                    chosenSize === size.size ? styles.sizeItemActive : ""
                  }`}
                  onClick={() => setChosenSize(size.size)}
                >
                  {size.size}
                </div>
              ))}
            </div>
            <h3 className={styles.mediumHeading}>{product.price}</h3>
            <button className="button-default" type="button">
              Add to cart
            </button>
          </div>
        </div>
        <div className={styles.column}>
          {images.map((image: IProductImages) => (
            <img
              className={styles.image}
              src={image.path}
              alt=""
              key={image.path}
            ></img>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products: IProductList[] = await getProductList();
  const paths = products.map((product: IProductList) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  [key: string]: any;
}) => {
  const product: IProductList = await getProductById(params.id);
  const images: IProductImages[] = await getProductImagesByProductId(params.id);
  const availableSizes: IAvailableSizes[] = await getProductSizesByProductId(
    params.id
  );
  return {
    props: { product, images, availableSizes },
    revalidate: 1,
  };
};

export default Product;
