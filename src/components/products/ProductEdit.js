import React from "react";
import { connect } from "react-redux";
import { fetchProduct, editProduct } from "../../actions";
import ProductEditForm from "./ProductEditForm";

class ProductEdit extends React.Component {
  componentDidMount() {
    //this.props.fetchCategory(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editProduct(this.props.params.id, formValues, this.props.token);
    this.props.handleEditDialogOpenStatus();

    //console.log("the form values areeeee:", formValues);
  };

  render() {
    return (
      <>
        <ProductEditForm
          token={this.props.token}
          params={this.props.params}
          handleEditDialogOpenStatus={this.props.handleEditDialogOpenStatus}
          onSubmit={this.onSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { product: state.product[ownProps.match.params.id] };
};

export default connect(null, { fetchProduct, editProduct })(ProductEdit);
