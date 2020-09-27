import React, { FC, useMemo } from "react";
import styles from "../styles/Cart.module.scss";
import Cross from "./icons/Cross";
import { ICartItem } from "../types/types";
import CartItem from "./CartItem";
import Bag from "./icons/Bag";
import { motion } from "framer-motion";
import Link from "next/link";
import useCart from "../hooks/useCart";

interface CartProps {
  closeCart: () => void;
}

const Cart: FC<CartProps> = ({ closeCart }) => {
  const [cart, cartSum] = useCart();

  return (
    <motion.div
      className={styles.cartContainer}
      initial={{ x: 600 }}
      transition={{ duration: 0.3 }}
      animate={{ x: 0 }}
      exit={{ x: 600 }}
    >
      <div className={styles.cartHeader}>
        <Cross
          height="24px"
          width="24px"
          onClickFunction={closeCart}
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
              <Link href="/checkout">
                <button
                  type="button"
                  className={`button-default ${styles.checkoutButton}`}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.emptyCart}>
          <Bag width="56px" height="56px" customClass={styles.bagIcon} />
          <span className={styles.emptyCartText}>Your cart is empty :(</span>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
