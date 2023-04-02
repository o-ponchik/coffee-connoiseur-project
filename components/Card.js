import React from "react";
import styles from "./Card.module.css";
import Link from "next/link";
import Image from "next/image";
import cls from "classnames";

const Card = (props) => {
  return (
    <>
      <Link href={props.href} className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              src={props.ImgUrl}
              width={260}
              height={150}
              className={styles.cardImage}
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
