import React from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./UserComponent";
import SignOutComponent from "./SignOutComponent";
import { useCartContext } from "../lib/cartState";

const NavComponent = () => {
  const user = useUser();
  const { openCart } = useCartContext();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/order">Order</Link>
          <Link href="/account">Account</Link>
          <SignOutComponent />
          <button type="button" onClick={openCart}>
            My Cart
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default NavComponent;
