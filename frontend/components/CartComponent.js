import React from "react";
import CartStyles from "./styles/CartStyles";
import { useUser } from "./UserComponent";
import Supreme from "./styles/Supreme";
import CartItemComponent from "./CartItemComponent";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";
import { useCartContext } from "../lib/cartState";
import CloseButton from "./styles/CloseButton";

const CartComponent = () => {
  const user = useUser();

  const { cartOpen, closeCart } = useCartContext();

  if (!user) return null;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItemComponent key={cartItem.id} {...cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default CartComponent;
