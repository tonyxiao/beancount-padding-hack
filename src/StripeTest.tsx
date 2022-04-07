import React, { useEffect, useState } from "react";

import { loadStripe, Stripe } from "@stripe/stripe-js";

import {
  CardElement,
  Elements,
  PaymentRequestButtonElement,
  useStripe,
  // useStripe,
  // useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

export function CardForm() {
  // const _stripe = useStripe();
  // const elements = useElements();
  return <CardElement />;
}

function PaymentRequestButtonForm() {
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
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr?.canMakePayment().then((r) => {
      if (r) {
        setPaymentRequest(pr!);
      } else {
        console.log('Not availble for use', r)
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
        <PaymentRequestButtonForm />
        {/* <CardForm /> */}
      </Elements>
    </div>
  );
}
