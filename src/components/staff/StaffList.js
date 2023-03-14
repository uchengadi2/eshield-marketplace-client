import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Typography from "@material-ui/core/Typography";
import history from "../../../../history";
import { fetchUsers } from "../../../../actions";
import DataGridContainer from "../../../DataGridContainer";
import StaffEditForm from "./StaffEditForm";
import StaffDelete from "./StaffDelete";

class StaffList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      blacklistOpen: false,
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
    this.props.fetchUsers(this.props.token);
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
            history.push("/crm/users/staffers"),
          ]}
        >
          <DialogContent>
            <StaffEditForm
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
            history.push(`/crm/users/staffers`),
          ]}
        >
          <DialogContent>
            <StaffDelete
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

  renderBlackListDialogForm = () => {
    //token will be used here
    return (
      <>
        <Dialog
          //style={{ zIndex: 1302 }}
          open={this.state.blacklistOpen}
          onClose={() => [
            this.setState({ blacklistOpen: false }),
            history.push(`/crm/users/staffers`),
          ]}
        >
          <DialogContent>
            <Typography>This is the blacklist dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  renderCitiesList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 100 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "role", headerName: "Role", width: 100 },
      { field: "userType", headerName: "User Type", width: 100 },
      { field: "serviceOutlet", headerName: "Service Outlet", width: 200 },
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
                history.push(`/crm/users/staffers/edit/${params.id}`),
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
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => [
                this.setState({ deleteOpen: true, id: params.id }),
                history.push(`/crm/users/staffers/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];

    this.props.users.map((user) => {
      let row = {
        numbering: ++counter,
        id: user._id,
        name: user.name,
        role: user.role,
        serviceOutlet: user.serviceOutlet,
        userType: user.userType,
        email: user.email,
        staffNumber: user.staffNumber,
        gender: user.gender,
        maritalStatus: user.maritalStatus,
        dateOfBirth: user.dateOfBirth,
        highestLevelOfEducationAttained: user.highestLevelOfEducationAttained,
        courseOfStudy: user.courseOfStudy,
        references: user.references,
        houseAddress: user.houseAddress,
        nextOfKinName: user.nextOfKinName,
        nextOfKinAddress: user.nextOfKinAddress,
        nextOfKinRelationship: user.nextOfKinRelationship,
        guarantorName: user.guarantorName,
        guarantorAddress: user.guarantorAddress,
        guarantorGender: user.guarantorGender,
        guarantorRelationship: user.guarantorRelationship,
        photo: user.photo,
        memo: user.memo,
        phoneNumbers: user.phoneNumbers,
        nextOfKinPhoneNumbers: user.nextOfKinPhoneNumbers,
        guarantorPhoneNumbers: user.guarantorPhoneNumbers,
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
        {this.renderCitiesList()}
        {this.renderBlackListDialogForm()}
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
  return { users: Object.values(state.user) };
};

export default connect(mapStateToProps, { fetchUsers })(StaffList);
