import React, { useCallback } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Router from "next/router";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./ProductListComponent";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables should be passed
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

const CreateProductComponent = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: "",
    name: "Nice shoes",
    description: "These are the best shoes",
    price: 3456,
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      // we know variables already here, but they also can be passed when invoking createProduct
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const res = await createProduct();
      clearForm();
      Router.push({
        pathname: `product/${res.data.createProduct.id}`,
      });
    },
    [clearForm, createProduct]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            placeholder="Upload an image"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            required
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
};

export default CreateProductComponent;
