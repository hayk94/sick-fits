import React from "react";
import { useRouter } from "next/router";
import SingleProductComponent from "../../components/SingleProductComponent";

const SingleProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <SingleProductComponent id={id} />;
};

export default SingleProductPage;
