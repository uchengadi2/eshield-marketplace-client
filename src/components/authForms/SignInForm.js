import React from "react";
import { Field, reduxForm } from "redux-form";

class SignInForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  //   renderInput(formProps) {
  //     console.log(formProps);
  //     return null;
  //   }

  renderInput = ({ input, label, meta, type }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input type={type} {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="email"
          component={this.renderInput}
          label="Email"
          type="email"
        />
        <Field
          name="password"
          component={this.renderInput}
          label="Password"
          type="password"
        />
        <button className="ui button primary">Login</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "You must enter your email";
  }

  if (!formValues.password) {
    errors.password = "You must enter your password";
  }

  return errors;
};

export default reduxForm({
  form: "loginForm",
  validate: validate,
})(SignInForm);
