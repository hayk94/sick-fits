import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const BigButtonStyles = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

const RemoveFromCartComponent = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: "CartItem",
    //     id,
    //   },
    // },
  });
  return (
    <BigButtonStyles
      type="button"
      title="Remove This Item from Cart"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BigButtonStyles>
  );
};

export default RemoveFromCartComponent;
