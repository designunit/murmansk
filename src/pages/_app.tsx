import "../styles/style.css";
import 'rc-collapse/assets/index.css'

import Head from "next/head";
import { AppType } from "next/dist/next-server/lib/utils";
import { YMetrika } from "@/components/YMetrika";

const App: AppType = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
        <YMetrika number="61650523" mode="script" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;
