import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Toolbar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import history from "../../history";
import VendorList from "../vendors/VendorList";

import CountrySelectField from "./CountrySelectField";
import data from "./../../apis/local";
import VendorsByCountryList from "../vendors/VendorsByCountryList";
import VendorForm from "../vendors/VendorForm";
import LogisticsPartnerCreateForm from "../LogisticsPartner/LogisticsPartnerCreateForm";
import LogisticsPartnerList from "../LogisticsPartner/LogisticsPartnerList";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-30px",
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
    width: 200,
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
  selectField: {
    //marginBottom: 20,
    //marginTop: 20,
    //width: "auto",
  },
}));

function LogisticsPartnerLayout(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const [value, setValue] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [countryList, setCountryList] = useState([{ id: "", name: "" }]);
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    const fetchData = async () => {
      let allData = [{ id: "all", name: "All" }];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpen(false);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleSuccessfulCreateSnackbar = (message) => {
    // history.push("/categories/new");
    setOpen({ open: false });
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message,
      backgroundColor: "#FF3232",
    });
    setOpen({ open: false });
  };

  const renderDataList = () => {
    if (selectedCountry === "all") {
      return <VendorList token={props.token} />;
    } else {
      return (
        <VendorsByCountryList
          token={props.token}
          userId={props.userId}
          selectedCountry={selectedCountry}
        />
      );
    }
  };

  const width = 12;
  console.log("thsi si the country list", countryList);

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
        {/* <Grid item className={classes.selectField}>
          <CountrySelectField
            token={props.token}
            userId={props.userId}
            selectList={countryList}
            selectedCountry={selectedCountry}
            handleCountryChange={handleCountryChange}
          />
        </Grid> */}
        <Grid item className={classes.headerContainer}>
          <Toolbar disableGutters className={classes.toolbar}>
            <Button
              variant="contained"
              className={classes.addButton}
              onClick={() => [
                setOpen(true),
                history.push("/partners/vendors/new"),
              ]}
            >
              Add Logistic Partner
            </Button>
          </Toolbar>
        </Grid>
        <Grid item className={classes.contentContainer}>
          {/* {renderDataList()} */}
          <LogisticsPartnerList token={props.token} userId={props.userId} />
        </Grid>
      </Grid>
      <Dialog
        // style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        disableEnforceFocus={true}
        onClose={() => [setOpen(false), history.push("/partners/vendors")]}
      >
        <DialogContent>
          <LogisticsPartnerCreateForm
            token={props.token}
            userId={props.userId}
            handleDialogOpenStatus={handleDialogOpenStatus}
            handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
            handleFailedSnackbar={handleFailedSnackbar}
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
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: { backgroundColor: alert.backgroundColor },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </Grid>
  );
}

export default LogisticsPartnerLayout;
