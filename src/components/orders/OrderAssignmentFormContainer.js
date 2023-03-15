import React from "react";
import { connect } from "react-redux";
import AssignOrderForm from "../assignedOrders/AssignOrderForm";
import { assignOrder } from "./../../actions";

class OrderAssignmentFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    console.log("a;; the props are:", this.props);
  }

  onSubmit = (formValues) => {
    this.props.assignOrder(formValues, this.props.token);
    this.props.handleDialogOpenStatus();
  };
  render() {
    return (
      <div>
        <AssignOrderForm
          onSubmit={this.onSubmit}
          token={this.props.token}
          params={this.props.params}
          handleEditDialogOpenStatus={this.props.handleEditDialogOpenStatus}
          handleAssignDialogOpenStatus={this.props.handleAssignDialogOpenStatus}
        />
      </div>
    );
  }
}

export default connect(null, { assignOrder })(OrderAssignmentFormContainer);
