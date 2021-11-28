import React, { useState } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import nProgress from "nprogress";
import SickButton from "./styles/SickButton";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutFormComponent = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 1. Turn the loader on
    setLoading(true);
    // 2. Start the page transition
    nProgress.start();
    // 3. Create the payment method via stripe (token comes from here)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log("paymentMethod", paymentMethod);
    // 4. Handle any errors from stripe
    // 5. Send the token from step 3 to our keystone server, via a custom mutation
    // 6. Change the page to view the order
    // 7. Close the cart
    // 8. Turn the loader off
    setLoading(false);
    nProgress.done();
  };
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
};

const CheckoutComponent = () => (
  <Elements stripe={stripeLib}>
    <CheckoutFormComponent />
  </Elements>
);

export default CheckoutComponent;
