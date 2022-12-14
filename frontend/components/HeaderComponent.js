import React from "react";
import Link from "next/link";
import styled from "styled-components";
import NavComponent from "./NavComponent";
import CartComponent from "./CartComponent";
import SearchComponent from "./SearchComponent";

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: red;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

const HeaderComponent = () => (
  <HeaderStyles>
    <div className="bar">
      <Logo>
        <Link href="/">Sick Fits</Link>
      </Logo>
      <NavComponent />
    </div>
    <div className="sub-bar">
      <SearchComponent />
    </div>
    <CartComponent />
  </HeaderStyles>
);

export default HeaderComponent;
