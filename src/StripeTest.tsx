import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";

import {
  CardElement,
  Elements,
  PaymentElement,
  PaymentRequestButtonElement,
  useStripe,
  // useStripe,
  // useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_Gjua0LS5XOQ4z3cSWjSM1nBM00wuQQ1lOP");

export function CardForm() {
  // const _stripe = useStripe();
  // const elements = useElements();
  return <CardElement />;
}

export function PaymentRequestButtonForm() {
  const stripe = useStripe();
  type PR = ReturnType<NonNullable<typeof stripe>["paymentRequest"]>;
  const [paymentRequest, setPaymentRequest] = useState<PR>();

  useEffect(() => {
    var pr = stripe?.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Demo total",
        amount: 1099,
      },
      // For apple pay, payer name doesn't show up separately, instead including it
      // includes the entire billing address including the billing name
      requestPayerName: true,
      // Email and phone however show up as separate line
      requestPayerEmail: true,
      requestPayerPhone: true,
    });

    pr?.canMakePayment().then((r) => {
      if (r) {
        setPaymentRequest(pr!);
      } else {
        console.log("Not availble for use", r);
      }
    });
  }, [stripe]);

  // const elements = useElements();
  return paymentRequest ? (
    <PaymentRequestButtonElement options={{ paymentRequest }} />
  ) : (
    <span>Waiting for payment requeest</span>
  );
}

function PaymentForm() {
  return <PaymentElement />;
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
          clientSecret:
            "pi_3KlzLIH1sqCC8Cfy1adPx6wa_secret_T4KcjvDOJOiIDcTf259BRd67x",
        }}
      >
        {/* <PaymentRequestButtonForm /> */}
        {/* <CardForm /> */}
        <PaymentForm />
      </Elements>
    </div>
  );
}
