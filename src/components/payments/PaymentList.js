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
import { fetchPayments } from "../../actions";
import DataGridContainer from "../DataGridContainer";
import PaymentEdit from "./PaymentEdit";
import PaymentDelete from "./PaymentDelete";
import PaymentBooking from "./PaymentBooking";
import PaymentEditForm from "./PaymentEditForm";

class PaymentList extends React.Component {
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
    this.props.fetchPayments(this.props.token, this.props.status);
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
            history.push("/payments/payments"),
          ]}
        >
          <DialogContent>
            <PaymentEditForm
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
            history.push("/payments/payments"),
          ]}
        >
          <DialogContent>
            <PaymentBooking
              token={this.props.token}
              params={this.state.params}
              handleBookPaymentDialogOpenStatus={
                this.handleBookPaymentDialogOpenStatus
              }
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
            history.push(`/payments/payments`),
          ]}
        >
          <DialogContent>
            <PaymentDelete
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
        field: "paymentConfirmationStatus",
        headerName: "Payment Status",
        width: 150,
      },
      { field: "orderNumber", headerName: "Order Number", width: 200 },
      { field: "customerName", headerName: "Customer", width: 200 },
      // {
      //   field: "totalProductAmount",
      //   headerName: "Total Amount",
      //   width: 200,
      // },
      {
        field: "amountPaid",
        headerName: "Amount Paid",
        width: 150,
      },
      { field: "order", headerName: "", width: 0, hide: true },
      { field: "customer", headerName: "", width: 0, hide: true },

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
                history.push(`/payments/payments/edit/${params.id}`),
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
                history.push(`/payments/payments/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    this.props.payments.map((payment, index) => {
      let row = {
        numbering: ++counter,
        id: payment.id,
        refNumber: payment.refNumber,
        orderNumber: payment.order.orderNumber,
        order: payment.order.id,
        vendor: payment.vendor,
        customerName: payment.customer[index].name,
        customer: payment.customer[index].id,
        totalProductAmount: payment.totalProductAmount,
        amountPaid: payment.amountPaid,
        totalDeliveryCost: payment.totalDeliveryCost,
        paymentCurrency: payment.paymentCurrency,
        paymentConfirmationStatus: payment.paymentConfirmationStatus,
        paymentConfirmedBy: payment.paymentConfirmedBy,
        paymentDate: payment.paymentDate,
        datePosted: payment.datePosted,
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
  return { payments: Object.values(state.payment) };
};

export default connect(mapStateToProps, { fetchPayments })(PaymentList);
