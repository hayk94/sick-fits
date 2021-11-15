import React from "react";
import { useRouter } from "next/router";
import ProductListComponent from "../../components/ProductListComponent";
import PaginationComponent from "../../components/PaginationComponent";

const ProductPage = () => {
  const { query } = useRouter();
  const page = parseInt(query.page) || 1;
  return (
    <div>
      <PaginationComponent page={page} />
      <ProductListComponent page={page} />
      <PaginationComponent page={page} />
    </div>
  );
};

export default ProductPage;
