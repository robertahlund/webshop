import React, { FC } from "react";
import Head from "next/head";
import Menu from "../../components/Menu";

const Account: FC = () => {
  return (
    <div className="">
      <Head>
        <title>My Account</title>
      </Head>
      <Menu />
    </div>
  );
};

export default Account;
