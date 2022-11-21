import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import { fetchRemittances } from "../../actions";
import DataGridContainer from "../DataGridContainer";

import RemittanceDelete from "./RemittanceDelete";
import RemittanceEditForm from "./RemittanceEditForm";

class RemittanceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      paymentOpen: false,
      deleteOpen: false,
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
    this.props.fetchRemittances(this.props.token, this.props.status);
  }

  handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ deleteOpen: false });
  };

  handleEditDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ editOpen: false });
  };

  handleBookPaymentDialogOpenStatus = () => {
    // history.push("/categories/new");
    this.setState({ paymentOpen: false });
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
            history.push("/remittances/remittances"),
          ]}
        >
          <DialogContent>
            <RemittanceEditForm
              token={this.props.token}
              params={this.state.params}
              handleEditDialogOpenStatus={this.handleEditDialogOpenStatus}
              handleFailedSnackbar={this.handleFailedSnackbar}
              handleSuccessfulEditSnackbar={this.handleSuccessfulEditSnackbar}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };

  renderPaymentDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.paymentOpen}
          onClose={() => [
            this.setState({ paymentOpen: false }),
            history.push("/remittances/remittances"),
          ]}
        >
          <DialogContent>
            {/* <PaymentBooking
              token={this.props.token}
              params={this.state.params}
              handleBookPaymentDialogOpenStatus={
                this.handleBookPaymentDialogOpenStatus
              }
            /> */}
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
            history.push(`/remittances/remittances`),
          ]}
        >
          <DialogContent>
            <RemittanceDelete
              token={this.props.token}
              id={this.state.id}
              handleDialogOpenStatus={this.handleDialogOpenStatus}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  };
  renderPaymentsList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 100 },
      { field: "refNumber", headerName: "Reference Number", width: 150 },
      {
        field: "remittanceStatus",
        headerName: "Remittance Status",
        width: 150,
      },
      { field: "payment", headerName: "Payment", width: 200, hide: true },
      { field: "vendor", headerName: "Vendor", width: 200, hide: true },
      { field: "paymentRef", headerName: "Payment RefNumber", width: 200 },
      { field: "vendorName", headerName: "Vendor", width: 200 },
      // {
      //   field: "totalProductAmount",
      //   headerName: "Total Amount",
      //   width: 200,
      // },
      {
        field: "amountRemitted",
        headerName: "Amount Remitted",
        width: 150,
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
                this.setState({
                  editOpen: true,
                  id: params.id,
                  params: params.row,
                }),
                history.push(`/remittances/remittances/edit/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      // {
      //   field: "bookpaymentaction",
      //   headerName: "",
      //   width: 30,
      //   description: "Update payment",
      //   renderCell: (params) => (
      //     <strong>
      //       {/* {params.value.getFullYear()} */}
      //       <AttachMoneyIcon
      //         onClick={() => [
      //           this.setState({
      //             paymentOpen: true,
      //             id: params.id,
      //             params: params.row,
      //           }),
      //           history.push(`/payments/payments/bookings/${params.id}`),
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
              style={{ color: "red" }}
              onClick={() => [
                this.setState({ deleteOpen: true, id: params.id }),
                history.push(`/remittances/remittances/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    this.props.remittances.map((remittance, index) => {
      let row = {
        numbering: ++counter,
        id: remittance.id,
        refNumber: remittance.refNumber,
        order: remittance.order,
        vendor: remittance.vendor[index].id,
        vendorName: remittance.vendor[index].name,
        customer: remittance.customer,
        payment: remittance.payment[index].id,
        paymentRef: remittance.payment[index].refNumber,
        remittanceStatus: remittance.remittanceStatus,
        amountRemitted: remittance.amountRemitted,
        totalRemittableAmount: remittance.totalRemittableAmount,
        dateRemitted: remittance.dateRemitted,
        remittanceMethod: remittance.remittanceMethod,
        bankName: remittance.bankName,
        bankAccountNumber: remittance.bankAccountNumber,
        accountTitle: remittance.accountTitle,
        chequeNumber: remittance.chequeNumber,
        bankChequeOwner: remittance.bankChequeOwner,
        postedBy: remittance.postedBy,
        datePosted: remittance.datePosted,
        remittanceCurrency: remittance.remittanceCurrency,
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
        {this.renderPaymentsList()}
        {this.renderPaymentDialogForm()}
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
  return { remittances: Object.values(state.remittance) };
};

export default connect(mapStateToProps, { fetchRemittances })(RemittanceList);
