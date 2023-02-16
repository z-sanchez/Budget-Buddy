import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { NextComponentType } from "next";
import type { NextPageContext } from "next";
import { api } from "../utils/api";
import "../styles/globals.css";
import { type ReactNode } from "react";

export type NextPageWithLayout = NextComponentType<
  NextPageContext,
  any,
  any
> & {
  getLayout?: (page: JSX.Element) => ReactNode;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: NextPageWithLayout;
  pageProps: {
    session: Session | null;
  };
}) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
