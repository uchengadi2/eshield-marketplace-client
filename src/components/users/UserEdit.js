import React from "react";
import { connect } from "react-redux";
import { fetchUser, editUser } from "../../actions";
import UserEditForm from "./UserEditForm";

class UserEdit extends React.Component {
  componentDidMount() {
    //this.props.fetchCategory(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editUser(this.props.params.id, formValues, this.props.token);
    this.props.handleEditDialogOpenStatus();

    //console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <>
        <UserEditForm
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
  return { user: state.user[ownProps.match.params.id] };
};

export default connect(null, { fetchUser, editUser })(UserEdit);
