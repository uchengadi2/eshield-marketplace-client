import React from "react";
import { connect } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import history from "./../../history";

class ProductListByCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  render() {
    return (
      <>
        <Dialog //style={{ zIndex: 1302 }}
          open={this.state.open}
          onClose={() => [
            this.state({ open: false }),
            history.push("/products"),
          ]}
        >
          <DialogContent>
            <Alert
              severity="warning"
              action={[
                // <Button
                //   variant="contained"
                //   color="inherit"
                //   size="small"
                // //   onClick={handleDelete}
                // >
                //   Yes
                // </Button>,
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  //   onClick={handleNoDelete}
                  style={{ marginLeft: 10 }}
                >
                  Cancel
                </Button>,
              ]}
            >
              <AlertTitle>Country</AlertTitle>
              Please select a country
            </Alert>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default ProductListByCountry;
