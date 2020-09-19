import "../styles/globals.scss";
import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import Cart from "../components/Cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Menu />
        <Cart />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
