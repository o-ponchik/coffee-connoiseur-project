import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>Coffee Store Page {id}</div>
      <Link href={"/"}>Back to Home</Link>
    </>
  );
};

export default CoffeeStore;
