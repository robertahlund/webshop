import React, { FC } from "react";
import useCart from "../hooks/useCart";
import styles from "../styles/CartList.module.scss";
import { ICartItem } from "../types/types";
import CartListItem from "./CartListItem";

const CartList: FC = () => {
  const [cart, cartSum] = useCart();
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
          <button type="button" className="button-default">
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
