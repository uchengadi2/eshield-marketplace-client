import React from "react";
import { connect } from "react-redux";
import { fetchCountry, editCountry } from "./../../../actions";
import CountryEditForm from "./CountryEditForm";

class CountryEdit extends React.Component {
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
        <CountryEditForm
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
  return { country: state.country[ownProps.match.params.id] };
};

export default connect(null, { fetchCountry, editCountry })(CountryEdit);
