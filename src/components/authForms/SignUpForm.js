import React from "react";
import { Field, reduxForm } from "redux-form";

class SignUpForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  //renderInput(formProps) {
  renderInput = ({ input, label, meta, type }) => {
    //console.log("formProps:", formProps);
    //return <input {...input} />;
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
    //console.log(formValues);
    this.props.onSubmit(formValues);
    //console.log(this.props.signUp(formValues));
  };

  render() {
    console.log("this is the props:", this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="name"
          component={this.renderInput}
          label="Enter name"
          type="text"
        />
        <Field
          name="email"
          component={this.renderInput}
          label="Enter email"
          type="text"
        />
        <Field
          name="password"
          component={this.renderInput}
          label="Enter password"
          type="password"
        />
        <Field
          name="confirmPassword"
          component={this.renderInput}
          label="Confirm password"
          type="password"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "You must enter a name";
  }

  if (!formValues.email) {
    errors.email = "You must enter your email";
  }

  if (!formValues.password) {
    errors.password = "You must enter your password";
  }

  if (!formValues.confirmPassword) {
    errors.confirmPassword = "You must enter the confirmed password";
  }

  return errors;
};

export default reduxForm({
  form: "signUpform",
  validate: validate,
})(SignUpForm);

//export default connect(null, { formWrapper })(SignUpForm);
