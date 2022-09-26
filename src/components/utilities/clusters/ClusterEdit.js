import React from "react";
import { connect } from "react-redux";
import { fetchCluster, editCluster } from "../../../actions";
import ClusterEditForm from "./ClusterEditForm";

class ClusterEdit extends React.Component {
  componentDidMount() {
    //this.props.fetchCategory(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editRemittance(
      this.props.params.id,
      formValues,
      this.props.token
    );
    this.props.handleEditDialogOpenStatus();

    //console.log("the form values areeeee:", formValues);
  };

  render() {
    return (
      <>
        <ClusterEditForm
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
  return { cluster: state.cluster[ownProps.match.params.id] };
};

export default connect(null, { fetchCluster, editCluster })(ClusterEdit);
