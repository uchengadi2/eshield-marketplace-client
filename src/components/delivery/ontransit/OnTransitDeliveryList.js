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
import history from "../../../history";
import { fetchOnTransitDeliveries } from "../../../actions";
import DataGridContainer from "../../DataGridContainer";
//import OrderAssignmentFormContainer from "./OrderAssignmentFormContainer";

import OnTransitDeliveryDelete from "./OnTransitDeliveryDelete";
import OnTransitDeliveryEditForm from "./OnTransitDeliveryEditForm";

class OnTransitDeliveryList extends React.Component {
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
    this.props.fetchOnTransitDeliveries(this.props.token, this.props.status);
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
    this.setState({ editOpen: true });
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
            history.push("/deliveries/ontransit"),
          ]}
        >
          <DialogContent>
            <OnTransitDeliveryEditForm
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
            history.push(`/deliveries/ontransit`),
          ]}
        >
          <DialogContent>
            <OnTransitDeliveryDelete
              token={this.props.token}
              userId={this.props.userId}
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
            history.push(`/deliveries/ontransit`),
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
            history.push(`/deliveries/ontransit`),
          ]}
        >
          <DialogContent>
            {/* <OrderAssignmentFormContainer
              token={this.props.token}
              params={this.state.params}
              handleEditDialogOpenStatus={this.handleEditDialogOpenStatus}
            /> */}
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
      { field: "refNumber", headerName: "Reference Number", width: 150 },
      { field: "orderNumber", headerName: "Order Number", width: 200 },
      {
        field: "logisticsPartnerName",
        headerName: "Logistics Partner",
        width: 200,
      },

      {
        field: "logisticsPartner",
        headerName: "Logistics Partnerr",
        width: 200,
        hide: true,
      },
      { field: "status", headerName: "Status", width: 150 },
      // {
      //   field: "consignmentCountry",
      //   headerName: "Source Country",
      //   width: 150,
      // },
      // {
      //   field: "destinationCountry",
      //   headerName: "Destination Country",
      //   width: 150,
      // },
      {
        field: "editaction",
        headerName: "",
        width: 30,
        description: "Update row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <EditRoundedIcon
              style={{ cursor: "pointer" }}
              onClick={() => [
                this.setState({
                  editOpen: true,
                  id: params.id,
                  params: params.row,
                }),
                history.push(`/deliveries/ontransit/edit/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      // {
      //   field: "cancelorder",
      //   headerName: "",
      //   width: 30,
      //   description: "Cancel Order",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
      //       <CancelRoundedIcon
      //         style={{ color: "black" }}
      //         onClick={() => [
      //           this.setState({ cancelOpen: true, id: params.id }),
      //           history.push(`/orders/cancel/${params.id}`),
      //         ]}
      //       />
      //     </strong>
      //   ),
      // },
      // {
      //   field: "assignorder",
      //   headerName: "",
      //   width: 30,
      //   description: "Assign Order",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
      //       <AssignmentIcon
      //         style={{ color: "black" }}
      //         onClick={() => [
      //           this.setState({ assignOpen: true, id: params.id }),
      //           history.push(`/orders/assign/${params.id}`),
      //         ]}
      //       />
      //     </strong>
      //   ),
      // },
      {
        field: "deleteaction",
        headerName: "",
        width: 30,
        description: "Delete row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <DeleteRoundedIcon
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => [
                this.setState({ deleteOpen: true, id: params.id }),
                history.push(`/deliveries/ontransit/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    this.props.deliveries.map((delivery) => {
      let row = {
        numbering: ++counter,
        id: delivery.id,
        refNumber: delivery.refNumber,
        orderNumber: delivery.orderNumber,

        recipientName: delivery.recipientName,
        recipientPhoneNumber: delivery.recipientPhoneNumber,
        recipientAddress: delivery.recipientAddress,
        destinationState: delivery.destinationState,
        destinationCountry: delivery.destinationCountry,
        customer: delivery.customer,
        customerEmail: delivery.customerEmail,
        customerPhoneNumber: delivery.customerPhoneNumber,
        dateOrdered: delivery.dateOrdered,
        status: delivery.status,
        returnReason: delivery.returnReason,
        logisticsPartner: delivery.logisticsPartner.id,
        logisticsPartnerName: delivery.logisticsPartner.name,
        dateAssigned: delivery.dateAssigned,
        assignedBy: delivery.assignedBy,
        logisticsPartnerState: delivery.logisticsPartnerState,
        logisticsPartnerCountry: delivery.logisticsPartnerCountry,
        deliveryCommencementDate: delivery.deliveryCommencementDate,
        transaction: delivery.transaction,
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
  return { deliveries: Object.values(state.onTransitDelivery) };
};

export default connect(mapStateToProps, { fetchOnTransitDeliveries })(
  OnTransitDeliveryList
);
