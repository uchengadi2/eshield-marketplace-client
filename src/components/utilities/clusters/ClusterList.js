import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Typography from "@material-ui/core/Typography";
import history from "../../../history";
import { fetchClusters } from "../../../actions";
import DataGridContainer from "../../DataGridContainer";
import ClusterEdit from "./ClusterEdit";
import ClusterDelete from "./ClusterDelete";

class ClusterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      blacklistOpen: false,
      id: null,
      params: {},
    };
  }
  componentDidMount() {
    this.props.fetchClusters(this.props.token);
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
          // style={{ zIndex: 1302 }}
          open={this.state.editOpen}
          onClose={() => [
            this.setState({ editOpen: false }),
            history.push("/utilities/clusters"),
          ]}
        >
          <DialogContent>
            <ClusterEdit
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
            history.push(`/utilities/clusters`),
          ]}
        >
          <DialogContent>
            <ClusterDelete
              token={this.props.token}
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
          // style={{ zIndex: 1302 }}
          open={this.state.blacklistOpen}
          onClose={() => [
            this.setState({ blacklistOpen: false }),
            history.push(`/utilities/clusters`),
          ]}
        >
          <DialogContent>
            <Typography>This is the blacklist dialog</Typography>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  renderProductList = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      { field: "numbering", headerName: "S/n", width: 100 },
      { field: "name", headerName: "Cluster Name", width: 200 },
      { field: "city", headerName: "Cluster City", width: 200 },
      { field: "type", headerName: "Location Type", width: 200 },
      { field: "description", headerName: "Description", width: 200 },

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
                history.push(`/utilities/clusters/edit/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
      {
        field: "blacklistaction",
        headerName: "",
        width: 30,
        description: "Blacklist state",
        renderCell: (params) => (
          <strong>
            {/* {params.value.getFullYear()} */}
            <CancelRoundedIcon
              style={{ color: "black" }}
              onClick={() => [
                this.setState({ blacklistOpen: true, id: params.id }),
                history.push(`/utilities/clusters/blacklist/${params.id}`),
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
                history.push(`/utilities/clusters/delete/${params.id}`),
              ]}
            />
          </strong>
        ),
      },
    ];
    this.props.clusters.map((cluster) => {
      let row = {
        numbering: ++counter,
        id: cluster.id,
        name: cluster.name,
        city: cluster.city,
        type: cluster.type,
        description: cluster.description,
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
        {this.renderProductList()}
        {this.renderBlackListDialogForm()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { clusters: Object.values(state.cluster) };
};

export default connect(mapStateToProps, { fetchClusters })(ClusterList);
