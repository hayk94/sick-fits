import React from "react";
import { useUser } from "./UserComponent";
import SignInComponent from "./SignInComponent";

const PleaseSignInComponent = ({ children }) => {
  const user = useUser();
  if (!user) return <SignInComponent />;
  return children;
};

export default PleaseSignInComponent;
