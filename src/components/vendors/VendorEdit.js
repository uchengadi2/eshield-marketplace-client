import React from "react";
import { connect } from "react-redux";
import { fetchVendor, editVendor } from "../../actions";
import VendorEditForm from "./VendorEditForm";

class VendorEdit extends React.Component {
  componentDidMount() {}

  onSubmit = (formValues) => {
    this.props.editVendor(this.props.params.id, formValues, this.props.token);
    this.props.handleEditDialogOpenStatus();

    //console.log("the form values areeeee:", formValues);
  };

  render() {
    return (
      <>
        <VendorEditForm
          token={this.props.token}
          userId={this.props.userId}
          params={this.props.params}
          handleEditDialogOpenStatus={this.props.handleEditDialogOpenStatus}
          onSubmit={this.onSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { vendor: state.vendor[ownProps.match.params.id] };
};

export default connect(null, { fetchVendor, editVendor })(VendorEdit);
