import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { DehydratedState } from "@tanstack/react-query";
import type { LayoutProps } from "@/components/layout/root-layout";

export type CustomAppProps = AppProps<{
  dehydratedState: DehydratedState;
}> & {
  Component: CustomNextPage;
};

export type CustomNextPage = NextPage & {
  layout?: LayoutProps
  auth?: {
    required?: boolean;
  };
};
