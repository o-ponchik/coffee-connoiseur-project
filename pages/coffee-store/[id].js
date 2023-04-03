import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import coffeeStoresData from "../../data/coffee-stores.json";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log("params", params);

  return {
    props: {
      coffeeStores: coffeeStoresData.find((coffeeStore) => {
        console.log("coffeeStore.id", coffeeStore.id);
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true, // can also be true or 'blocking'
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  const { id } = router.query;

  console.log("props", props);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Coffee Store Page {id}</div>
      <Link href={"/"}>Back to Home</Link>
      <p>{props.coffeeStores.address}</p>
      <p>{props.coffeeStores.name}</p>
    </>
  );
};

export default CoffeeStore;
