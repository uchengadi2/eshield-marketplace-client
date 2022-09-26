import React from "react";
import { connect } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import history from "../../../history";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fetchCluster, deleteCluster } from "../../../actions";

class ClusterDelete extends React.Component {
  componentDidMount() {
    // console.log("the item id is:", this.props.id);
    // console.log("the token is:", this.props.token);
  }

  render() {
    const handleDelete = () => {
      this.props.deleteCluster(this.props.id, this.props.token);
      this.props.handleDialogOpenStatus();
    };

    const handleNoDelete = () => {
      this.props.handleDialogOpenStatus();
      history.push("/utilities/clusters");
    };
    return (
      <>
        {/* <Alert onClose={() => {}}>This is a success alert — check it out!</Alert> */}

        <Alert
          severity="warning"
          action={[
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={handleDelete}
            >
              Yes
            </Button>,
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={handleNoDelete}
              style={{ marginLeft: 10 }}
            >
              No
            </Button>,
          ]}
        >
          <AlertTitle>Delete Cluster?</AlertTitle>
          Are you sure you want to delete this cluster?
        </Alert>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { cluster: state.cluster[ownProps.match.params.id] };
};

export default connect(null, { fetchCluster, deleteCluster })(ClusterDelete);
