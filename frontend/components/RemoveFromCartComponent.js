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
  mutation REMOVE_FROM_CART_MUTATION($id: ID) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const RemoveFromCartComponent = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    // refetchQueries: [] // TODO: Instead going to implement optimistic ui
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
