import React from "react";
import { connect } from "react-redux";
import { fetchState, editState } from "../../../actions";
import StateEditForm from "./StateEditForm";

class StateEdit extends React.Component {
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
        <StateEditForm
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
  return { state: state.state[ownProps.match.params.id] };
};

export default connect(null, { fetchState, editState })(StateEdit);
