import React from "react";

const PageComponent = ({ children }) => {
  return (
    <div>
      <h2>I am page component!</h2>
      {children}
    </div>
  );
};

export default PageComponent;
