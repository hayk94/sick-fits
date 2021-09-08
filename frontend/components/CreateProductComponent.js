import React from "react";
import useForm from "../lib/useForm";
import Form from "./styles/Form";

const CreateProductComponent = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: "",
    name: "Nice shoes",
    description: "These are the best shoes",
    price: 3456,
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <fieldset>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            placeholder="Upload an image"
            value={inputs.image}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
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
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Price
          <textarea
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
