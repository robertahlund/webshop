import React, { FC } from "react";
import styles from "../styles/Menu.module.scss";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter, NextRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices";
import { IAuth } from "../types/types";
import axios from "axios";
import { logout } from "../slices/authSlice";

interface MenuProps {
  toggleCart: () => void;
  cartIsOpen: boolean;
}

const Menu: FC<MenuProps> = ({ toggleCart, cartIsOpen }) => {
  const dispatch = useDispatch();
  const router: NextRouter = useRouter();
  const { pathname }: { pathname: string } = router;
  const cartLength: number = useSelector(
    (state: RootState) => state.cart.length
  );
  const user: IAuth = useSelector((state: RootState) => state.auth);

  const handleLogout = async (): Promise<void> => {
    await axios.get("/api/auth/logout");
    dispatch(logout());
  };

  return (
    <nav className={styles.menu}>
      <Logo />
      <ul className={styles.menuList}>
        <li
          className={`${styles.menuListItem} ${
            pathname === "/" ? styles.menuListItemActive : ""
          }`}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          className={`${styles.menuListItem} ${
            pathname.indexOf("/product") > -1 ? styles.menuListItemActive : ""
          }`}
        >
          <Link href="/products">Products</Link>
        </li>
        <li
          className={`${styles.menuListItem} ${
            cartIsOpen ? styles.menuListItemActive : ""
          }`}
          onClick={toggleCart}
        >
          {cartLength > 0 && (
            <div className={styles.cartBadge}>{cartLength}</div>
          )}
          Cart
        </li>
        {user.userId ? (
          <>
            <li
              className={`${styles.menuListItem} ${
                pathname === "/account" ? styles.menuListItemActive : ""
              }`}
            >
              <Link href="/account">My Account</Link>
            </li>
            <li className={styles.menuListItem} onClick={handleLogout}>
              Logout
            </li>
          </>
        ) : (
          <li
            className={`${styles.menuListItem} ${
              pathname === "/login" ? styles.menuListItemActive : ""
            }`}
          >
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
