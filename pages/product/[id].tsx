import React, { FC, useState, Dispatch } from "react";
import styles from "../../styles/Product.module.scss";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  IProductList,
  IProductImages,
  IAvailableSizes,
  ISelectedSize,
} from "../../types/types";
import {
  getProductById,
  getProductList,
  getProductImagesByProductId,
  getProductSizesByProductId,
} from "../api/products/products";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { addItem } from "../../reducers/cartReducer";
import { v4 as uuidv4 } from "uuid";

interface ProductProps {
  product: IProductList;
  images: IProductImages[];
  availableSizes: IAvailableSizes[];
}

const Product: FC<ProductProps> = ({ product, images, availableSizes }) => {
  const [chosenSize, setChosenSize] = useState<ISelectedSize>({
    productStockId: 0,
    size: 0,
  });

  const dispatch: Dispatch<any> = useDispatch();

  const addToCart = (): void => {
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        imagePath: images[0].path,
        size: chosenSize.size,
        productStockId: chosenSize.productStockId,
        guid: uuidv4(),
      })
    );
  };

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
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
                    chosenSize.size === size.size ? styles.sizeItemActive : ""
                  } ${size.stock > 0 ? "" : styles.sizeItemUnavailable}`}
                  onClick={() => {
                    if (size.stock > 0) {
                      setChosenSize({
                        productStockId: size.id,
                        size: size.size,
                      });
                    }
                  }}
                >
                  {size.size}
                </div>
              ))}
            </div>
            <h3 className={styles.mediumHeading}>{product.price}</h3>
            <button
              className="button-default"
              type="button"
              onClick={addToCart}
            >
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
