import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  //  1. Query the user to see if they are signed in
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error("You must be logged in to do this!");
  }
  //  2. Query the current user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: "id, quantity",
  });
  const [existingCartItem] = allCartItems;
  //  3. See if the item is in the cart
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity} items, increment by 1`
    );

    //  4. If it is, increment the quantity by 1
    return context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  //  5. if it isn't, create a new cart item
  return context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
}
