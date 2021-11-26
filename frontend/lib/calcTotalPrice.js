export default function calcTotalPrice(cart = []) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // products could be deleted while they are still in the cart
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
