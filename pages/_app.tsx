import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import Cart from "../components/Cart";
import { AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const [displayCart, setDisplayCart] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <Layout>
        <Menu
          cartIsOpen={displayCart}
          toggleCart={() =>
            setDisplayCart((previousState: boolean) => !previousState)
          }
        />
        <AnimatePresence>
          {displayCart && <Cart closeCart={() => setDisplayCart(false)} />}
        </AnimatePresence>
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </Provider>
  );
}

export default MyApp;
