import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";

import { createProduct } from "./../../actions";

class ProductFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {}

  onSubmit = (formValues) => {
    this.props.createProduct(formValues, this.props.token);
    //this.props.handleDialogOpenStatus();
  };
  render() {
    return (
      <div>
        <ProductForm
          onSubmit={this.onSubmit}
          token={this.props.token}
          userId={this.props.userId}
        />
      </div>
    );
  }
}

export default connect(null, { createProduct })(ProductFormContainer);
