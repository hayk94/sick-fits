import React from "react";
import Router from "next/router";
import { ApolloProvider } from "@apollo/client";
import Nprogress from "nprogress";
import PageComponent from "../components/PageComponent";
import withData from "../lib/withData";

Router.events.on("routeChangeStart", () => Nprogress.start());
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

const _App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <PageComponent>
      <Component {...pageProps} />
    </PageComponent>
  </ApolloProvider>
);

_App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  // make apollo work with next
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // get any query variables at a page level
  pageProps.query = ctx.query;
};

export default withData(_App);
