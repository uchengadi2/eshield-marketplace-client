import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
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

class PaymentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      paymentOpen: false,
      deleteOpen: false,
      id: null,
      params: {},
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

  renderEditDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.editOpen}
          onClose={() => [
            this.setState({ editOpen: false }),
            history.push("/payments"),
          ]}
        >
          <DialogContent>
            <PaymentEdit
              token={this.props.token}
              params={this.state.params}
              handleEditDialogOpenStatus={this.handleEditDialogOpenStatus}
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
            history.push("/payments"),
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
            history.push(`/payments`),
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
      { field: "orderNumber", headerName: "Order Number", width: 200 },
      { field: "paymentStatus", headerName: "Payment Status", width: 200 },
      { field: "customer", headerName: "Customer", width: 200 },
      {
        field: "totalAmountExpected",
        headerName: "Total Amount Expected",
        width: 200,
      },
      {
        field: "totalAmountAlreadyPaid",
        headerName: "Total Amount Already Paid",
        width: 150,
      },
      {
        field: "lastPaymentRound",
        headerName: "Last Payment Round",
        width: 150,
      },
      {
        field: "currentPaymentRound",
        headerName: "Current Payment Round",
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
                history.push(`/payments/edit/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "bookpaymentaction",
        headerName: "",
        width: 30,
        description: "Update payment",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <AttachMoneyIcon
              onClick={() => [
                this.setState({
                  paymentOpen: true,
                  id: params.id,
                  params: params.row,
                }),
                history.push(`/payments/bookings/${params.id}`),
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
                this.setState({ deleteOpen: true, id: params.id }),
                history.push(`/payments/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    this.props.payments.map((payment) => {
      let row = {
        numbering: ++counter,
        id: payment.id,
        orderNumber: payment.order,
        vendor: payment.vendor,
        customer: payment.customer,
        totalAmountExpected: payment.totalAmountExpected,
        totalAmountAlreadyPaid: payment.totalAmountAlreadyPaid,
        lastPaymentAmountMade: payment.lastPaymentAmountMade,
        lastPaymentRound: payment.lastPaymentRound,
        currentPaymentRound: payment.currentPaymentRound,
        startingPaymentDate: payment.startingPaymentDate,
        lastPaymentDate: payment.lastPaymentDate,
        agreedPaymentCurrency: payment.agreedPaymentCurrency,
        preferredPaymentCurrency: payment.preferredPaymentCurrency,
        paymentStatus: payment.paymentStatus,
        percentageForInitialPayment: payment.percentageForInitialPayment,
        percentageForSecondPayment: payment.percentageForSecondPayment,
        percentageForThirdPayment: payment.percentageForThirdPayment,
        initialPaymentAmountExpected:
          payment.paymentBreakdown.initialPaymentInstallment
            .initialPaymentAmountExpected,
        initialPaymentAmountPaid:
          payment.paymentBreakdown.initialPaymentInstallment
            .initialPaymentAmountPaid,
        dateInitialPaymentWasMade:
          payment.paymentBreakdown.initialPaymentInstallment
            .dateInitialPaymentWasMade,
        initialPaymentStatus:
          payment.paymentBreakdown.initialPaymentInstallment
            .initialPaymentStatus,
        secondPaymentAmountExpected:
          payment.paymentBreakdown.secondInstallmentPayment
            .secondPaymentAmountExpected,
        secondPaymentAmountPaid:
          payment.paymentBreakdown.secondInstallmentPayment
            .secondPaymentAmountPaid,
        dateSecondPaymentWasMade:
          payment.paymentBreakdown.secondInstallmentPayment
            .dateSecondPaymentWasMade,
        secondPaymentStatus:
          payment.paymentBreakdown.secondInstallmentPayment.secondPaymentStatus,
        thirdPaymentAmountExpected:
          payment.paymentBreakdown.thirdInstallmentPayment
            .thirdPaymentAmountExpected,
        thirdPaymentAmountPaid:
          payment.paymentBreakdown.thirdInstallmentPayment
            .thirdPaymentAmountPaid,
        thirdSecondPaymentWasMade:
          payment.paymentBreakdown.thirdInstallmentPayment
            .thirdSecondPaymentWasMade,
        thirdPaymentStatus:
          payment.paymentBreakdown.thirdInstallmentPayment.thirdPaymentStatus,
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { payments: Object.values(state.payment) };
};

export default connect(mapStateToProps, { fetchPayments })(PaymentList);
