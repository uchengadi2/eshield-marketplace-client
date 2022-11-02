import React from "react";
import { connect } from "react-redux";
import { fetchCity, editCity } from "../../../actions";
import CityEditForm from "./CityEditForm";

class CityEdit extends React.Component {
  componentDidMount() {
    //this.props.fetchCategory(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editCity(this.props.params.id, formValues, this.props.token);
    this.props.handleEditDialogOpenStatus();

    //console.log("the form values areeeee:", formValues);
  };

  render() {
    return (
      <>
        <CityEditForm
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
  return { city: state.city[ownProps.match.params.id] };
};

export default connect(null, { fetchCity, editCity })(CityEdit);
