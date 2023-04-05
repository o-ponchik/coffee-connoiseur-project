import "@components/styles/globals.css";
import Layout from "@components/components/layout";
import { Open_Sans } from "next/font/google";
import { createContext, useReducer } from "react";

const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });

const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.latLong };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = { latLong: "", coffeeStores: [] };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
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
