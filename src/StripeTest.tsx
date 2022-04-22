import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";

import {
  CardElement,
  Elements,
  PaymentElement,
  PaymentRequestButtonElement,
  useElements,
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
  const stripe = useStripe();
  const elements = useElements();

  return (
    <form
      onSubmit={async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }

        const { error } = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: "https://6897-182-253-75-232.ngrok.io/stripe",
          },
        });

        if (error) {
          // This point will only be reached if there is an immediate error when
          // confirming the payment. Show error to your customer (for example, payment
          // details incomplete)
          console.error(error.message);
        } else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
        }
      }}
    >
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
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
