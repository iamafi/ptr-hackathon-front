import { Layout } from "@/components/layout/root-layout";

import "../styles/globals.css";

import type { CustomAppProps } from "@/components/types";

const MyApp = (props: CustomAppProps) => {
  const {
    Component,
    pageProps: { dehydratedState, ...pageProps },
  } = props;

  return (
    <Layout {...Component.layout}>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
