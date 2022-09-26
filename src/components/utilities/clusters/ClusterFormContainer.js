import React from "react";
import { connect } from "react-redux";
import { createCluster } from "../../../actions";
import ClusterForm from "./ClusterForm";

class ClusterFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    
  }

  onSubmit = (formValues) => {
    this.props.createCluster(formValues, this.props.token);
    this.props.handleDialogOpenStatus();
  };
  render() {
    return (
      <>
        <ClusterForm onSubmit={this.onSubmit} userId={this.props.userId} />
      </>
    );
  }
}

export default connect(null, { createCluster })(ClusterFormContainer);
