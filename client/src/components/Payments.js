import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handleToken } from "../actions/index";

const Payments = ({ handleToken }) => {
  return (
    <StripeCheckout
      amount={500}
      token={handleToken}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      name="Emaily"
      description="$5 for 5 email credits"
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
};

export default connect(null, { handleToken })(Payments);
