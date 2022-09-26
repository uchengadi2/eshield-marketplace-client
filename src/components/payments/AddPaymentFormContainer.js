import React from "react";
import { connect } from "react-redux";
import AddPaymentForm from "./AddPaymentForm";

import { makePayment } from "./../../actions";

class AddPaymentFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    console.log("a;; the props are:", this.props);
  }

  onSubmit = (formValues) => {
    this.props.makePayment(formValues, this.props.token);
    this.props.handleDialogOpenStatus();
  };
  render() {
    return (
      <div>
        <AddPaymentForm
          onSubmit={this.onSubmit}
          token={this.props.token}
          userId={this.props.userId}
        />
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   console.log("this is the order status:", state.order.status);
//   // return { status: state.order.status };
//   return null;
// };

export default connect(null, { makePayment })(AddPaymentFormContainer);
