import React, { FC } from "react";
import Head from "next/head";
import styles from "../../styles/Checkout.module.scss";
import CartList from "../../components/CartList";

interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = () => {
  return (
    <div className={styles.accountContainer}>
      <Head>
        <title>Checkout</title>
      </Head>
      <CartList />
    </div>
  );
};

export default Checkout;
