import React from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./UserComponent";
import SignOutComponent from "./SignOutComponent";

const NavComponent = () => {
  const user = useUser();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/order">Order</Link>
          <Link href="/account">Account</Link>
          <SignOutComponent />
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
