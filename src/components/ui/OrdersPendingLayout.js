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
import OrdersList from "../orders/OrdersList";
import OrderFormContainer from "../orders/OrderFormContainer";
import SourceCountryDestinationCountryAndCategoryFilters from "./filters/SourceCountryDestinationCountryAndCategoryFilters";
import data from "./../../apis/local";
import OrderByCategoryList from "../orders/OrderByCategoryList";
import OrderByCategoryAndDestinationCountryList from "./../orders/OrderByCategoryAndDestinationCountryList";
import OrderByCategorySourceAndDestinationCountryList from "./../orders/OrderByCategorySourceAndDestinationCountryList";
import OrderBySourceAndDestinationCountryList from "./../orders/OrderBySourceAndDesitinationCountryList";
import OrderBySourceCountryList from "../orders/OrderBySourceCountryList";
import OrderByDestinationCountryList from "./../orders/OrderByDestinationCountryList";
import OrderByCategoryAndSourceCountryList from "../orders/OrderByCategoryAndSourceCountryList";
import OrderForm from "../orders/OrderForm";

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

function OrdersPendingLayout(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const [selectedSourceCountry, setSelectedSourceCountry] = useState("all");
  const [selectedDestinationCountry, setSelectedDestinationCountry] =
    useState("all");
  const [sourceCountryList, setSourceCountryList] = useState([
    { id: "", name: "" },
  ]);
  const [destinationCountryList, setDestinationCountryList] = useState([
    { id: "", name: "" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryList, setCategoryList] = useState([{ id: "", name: "" }]);
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    const fetchSourceCountryData = async () => {
      let allData = [{ id: "all", name: "All" }];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setSourceCountryList(allData);
    };

    //call the function

    fetchSourceCountryData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchDestinationCountryData = async () => {
      let allData = [{ id: "all", name: "All" }];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setDestinationCountryList(allData);
    };

    //call the function

    fetchDestinationCountryData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      let allData = [{ id: "all", name: "All" }];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/categories");
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchCategoryData().catch(console.error);
  }, []);

  const handleDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpen(false);
  };

  const handleSourceCountryChange = (value) => {
    setSelectedSourceCountry(value);
  };

  const handleDestinationCountryChange = (value) => {
    setSelectedDestinationCountry(value);
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

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const status = "pending";

  const renderDataList = () => {
    if (
      selectedSourceCountry === "all" &&
      selectedDestinationCountry === "all" &&
      selectedCategory === "all"
    ) {
      return (
        <OrdersList token={props.token} status={status} userId={props.userId} />
      );
    } else if (
      selectedSourceCountry === "all" &&
      selectedDestinationCountry === "all" &&
      selectedCategory !== "all"
    ) {
      return (
        <OrderByCategoryList
          token={props.token}
          userId={props.userId}
          selectedCategory={selectedCategory}
          status={status}
        />
      );
    } else if (
      selectedSourceCountry === "all" &&
      selectedDestinationCountry !== "all" &&
      selectedCategory !== "all"
    ) {
      return (
        <OrderByCategoryAndDestinationCountryList
          token={props.token}
          userId={props.userId}
          selectedCategory={selectedCategory}
          selectedDestinationCountry={selectedDestinationCountry}
          status={status}
        />
      );
    } else if (
      selectedSourceCountry !== "all" &&
      selectedDestinationCountry !== "all" &&
      selectedCategory !== "all"
    ) {
      return (
        <OrderByCategorySourceAndDestinationCountryList
          token={props.token}
          userId={props.userId}
          selectedCategory={selectedCategory}
          selectedDestinationCountry={selectedDestinationCountry}
          selectedSourceCountry={selectedSourceCountry}
          status={status}
        />
      );
    } else if (
      selectedSourceCountry !== "all" &&
      selectedDestinationCountry !== "all" &&
      selectedCategory === "all"
    ) {
      return (
        <OrderBySourceAndDestinationCountryList
          token={props.token}
          userId={props.userId}
          selectedDestinationCountry={selectedDestinationCountry}
          selectedSourceCountry={selectedSourceCountry}
          status={status}
        />
      );
    } else if (
      selectedSourceCountry !== "all" &&
      selectedDestinationCountry === "all" &&
      selectedCategory === "all"
    ) {
      return (
        <OrderBySourceCountryList
          token={props.token}
          userId={props.userId}
          selectedSourceCountry={selectedSourceCountry}
          status={status}
        />
      );
    } else if (
      selectedSourceCountry === "all" &&
      selectedDestinationCountry !== "all" &&
      selectedCategory === "all"
    ) {
      return (
        <OrderByDestinationCountryList
          token={props.token}
          userId={props.userId}
          selectedDestinationCountry={selectedDestinationCountry}
          status={status}
        />
      );
    } else if (
      selectedSourceCountry !== "all" &&
      selectedDestinationCountry === "all" &&
      selectedCategory !== "all"
    ) {
      return (
        <OrderByCategoryAndSourceCountryList
          token={props.token}
          userId={props.userId}
          selectedCategory={selectedCategory}
          selectedSourceCountry={selectedSourceCountry}
          status={status}
        />
      );
    } else {
      return null;
    }
  };

  const width = 12;

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
          <SourceCountryDestinationCountryAndCategoryFilters
            token={props.token}
            userId={props.userId}
            sourceCountryList={sourceCountryList}
            destinationCountryList={destinationCountryList}
            selectedSourceCountry={selectedSourceCountry}
            selectedDestinationCountry={selectedDestinationCountry}
            handleSourceCountryChange={handleSourceCountryChange}
            handleDestinationCountryChange={handleDestinationCountryChange}
            categoryList={categoryList}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
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
              <Button
                variant="contained"
                className={classes.addButton}
                onClick={() => [setOpen(true), history.push("/orders/new")]}
              >
                Add Order
              </Button>
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
          <OrderForm
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

export default OrdersPendingLayout;
