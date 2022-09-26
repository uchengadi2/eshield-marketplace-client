import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import { fetchOnTransitOrders } from "../../actions";

import DataGridContainer from "../DataGridContainer";
import OrderAssignmentFormContainer from "../orders/OrderAssignmentFormContainer";
import OrdersEdit from "../orders/OrdersEdit";
import OrderDelete from "../orders/OrdersDelete";
import OrderOnTransitOrderDelete from "./OrderOnTransitOrderDelete";
import OrdersShow from "../orders/OrdersShow";
import OrderOnTransitEditForm from "./OrderOnTransitEditForm";

class OrderOnTransitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      cancelOpen: false,
      assignOpen: false,
      id: null,
      params: {},
      alert: {
        open: false,
        message: "",
        backgroundColor: "",
      },
    };
  }
  componentDidMount() {
    this.props.fetchOnTransitOrders(this.props.token);
  }

  handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ deleteOpen: false });
  };

  handleEditDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ editOpen: false });
  };

  handleSuccessfulEditSnackbar = (message) => {
    // history.push("/categories/new");
    this.setState({ editOpen: false });
    this.setState({
      alert: {
        open: true,
        message: message,
        backgroundColor: "#4BB543",
      },
    });
  };

  handleFailedSnackbar = (message) => {
    this.setState({
      alert: {
        open: true,
        message: message,
        backgroundColor: "#FF3232",
      },
    });
    this.setState({ editOpen: false });
  };

  renderEditDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.editOpen}
          onClose={() => [
            this.setState({ editOpen: false }),
            history.push("/orders/ontransit"),
          ]}
        >
          <DialogContent>
            <OrderOnTransitEditForm
              token={this.props.token}
              userId={this.props.userId}
              params={this.state.params}
              handleEditDialogOpenStatus={this.handleEditDialogOpenStatus}
              handleSuccessfulEditSnackbar={this.handleSuccessfulEditSnackbar}
              handleFailedSnackbar={this.handleFailedSnackbar}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderDeleteDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.deleteOpen}
          onClose={() => [
            this.setState({ deleteOpen: false }),
            history.push(`/orders/ontransit`),
          ]}
        >
          <DialogContent>
            <OrderOnTransitOrderDelete
              token={this.props.token}
              id={this.state.id}
              handleDialogOpenStatus={this.handleDialogOpenStatus}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderCancelDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.cancelOpen}
          onClose={() => [
            this.setState({ cancelOpen: false }),
            history.push(`/orders/ontransit`),
          ]}
        >
          <DialogContent>
            <Typography>This is the cancel dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderAssignOrderDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.assignOpen}
          onClose={() => [
            this.setState({ assignOpen: false }),
            history.push(`/orders/ontransit`),
          ]}
        >
          <DialogContent>
            <OrderAssignmentFormContainer />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderOrdersList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 100 },
      { field: "order", headerName: "Assigned Order", width: 150 },
      { field: "category", headerName: "Category", width: 150 },
      { field: "vehicle", headerName: "Vehicle", width: 150 },
      { field: "vendor", headerName: "Vendor", width: 150 },
      { field: "status", headerName: "Status", width: 150 },

      {
        field: "editaction",
        headerName: "",
        width: 30,
        description: "Update row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <EditRoundedIcon
              onClick={() => [
                this.setState({
                  editOpen: true,
                  id: params.id,
                  params: params.row,
                }),
                history.push(`/orders/ontransit/edit/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    this.props.orders.map((order) => {
      let row = {
        numbering: ++counter,
        id: order.id,
        assignedOrder: order.assignedOrder,
        order: order.order,
        vehicle: order.vehicle,
        status: order.status,
        category: order.category,
        vendor: order.vendor,
        vendorCountry: order.vendorCountry,
        crewLeaderName: order.crewLeaderName,
        crewLeaderPhoneNumber: order.crewLeaderPhoneNumber,
        crewFirstAssistantName: order.crewFirstAssistantName,
        crewFirstAssistantPhoneNumber: order.crewFirstAssistantPhoneNumber,
        crewSecondAssistantName: order.crewSecondAssistantName,
        crewSecondAssistantPhoneNumber: order.crewSecondAssistantPhoneNumber,
        transitCommencementDate: order.transitCommencementDate,
        dateCreated: order.dateCreated,
        createdBy: order.createdBy,
        refNumber: order.refNumber,
        label: order.label,
      };
      rows.push(row);
    });
    return <DataGridContainer columns={columns} rows={rows} />;
  };

  render() {
    return (
      <>
        {this.renderDeleteDialogForm()}
        {this.renderEditDialogForm()}
        {this.renderOrdersList()}
        {this.renderCancelDialogForm()}
        {this.renderAssignOrderDialogForm()}
        <Snackbar
          open={this.state.alert.open}
          message={this.state.alert.message}
          ContentProps={{
            style: { backgroundColor: this.state.alert.backgroundColor },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => this.setState({ alert: { ...alert, open: false } })}
          autoHideDuration={4000}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { orders: Object.values(state.orderOnTransit) };
};

export default connect(mapStateToProps, { fetchOnTransitOrders })(
  OrderOnTransitList
);
