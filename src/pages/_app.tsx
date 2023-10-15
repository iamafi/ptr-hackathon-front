import { Layout } from "@/components/layout/root-layout";

import "../styles/globals.css";

import type { CustomAppProps } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const MyApp = (props: CustomAppProps) => {
  const {
    Component,
    pageProps: { dehydratedState, ...pageProps },
  } = props;

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Layout {...Component.layout}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
};

export default MyApp;
