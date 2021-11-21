import React from "react";
import styled from "styled-components";
import SignInComponent from "../components/SignInComponent";
import SignUpComponent from "../components/SignUpComponent";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const SignInPage = () => (
  <div>
    <SignInComponent />
    <SignUpComponent />
  </div>
);

export default SignInPage;
