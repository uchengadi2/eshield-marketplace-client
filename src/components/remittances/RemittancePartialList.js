import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Typography from "@material-ui/core/Typography";
import history from "../../history";
import { fetchPartialRemittances } from "../../actions";
import DataGridContainer from "../DataGridContainer";
import RemittanceEdit from "./RemittanceEdit";
import RemittanceDelete from "./RemittanceDelete";

class RemittancePartialList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      id: null,
      params: {},
    };
  }
  componentDidMount() {
    this.props.fetchPartialRemittances(this.props.token, this.props.status);
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
            history.push("/remittances/partial"),
          ]}
        >
          <DialogContent>
            <RemittanceEdit
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
          // style={{ zIndex: 1302 }}
          open={this.state.deleteOpen}
          onClose={() => [
            this.setState({ deleteOpen: false }),
            history.push(`/remittances/partial`),
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
  renderPartialRemittancesList = () => {
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
                this.setState({
                  editOpen: true,
                  id: params.id,
                  params: params.row,
                }),
                history.push(`/remittances/partial/edit/${params.id}`),
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
                history.push(`/remittances/partial/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    this.props.remittances.map((remittance) => {
      console.log("thii is the list remittance:", remittance);
      let row = {
        id: remittance.id,
        orderNumber: remittance.order[0],
        vendor: remittance.vendor[0],
        payment: remittance.payment[0],
        prevailingBaseCurrency: remittance.prevailingBaseCurrency,
        generalRemittanceStatus: remittance.generalRemittanceStatus,
        paymentPhase: remittance.paymentPhase,
        agreedRemittanceCurrency:
          remittance.remittance.agreedRemittanceCurrency[0],
        agreedRemittanceBaseExchangeRate:
          remittance.remittance.agreedRemittanceBaseExchangeRate,
        paymentRemittanceDate: remittance.remittance.paymentRemittanceDate,
        totalAmountExpectedForRemittance:
          remittance.remittance.totalAmountExpectedForRemittance,
        actualAmountRemitted: remittance.remittance.actualAmountRemitted,
        remittanceStatus: remittance.remittance.remittanceStatus,
        agreedRetentionCurrency:
          remittance.retention.agreedRetentionCurrency[0],
        agreedRetentionBaseExchangeRate:
          remittance.retention.agreedRetentionBaseExchangeRate,
        paymentRetentionDate: remittance.retention.paymentRetentionDate,
        totalAmountExpectedForRetention:
          remittance.retention.totalAmountExpectedForRetention,
        amountRetained: remittance.retention.amountRetained,
        retentionStatus: remittance.retention.retentionStatus,
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
        {this.renderPartialRemittancesList()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { remittances: Object.values(state.remittancePartial) };
};

export default connect(mapStateToProps, { fetchPartialRemittances })(
  RemittancePartialList
);
