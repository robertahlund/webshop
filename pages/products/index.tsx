import React, { FC } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getProductList } from "../api/products/products";
import { IProductList } from "../../types/types";
import ProductList from "../../components/ProductList";
import ProductFilter from "../../components/ProductFilter";

interface ProductsProps {
  products: IProductList[];
}

const Products: FC<ProductsProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductFilter />
      <ProductList products={products} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const products: IProductList[] = await getProductList();

  return {
    props: { products },
    revalidate: 1,
  };
};

export default Products;
