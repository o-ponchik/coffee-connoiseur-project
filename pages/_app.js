import "@components/styles/globals.css";
import Layout from "@components/components/layout";
import { Open_Sans } from "next/font/google";
import { createContext } from "react";

const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const initialState = { latLong: "", coffeeStores: [] };

  return (
    <StoreContext.Provider value={{ state: initialState }}>
      {children}
    </StoreContext.Provider>
  );
};

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
