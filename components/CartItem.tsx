import React, { FC, Dispatch } from "react";
import styles from "../styles/CartItem.module.scss";
import Cross from "./icons/Cross";
import { ICartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { removeItem } from "../reducers/cartReducer";
import Link from "next/link";

interface CartItemProps {
  cartItem: ICartItem;
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const dispatch: Dispatch<any> = useDispatch();
  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.column}>
        <img className={styles.image} src={cartItem.imagePath} alt="" />
      </div>
      <div className={styles.column}>
        <Link href={`/product/[id]`} as={`/product/${cartItem.productId}`}>
          <a
            href={`/product/${cartItem.productId}`}
            className={styles.cartItemHeading}
          >
            {cartItem.name}
          </a>
        </Link>
        <span className={styles.cartItemSizeLabel}>Size</span>
        <span className={styles.cartItemSize}>{cartItem.size}</span>
      </div>
      <div className={styles.column}>
        <Cross
          height="18px"
          width="18px"
          onClickFunction={() => dispatch(removeItem(cartItem))}
          customClass={styles.icon}
        />
        <span className={styles.cartItemPrice}>{cartItem.price}</span>
      </div>
    </div>
  );
};

export default CartItem;
