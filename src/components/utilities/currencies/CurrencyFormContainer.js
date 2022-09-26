import React from "react";
import { connect } from "react-redux";
import { createCurrency } from "../../../actions";
import CurrencyForm from "./CurrencyForm";

class CurrencyFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {}

  onSubmit = (formValues) => {
    this.props.createCurrency(formValues, this.props.token);
    this.props.handleDialogOpenStatus();
  };
  render() {
    return (
      <div>
        <CurrencyForm onSubmit={this.onSubmit} userId={this.props.userId} />
      </div>
    );
  }
}

export default connect(null, { createCurrency })(CurrencyFormContainer);
