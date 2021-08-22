import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import ProductComponent from "./ProductComponent";

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const ProductListComponent = () => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <ProductListStyles>
        {data.allProducts.map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </ProductListStyles>
    </div>
  );
};

export default ProductListComponent;
