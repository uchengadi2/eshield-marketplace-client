import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RemittanceForm from "./RemittanceForm";

import { processRemittance } from "./../../actions";

class RemittanceFormContainer extends React.Component {
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
    this.props.processRemittance(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <>
        <RemittanceForm onSubmit={this.onSubmit} token={this.props.token} />
      </>
    );
  }
}

export default connect(null, { processRemittance })(RemittanceFormContainer);
