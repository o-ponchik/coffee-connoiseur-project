import React from "react";
import styles from "./Card.module.css";
import Link from "next/link";
import Image from "next/image";

const Card = (props) => {
  return (
    <>
      <Link href={props.href}>
        <h2>{props.name}</h2>
        <Image src={props.ImgUrl} width={260} height={150} />
      </Link>
    </>
  );
};

export default Card;
