import React from "react";
import { connect } from "react-redux";
import { createUser } from "../../../../actions";

import StaffForm from "./StaffForm";

class StaffFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    console.log("the token props are:", this.props.token);
  }

  onSubmit = (formValues) => {
    this.props.createUser(formValues, this.props.token);
    this.props.handleDialogOpenStatus();
  };
  render() {
    return (
      <div>
        <StaffForm
          onSubmit={this.onSubmit}
          userId={this.props.userId}
          token={this.props.token}
        />
      </div>
    );
  }
}

export default connect(null, { createUser })(StaffFormContainer);
