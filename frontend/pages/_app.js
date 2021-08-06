import React from "react";
import Router from "next/router";
import PageComponent from "../components/PageComponent";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const _App = ({ Component, pageProps }) => (
  <PageComponent>
    <Component {...pageProps} />
  </PageComponent>
);

export default _App;
