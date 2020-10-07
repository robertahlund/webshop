import React, { FC } from "react";
import useCart from "../hooks/useCart";
import styles from "../styles/CartList.module.scss";
import { ICartItem, ICreateOrderRow } from "../types/types";
import CartListItem from "./CartListItem";
import axios from "axios";

const CartList: FC = () => {
  const [cart, cartSum] = useCart();

  const placeOrder = async (): Promise<void> => {
    const orderRequest: ICreateOrderRow[] = [];
    cart.forEach((cartItem: ICartItem) => {
      orderRequest.push({
        productId: cartItem.productId,
        quantity: 1,
        amount: cartItem.price,
        size: cartItem.size,
        productStockId: cartItem.productStockId,
      });
    });
    try {
      await axios.post("/api/order", orderRequest);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.cartListContainer}>
      <div className={styles.cartListHeader}>
        <h2 className={styles.cartListHeading}>Your cart</h2>
      </div>
      <div className={styles.cartListItemContainer}>
        {cart.map((cartItem: ICartItem) => (
          <CartListItem cartItem={cartItem} key={cartItem.guid} />
        ))}
      </div>
      <div className={styles.cartBottom}>
        <div className={styles.totalsContainer}>
          <span className={styles.totalsValue}>Shipping: Free</span>
          <span className={styles.totalsValue}>Total: {cartSum}</span>
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" className="button-default" onClick={placeOrder}>
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
