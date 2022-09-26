import React from "react";
import CategoryForm from "./CategoryForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createCategory } from "./../../actions";

class CategoryFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    console.log(" the props are:", this.props);
  }

  handleDialogOpenStatus = () => {
    this.setState({
      open: true,
    });
  };

  onSubmit = (formValues) => {
    this.props.createCategory(formValues, this.props.token);
    this.props.handleDialogOpenStatus();

    //console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <div>
        <CategoryForm onSubmit={this.onSubmit} userId={this.props.userId} />
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

export default connect(null, { createCategory })(CategoryFormContainer);
