import React, { FC, useMemo } from "react";
import styles from "../styles/Cart.module.scss";
import Cross from "./icons/Cross";
import { useSelector } from "react-redux";
import { ICartItem } from "../types/types";
import { RootState } from "../reducers";
import CartItem from "./CartItem";
import Bag from "./icons/Bag";

interface CartProps {}

const Cart: FC<CartProps> = () => {
  const cart: ICartItem[] = useSelector(
    (state: RootState) => state.cartReducer
  );

  const cartSum: number = useMemo(() => {
    return cart.reduce(
      (accumulator: number, currentValue: ICartItem) =>
        accumulator + Number(currentValue.price),
      0
    );
  }, [cart]);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <Cross
          height="24px"
          width="24px"
          onClickFunction={() => null}
          customClass={styles.icon}
        />
        <h3 className={styles.cartHeading}>Your cart</h3>
      </div>
      {cart.length > 0 ? (
        <>
          <div className={styles.cartItemContainer}>
            {cart.map((cartItem: ICartItem, index: number) => (
              <CartItem cartItem={cartItem} key={index} />
            ))}
          </div>
          <div className={styles.cartBottom}>
            <div className={styles.totalsContainer}>
              <span className={styles.totalsValue}>Shipping: Free</span>
              <span className={styles.totalsValue}>Total: {cartSum}</span>
            </div>
            <div className={styles.buttonContainer}>
              <button
                type="button"
                className={`button-default ${styles.checkoutButton}`}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.emptyCart}>
          <Bag width="56px" height="56px" customClass={styles.bagIcon} />
          <span className={styles.emptyCartText}>Your cart is empty :(</span>
        </div>
      )}
    </div>
  );
};

export default Cart;
