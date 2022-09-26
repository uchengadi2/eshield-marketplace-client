import React from "react";
import { connect } from "react-redux";
import { fetchPayment, bookPayment } from "../../actions";
import PaymentBookingForm from "./PaymentBookingForm";

class PaymentBooking extends React.Component {
  componentDidMount() {
    //this.props.fetchCategory(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.bookPayment(this.props.params.id, formValues, this.props.token);
    this.props.handleBookPaymentDialogOpenStatus();
  };

  render() {
    return (
      <>
        <PaymentBookingForm
          token={this.props.token}
          params={this.props.params}
          handleBookPaymentDialogOpenStatus={
            this.props.handleBookPaymentDialogOpenStatus
          }
          onSubmit={this.onSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { payment: state.payment[ownProps.match.params.id] };
};

export default connect(null, { fetchPayment, bookPayment })(PaymentBooking);
