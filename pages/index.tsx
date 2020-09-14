import Head from "next/head";
import React, { FC } from "react";
import styles from "../styles/Home.module.scss";
import Menu from "../components/Menu";
import Hero from "../components/Hero";
import HomeProducts from "../components/HomeProducts";
import { GetStaticProps } from "next";
import { IHomeProduct } from "../types/types";
import getHomeProducts from "../pages/api/products/home-products";

interface HomeProps {
  products: IHomeProduct[];
}

const Home: FC<HomeProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <Hero />
      <HomeProducts products={products} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const products = await getHomeProducts();
  return {
    props: { products },
  };
};

export default Home;
