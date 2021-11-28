import { KeystoneContext } from "@keystone-next/types";
import {
  CartItemCreateInput,
  OrderCreateInput,
  UserCreateInput,
} from "../.keystone/schema-types";
import { Session } from "../types";
import stripeConfig from "../lib/stripe";

// use this for the typedefs schema to be highlighted in the editor
const gql = String.raw;

export default async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Make sure the user is signed
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error("Sorry You must be signed in to create an order!");
  }

  const user = await context.lists.User.findOne({
    where: { id: session.itemId },
    resolveFields: `
        id
        name
        email
        cart {
            id
            quantity
            product {
              name
              price
              description
              id
              photo {
                id
                image {
                  id
                  publicUrlTransformed
                }
              }
            }
        }
    `,
  });

  // 2. calculate the total price for the order
  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(
    (tally: number, cartItem: CartItemCreateInput) =>
      tally + cartItem.quantity * cartItem.product.price,
    0
  );
  console.log("amount", amount);

  // 3. create the payment with the stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: "USD",
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  console.log(charge);

  // 4. Convert the cartItems to orderItems
  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });

  // 5. Create the order to return
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: session.itemId } },
    },
  });

  // 6. Clean up any old cart items
  const cartItemIds = user.cart.map((cartItem) => cartItem.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds,
  });

  return order;
}
