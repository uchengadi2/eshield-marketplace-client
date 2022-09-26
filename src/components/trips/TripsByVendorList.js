import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import DataGridContainer from "../DataGridContainer";
// import OrdersEdit from "./OrdersEdit";
// import OrderDelete from "./OrdersDelete";
import data from "./../../apis/local";

function TripsByVendorList(props) {
  const [tripList, setTripList] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [blacklistOpen, setBlacklistOpen] = useState(false);
  const [id, setId] = useState(null);
  const [params, setParams] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/orderdeliveries", {
        params: { vendor: props.selectedVendor, deliveryStatus: props.status },
      });

      const workingData = response.data.data.data;
      workingData.map((trip) => {
        allData.push(trip);
      });

      setTripList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  const handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    setDeleteOpen(false);
  };

  const handleEditDialogOpenStatus = () => {
    // history.push("/categories/new");
    setEditOpen(editOpen);
  };

  const renderEditDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={editOpen}
          onClose={() => [setEditOpen(false), history.push("/trips")]}
        >
          <DialogContent>
            {/* <OrdersEdit
              token={props.token}
              params={params}
              handleEditDialogOpenStatus={handleEditDialogOpenStatus}
            /> */}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderDeleteDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={deleteOpen}
          onClose={() => [setDeleteOpen(false), history.push(`/trips`)]}
        >
          <DialogContent>
            {/* <OrderDelete
              token={props.token}
              id={id}
              handleDialogOpenStatus={handleDialogOpenStatus}
            /> */}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderCancelDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={cancelOpen}
          onClose={() => [setCancelOpen(false), history.push(`/trips`)]}
        >
          <DialogContent>
            <Typography>This is the cancel dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderAssignOrderDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={assignOpen}
          onClose={() => [setAssignOpen(false), history.push(`/trips`)]}
        >
          <DialogContent>
            {/* <OrderAssignmentFormContainer /> */}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderOrdersList = () => {
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
                // this.setState({
                //   editOpen: true,
                //   id: params.id,
                //   params: params.row,
                // }),
                setEditOpen(true),
                setId(params.id),
                setParams(params.row),
                history.push(`/orders/edit/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "cancelorder",
        headerName: "",
        width: 30,
        description: "Cancel Order",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <CancelRoundedIcon
              style={{ color: "black" }}
              onClick={() => [
                setCancelOpen(true),
                setId(params.id),
                history.push(`/orders/cancel/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "assignorder",
        headerName: "",
        width: 30,
        description: "Assign Order",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <AssignmentIcon
              style={{ color: "black" }}
              onClick={() => [
                setAssignOpen(true),
                setId(params.id),
                history.push(`/orders/assign/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "deleteaction",
        headerName: "",
        width: 30,
        description: "Delete row",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <DeleteRoundedIcon
              style={{ color: "red" }}
              onClick={() => [
                // this.setState({ deleteOpen: true, id: params.id }),
                setDeleteOpen(true),
                setId(params.id),
                history.push(`/orders/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    tripList.map((trip) => {
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

  return (
    <>
      {renderDeleteDialogForm()}
      {renderEditDialogForm()}
      {renderOrdersList()}
      {renderCancelDialogForm()}
      {renderAssignOrderDialogForm()}
    </>
  );
}

export default TripsByVendorList;
