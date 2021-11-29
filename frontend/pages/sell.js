import React from "react";
import CreateProductComponent from "../components/CreateProductComponent";
import PleaseSignInComponent from "../components/PleaseSignInComponent";

const SellPage = () => (
  <div>
    <PleaseSignInComponent>
      <CreateProductComponent />
    </PleaseSignInComponent>
  </div>
);

export default SellPage;
