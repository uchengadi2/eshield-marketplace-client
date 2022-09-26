import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import { fetchTrips } from "../../actions";
import DataGridContainer from "../DataGridContainer";
// import OrderAssignmentFormContainer from "./../OrderAssignmentFormContainer";
// import OrdersEdit from "./OrdersEdit";
// import OrderDelete from "./OrdersDelete";
import TripShow from "./TripShow";

class TripPendingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      cancelOpen: false,
      assignOpen: false,
      id: null,
      params: {},
    };
  }
  componentDidMount() {
    this.props.fetchTrips(this.props.token, this.props.status);
  }

  handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ deleteOpen: false });
  };

  handleEditDialogOpenStatus = () => {
    // history.push("/categories/new");
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
            history.push("/trips"),
          ]}
        >
          <DialogContent>
            <TripShow
              token={this.props.token}
              params={this.state.params}
              handleEditDialogOpenStatus={this.handleEditDialogOpenStatus}
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
            history.push(`/trips`),
          ]}
        >
          {/* <DialogContent>
            <OrderDelete
              token={this.props.token}
              id={this.state.id}
              handleDialogOpenStatus={this.handleDialogOpenStatus}
            />
          </DialogContent> */}
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
            history.push(`/trips`),
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
            history.push(`/trips`),
          ]}
        >
          <DialogContent>
            {/* <OrderAssignmentFormContainer /> */}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderOrdersList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 60 },
      {
        field: "assignedOrders",
        headerName: "Order Assignment Id",
        width: 150,
      },
      { field: "order", headerName: "Order", width: 200 },
      { field: "vendor", headerName: "Vendor", width: 200 },
      { field: "deliveryStatus", headerName: "Trip Status", width: 100 },
      { field: "teamLead", headerName: "Team Lead", width: 150 },
      { field: "dateCommenced", headerName: "Commencement Date", width: 150 },
      { field: "dateFullfilled", headerName: "Fullfillment State", width: 150 },

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
                history.push(`/trips/edit/${params.id}`),
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
      //           history.push(`/trips/cancel/${params.id}`),
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
      //           history.push(`/trips/assign/${params.id}`),
      //         ]}
      //       />
      //     </strong>
      //   ),
      // },
      // {
      //   field: "deleteaction",
      //   headerName: "",
      //   width: 30,
      //   description: "Delete row",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
      //       <DeleteRoundedIcon
      //         style={{ color: "red" }}
      //         onClick={() => [
      //           this.setState({ deleteOpen: true, id: params.id }),
      //           history.push(`/trips/delete/${params.id}`),
      //         ]}
      //       />
      //     </strong>
      //   ),
      // },
    ];
    this.props.trips.map((trip) => {
      console.log("these are the orderrrrnew:", trip);
      let row = {
        numbering: ++counter,
        id: trip.id,
        assignedOrders: trip.assignedOrders,
        order: trip.order,
        vendor: trip.vendor,
        deliveryStatus: trip.deliveryStatus,
        teamLead: trip.teamLead.name,
        dateCommenced: trip.dateCommenced,
        dateFullfilled: trip.dateFullfilled,
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("this is the statewwww:", state);
  return { trips: Object.values(state.trip) };
};

export default connect(mapStateToProps, { fetchTrips })(TripPendingList);
