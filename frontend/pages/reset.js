import React from "react";
import { useRouter } from "next/router";
import RequestResetComponent from "../components/RequestResetComponent";
import ResetComponent from "../components/ResetComponent";

const ResetPage = () => {
  const { query } = useRouter();

  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestResetComponent />
      </div>
    );
  }

  return (
    <div>
      <p>RESET YOUR PASSWORD {query?.token}</p>
      <ResetComponent token={query?.token} />
    </div>
  );
};

export default ResetPage;

// {
//   itemId: '610ff464f6226622b8b898eb',
//     identity: 'hayk94@gmail.com',
//   token: 'eyE115j8V0LB40wX7pzF'
// }
