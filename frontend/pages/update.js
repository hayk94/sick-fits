import React from "react";
import { useRouter } from "next/router";
import UpdateProductComponent from "../components/UpdateProductComponent";

const UpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <UpdateProductComponent id={id} />
    </div>
  );
};

export default UpdatePage;
