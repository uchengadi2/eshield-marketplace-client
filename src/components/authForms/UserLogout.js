import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { signOut } from "./../../actions";
import LogoutForm from "./LogoutForm";

class UserLogout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      counter: 0,
    };
  }

  componentDidMount() {
    this.props.signOut();
  }

  componentDidUpdate() {
    this.props.setToken({});
    this.props.handleLogoutProcess();
  }

  render() {
    return <div>{/* <LogoutForm onSubmit={this.onSubmit} /> */}</div>;
  }
}

UserLogout.propTypes = {
  setToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("this is the new state:", state);
  return { token: state.auth.token };
};

export default connect(mapStateToProps, { signOut })(UserLogout);
