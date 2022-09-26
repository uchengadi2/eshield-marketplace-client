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

function RemittanceByVendorList(props) {
  const [remittanceList, setRemittanceList] = useState([]);
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
      const response = await data.get("/remittances", {
        params: {
          vendor: props.selectedVendor,
          generalRemittanceStatus: props.status,
        },
      });

      const workingData = response.data.data.data;
      workingData.map((payment) => {
        allData.push(payment);
      });

      setRemittanceList(allData);
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
          onClose={() => [setEditOpen(false), history.push("/remittances")]}
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
          onClose={() => [setDeleteOpen(false), history.push(`/remittances`)]}
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
          onClose={() => [setCancelOpen(false), history.push(`/remittances`)]}
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
          onClose={() => [setAssignOpen(false), history.push(`/remittances`)]}
        >
          <DialogContent>
            {/* <OrderAssignmentFormContainer /> */}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderRemittancesList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 70 },
      { field: "id", headerName: "Remittance Id", width: 200 },
      { field: "orderNumber", headerName: "Order Number", width: 200 },

      {
        field: "payment",
        headerName: "Payment",
        width: 200,
      },

      {
        field: "vendor",
        headerName: "Vendor",
        width: 200,
      },
      {
        field: "generalRemittanceStatus",
        headerName: "General Remittance Status",
        width: 200,
      },
      {
        field: "paymentPhase",
        headerName: "Payment Phase",
        width: 200,
      },
      {
        field: "prevailingBaseCurrency",
        headerName: "Base Currency",
        width: 200,
      },
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
                history.push(`/remittances/edit/${params.id}`),
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
                history.push(`/remittances/cancel/${params.id}`),
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
                history.push(`/remittances/assign/${params.id}`),
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
                history.push(`/remittances/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    remittanceList.map((remittance) => {
      let row = {
        numbering: ++counter,
        id: remittance.id,
        orderNumber: remittance.order,
        vendor: remittance.vendor,

        payment: remittance.payment,
        generalRemittanceStatus: remittance.generalRemittanceStatus,
        paymentPhase: remittance.paymentPhase,
        prevailingBaseCurrency: remittance.prevailingBaseCurrency,
      };
      rows.push(row);
    });

    return <DataGridContainer columns={columns} rows={rows} />;
  };

  return (
    <>
      {renderDeleteDialogForm()}
      {renderEditDialogForm()}
      {renderRemittancesList()}
      {renderCancelDialogForm()}
      {renderAssignOrderDialogForm()}
    </>
  );
}

export default RemittanceByVendorList;
