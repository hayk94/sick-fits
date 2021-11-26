import React from "react";
import CartStyles from "./styles/CartStyles";
import { useUser } from "./UserComponent";
import Supreme from "./styles/Supreme";
import CartItemComponent from "./CartItemComponent";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";

const CartComponent = () => {
  const user = useUser();
  if (!user) return null;
  return (
    <CartStyles open>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
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
