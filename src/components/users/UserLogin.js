import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LoginForm from "../authForms/LoginForm";
import { signIn } from "./../../actions";

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      counter: 0,
    };
  }

  componentDidUpdate() {
    if (this.state.counter < 0 && this.props.token !== undefined) {
      if (this.props.token.status === "success") {
        this.props.setToken(this.props.token);
        this.props.setUserId(this.props.token);
        this.props.handleSuccessfulLoginInSnackbar(
          "You have successfully logged in"
        );
        this.setState({ counter: 5 });
      } else if (this.props.token.status !== undefined) {
        this.props.handleFailedLoginInSnackbar(
          "Username or password is incorrect"
        );
        this.setState({ counter: 6 });
      }
    }
  }

  onSubmit = (formValues) => {
    this.props.signIn(formValues);

    // this.props.setToken(this.props.token);
    // this.props.setUserId(this.props.token);
    this.setState({ counter: -1 });
  };
  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.onSubmit}
          handleSuccessfulLoginInSnackbar={
            this.props.handleSuccessfulLoginInSnackbar
          }
          handleFailedLoginInSnackbar={this.props.handleFailedLoginInSnackbar}
        />
      </div>
    );
  }
}

UserLogin.propTypes = {
  setToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps, { signIn })(UserLogin);
