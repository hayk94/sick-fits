import React from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";

const NavComponent = () => (
  <NavStyles>
    <Link href="/products">Products</Link>
    <Link href="/sell">Sell</Link>
    <Link href="/order">Order</Link>
    <Link href="/account">Account</Link>
  </NavStyles>
);

export default NavComponent;
