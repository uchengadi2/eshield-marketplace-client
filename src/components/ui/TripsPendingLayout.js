import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Toolbar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import history from "../../history";
import OrdersList from "../orders/OrdersList";
import OrderFormContainer from "../orders/OrderFormContainer";
import CountryVendorSelectFields from "./CountryVendorSelectFields";
import data from "./../../apis/local";
import TripPendingList from "./../trips/TripPendingList";
import TripsByVendorList from "../trips/TripsByVendorList";
import VendorSelectFilter from "./filters/VendorSelectFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-80px",
    width: 1100,
  },
  headerContainer: {
    height: 20,
    marginTop: 10,
    height: 40,
  },
  secondContainer: {
    // backgroundColor: "red",
    marginTop: 30,
    padding: 10,
    display: "none",
  },
  contentContainer: {
    // backgroundColor: "#ccab",
    height: "auto",
  },
  addButton: {
    borderRadius: 10,
    height: 30,
    width: 130,
    marginLeft: 10,
    marginTop: 2,
    marginBottom: 5,
    fontSize: "0.75rem",
    backgroundColor: theme.palette.common.orange,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.grey,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
  toolbar: {
    padding: 5,
    margin: -10,
  },
}));

function TripsPendingLayout(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [vendorList, setVendorList] = useState([{ id: "", name: "" }]);
  const [countryVendorList, setCountryVendorList] = useState([]);
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    const fetchVendorData = async () => {
      let allData = [{ id: "all", name: "All" }];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/vendors");
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
      });
      setVendorList(allData);
    };

    //call the function

    fetchVendorData().catch(console.error);
  }, []);

  const handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpen(false);
  };

  const handleVendorChange = (value) => {
    setSelectedVendor(value);
    console.log("the selected vendor iseeeeeeeettt:", selectedVendor);
  };

  const status = "pending";

  console.log("the vendor list is:", vendorList);

  const width = 12;

  const renderDataList = () => {
    if (selectedVendor === "all") {
      return (
        <TripPendingList
          token={props.token}
          selectedVendor={selectedVendor}
          status={status}
        />
      );
    } else {
      return (
        <TripsByVendorList
          token={props.token}
          selectedVendor={selectedVendor}
          status={status}
        />
      );
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={classes.root}
      spacing={2}
    >
      <Grid item container direction="column" sm={width}>
        <Grid item className={classes.selectField}>
          <VendorSelectFilter
            token={props.token}
            vendorList={vendorList}
            selectedVendor={selectedVendor}
            handleVendorChange={handleVendorChange}
            // countryVendorList={countryVendorList}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.headerContainer}
        >
          <Toolbar disableGutters className={classes.toolbar}>
            <Grid item>
              {/* <Button
                variant="contained"
                className={classes.addButton}
                onClick={() => [setOpen(true), history.push("/orders/new")]}
              >
                Add Order
              </Button> */}
            </Grid>
            <Grid item></Grid>
          </Toolbar>
        </Grid>
        <Grid item className={classes.contentContainer}>
          {renderDataList()}
          {/* <DataGridText /> */}
        </Grid>
      </Grid>
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        onClose={() => [setOpen(false), history.push("/orders")]}
      >
        <DialogContent>
          <OrderFormContainer
            token={props.token}
            handleDialogOpenStatus={handleDialogOpenStatus}
          />
        </DialogContent>
      </Dialog>
      <Grid
        item
        container
        // sm={12 - width}
        direction="column"
        className={classes.secondContainer}
        justifyContent="center"
      >
        <Grid item>
          <Typography>This is the secong Inner Container</Typography>
        </Grid>
        <Grid item>
          <Typography>This is the third Inner Container</Typography>
        </Grid>
        <Grid item>
          <Typography>This is the fourth Inner Container</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TripsPendingLayout;
