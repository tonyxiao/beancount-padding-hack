import React from "react";

import { loadStripe } from "@stripe/stripe-js";

import {
  CardElement,
  Elements,
  // useStripe,
  // useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

function CheckoutForm() {
  // const _stripe = useStripe();
  // const elements = useElements();
  return <CardElement />;
}

export function StripeTest() {
  return (
    <div className="App">
      <h1>Stripe test</h1>
      <Elements
        stripe={stripePromise}
        options={{
          appearance: {
            // variables: {
            //   colorPrimary: "#0570de",
            //   colorBackground: "#ffffff",
            //   colorText: "#30313d",
            //   colorDanger: "#df1b41",
            //   fontFamily: "Ideal Sans, system-ui, sans-serif",
            //   spacingUnit: "2px",
            //   borderRadius: "4px",
            // },
          },
        }}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
}
