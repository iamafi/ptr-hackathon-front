import Head from "next/head";

import { Navbar } from "@/components/layout/navbar";
import { PanelHeader } from "@/components/layout/panel-header";
import type { PanelHeaderProps } from "@/components/layout/panel-header";

export type LayoutProps =
  | {
      variant?: "default";
    }
  | ({
      variant: "panel";
    } & PanelHeaderProps);

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  variant = "default",
  ...props
}) => {
  return (
    <>
      <Head>
        <title>Ramenstein theorem</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full min-h-[100svh] flex-col">
        {variant === "panel" && <PanelHeader {...props} />}
        <div className="container flex-1 p-5">{children}</div>
        {variant === "default" && <Navbar />}
      </main>
    </>
  );
};
