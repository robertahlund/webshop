import React, { FC } from "react";
import styles from "../styles/Footer.module.scss";

const Footer: FC = () => {
  return (
    <section className={styles.footerContainer}>
      <div className={styles.column}>
        <ul>
          <li>Help & Support</li>
          <li>FAQ</li>
          <li>Customer Service</li>
          <li>Delivery</li>
          <li>Returns</li>
          <li>Payment</li>
        </ul>
      </div>
      <div className={styles.column}>
        <ul>
          <li>Explore Lorem Ipsum</li>
          <li>Careers</li>
          <li>Company information</li>
          <li>Investor relations</li>
          <li>Sustainabiity</li>
          <li>Press & Awards</li>
        </ul>
      </div>
      <div className={styles.column}>
        <ul>
          <li>Follow us</li>
          <li>Twitter</li>
          <li>Facebook</li>
          <li>Instagram</li>
        </ul>
      </div>
      <div className={styles.column}>
        <ul>
          <li>Contact us</li>
          <li>lorem@loremipsum.com</li>
          <li>+46730000000</li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
