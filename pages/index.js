import Head from "next/head";
import Image from "next/image";
import styles from "@components/styles/Home.module.css";
import Banner from "@components/components/Banner";
import Card from "../components/Card";
import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  return {
    props: { coffeeStores: coffeeStoresData }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const handleOnBannerBtnClick = () => {
    console.log("Banner btn clicked");
  };

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta
          name="description"
          content="Coffee Connoisseur. Explore coffe stores near you!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src={"/static/hero-image.png"}
            width={700}
            height={400}
            alt="Coffee brake image"
          />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store) => (
                <Card
                  id={store.id}
                  key={store.id}
                  name={store.name}
                  ImgUrl={store.imgUrl}
                  href={`/coffee-store/${store.id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
