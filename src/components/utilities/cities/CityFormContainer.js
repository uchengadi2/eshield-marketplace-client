import React from "react";
import { connect } from "react-redux";

import { createCity } from "./../../../actions";
import CityForm from "./CityForm";

class CityFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    console.log("a;; the props are:", this.props);
  }

  handleDialogOpenStatus = () => {
    this.setState({
      open: true,
    });
  };

  onSubmit = (formValues) => {
    this.props.createCity(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <div>
        <CityForm
          onSubmit={this.onSubmit}
          token={this.props.token}
          userId={this.props.userId}
        />
      </div>
    );
  }
}

// CategoryFormContainer.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => {
//   //return { token: state.auth.token };
//   return null;
// };

export default connect(null, { createCity })(CityFormContainer);
