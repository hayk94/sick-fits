import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import addToCart from "./addToCart";

// use this for the typedefs schema to be highlighted in the editor
const gql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: gql`
    type Mutation {
      addToCart(productId: ID!): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
