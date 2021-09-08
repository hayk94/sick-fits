import React from "react";
import Link from "next/link";
import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

const ProductComponent = ({ product }) => (
  <ItemStyles>
    <img src={product.photo?.image?.publicUrlTransformed} alt={product.name} />
    <Title>
      <Link href={`products/${product.id}`}>{product.name}</Link>
    </Title>
    <PriceTag>{formatMoney(product.price)}</PriceTag>
    <p>{product.description}</p>
    {/* TODO: Add buttons to edit and delete item */}
  </ItemStyles>
);

export default ProductComponent;