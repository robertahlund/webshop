import React, { FC } from "react";
import styles from "../styles/Menu.module.scss";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter, NextRouter } from "next/dist/client/router";

const Menu: FC = () => {
  const router: NextRouter = useRouter();
  const { pathname }: { pathname: string } = router;
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
        <li className={styles.menuListItem}>Cart</li>
        <li
          className={`${styles.menuListItem} ${
            pathname === "/account" ? styles.menuListItemActive : ""
          }`}
        >
          <Link href="/account">My Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
