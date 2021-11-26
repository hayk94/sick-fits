import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItemComponent = ({ id, product, quantity }) => (
  <CartItemStyles>
    <img
      width={100}
      src={product.photo.image.publicUrlTransformed}
      alt={product.name}
    />
    <div>
      <h3>{product.name}</h3>
      <p>
        {formatMoney(product.price * quantity)}-
        <em>
          {quantity} &times; {formatMoney(product.price)}
          each
        </em>
      </p>
    </div>
    <RemoveFromCartComponent id={id} />
  </CartItemStyles>
);

export default CartItemComponent;
