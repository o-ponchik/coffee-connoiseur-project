import React from "react";
import styles from "../styles/banner.module.css";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"] });

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <div className={caveat.className}>
        <h1 className={styles.title}>
          <span className={styles.title1}>Coffee</span>
          <span className={styles.title2}>Connoisseur</span>
        </h1>
      </div>
      <p className={styles.subTitle}>Discover your local coffee stores!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
