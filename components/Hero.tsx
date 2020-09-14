import React, { FC } from "react";
import styles from "../styles/Hero.module.scss";

const Hero: FC = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.column}>
        <div className={styles.textContainer}>
          <h1 className={styles.largeHeading}>Lorem Ipsum</h1>
          <h3 className={styles.mediumHeading}>Lorem Ipsum</h3>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
      <div className={styles.column}>
        <img className={styles.image} src="/images/hero-image.png" alt="" />
      </div>
    </div>
  );
};

export default Hero;
