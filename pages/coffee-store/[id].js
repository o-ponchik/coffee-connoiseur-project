import React, { useState, useContext, useEffect } from "react";
import styles from "../../styles/coffee-store.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { StoreContext } from "@components/store/store-context";
import { isEmpty } from "@components/utils";

///////////////////////getStaticProps//////////////////////////

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeeStores();

  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id;
  });

  return {
    props: {
      coffeeStores: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

///////////////////////getStaticPaths//////////////////////////

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((coffeeStore) => {
    return { params: { id: coffeeStore.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
}

///////////////////////COMPONENT//////////////////////////

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const { id } = router.query;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStores);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const hanldeCreateCoffeeStore = async (coffeeStore) => {
    try {
      const { id, name, address, neighbourhood, voting, imgUrl } = coffeeStore;
      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          address: address || "",
          neighbourhood: neighbourhood || "",
          voting,
          imgUrl,
        }),
      });

      const dbCoffeeStore = await response.json();
      console.log({ dbCoffeeStore });
    } catch (error) {
      console.error("Error creating coffee store", error);
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStores)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id;
        });

        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext);
          hanldeCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    }
  }, [id]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, neighbourhood, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    console.log("Voted!");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href={"/"}>← Back to Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>

          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width={24}
                height={24}
                alt="Location icon"
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt="Near me icon"
              />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="Star icon"
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
