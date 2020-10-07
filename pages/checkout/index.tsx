import React, { FC } from "react";
import Head from "next/head";
import styles from "../../styles/Checkout.module.scss";
import CartList from "../../components/CartList";
import UserInformation from "../../components/UserInformation";

interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = () => {
  return (
    <div className={styles.checkoutContainer}>
      <Head>
        <title>Checkout</title>
      </Head>
      <UserInformation />
      <CartList />
    </div>
  );
};

export default Checkout;
