import "@components/styles/globals.css";
import Layout from "@components/components/layout";
import { Open_Sans } from "next/font/google";
import StoreProvider from "@components/store/store-context";

const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <div className={openSans.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </StoreProvider>
  );
}
