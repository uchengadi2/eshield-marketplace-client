import React from "react";
import { connect } from "react-redux";
import { fetchCategory, editCategory } from "../../actions";
import CategoryEditForm from "./CategoryEditForm";

class CategoryEdit extends React.Component {
  componentDidMount() {
    //this.props.fetchCategory(this.props.match.params.id);
    //console.log("these are the params:", this.props);
  }

  onSubmit = (formValues) => {
    this.props.editCategory(this.props.params.id, formValues, this.props.token);
    this.props.handleEditDialogOpenStatus();

    //console.log("the form values areeeee:", formValues);
  };
  render() {
    return (
      <>
        <CategoryEditForm
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
  return { category: state.category[ownProps.match.params.id] };
};

export default connect(null, { fetchCategory, editCategory })(CategoryEdit);
