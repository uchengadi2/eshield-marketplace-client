import React from "react";
//import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signUp } from "./../../actions";
import SignUpForm from "../authForms/SignUpForm";

class UserSignUp extends React.Component {
  onSubmit = (formValues) => {
    //console.log(formValues);
    this.props.signUp(formValues);
  };
  render() {
    return (
      <div>
        <h3>User Registration</h3>
        <SignUpForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { signUp })(UserSignUp);
