import React from "react";
import PageComponent from "../components/PageComponent";

const _App = ({ Component, pageProps }) => (
  <PageComponent>
    <Component {...pageProps} />
  </PageComponent>
);

export default _App;
