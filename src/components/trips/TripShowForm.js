import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Typography } from "@mui/material";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import data from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 180,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function TripShowForm(props) {
  const classes = useStyles();
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [params, setParams] = useState({});
  const [selectedState, setSelectedState] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/orderdeliveries/${props.params.id}`);
      const workingData = Object.values(response.data.data);
      let row = {};
      workingData.map((trip) => {
        console.log("this is the trips:", trip);
        row = {
          id: trip.id,
          orderNumber: trip.order,
          vendor: trip.vendor,
          dateCommenced: trip.dateCommenced,
          dateFullfilled: trip.dateFullfilled,
          deliveryStatus: trip.deliveryStatus,
          scheduledBy: trip.scheduledBy,
          fullfilledBy: trip.fullfilledBy,
          teamLeadName: trip.teamLead.name,
          teamLeadPhoneNumber: trip.teamLead.PhoneNumber,
          teamLeadDesignation: trip.teamLead.designation,
        };
      });
      setParams(row);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const handleSelectedStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSelectedCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setStateList([]);
  };

  //get all country list
  const renderCountryList = () => {
    return countryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get all state list
  const renderStateList = () => {
    return stateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //   const dateToYMD = (date) => {
  //     var d = date.getDate();
  //     var m = date.getMonth() + 1; //Month from 0 to 11
  //     var y = date.getFullYear();
  //     return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  //   };

  //   console.log(
  //     "just testing the date funstion:",
  //     dateToYMD(params.dateCommenced)
  //   );

  const renderAssignedOrderNumberField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        helperText="Order Number"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.orderNumber}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderDateTripCommencedField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        helperText="Date Trip Commenced"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.dateCommenced}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderDateTripFullfiledField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Trip completion date"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.dateFullfilled}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderAssignedVendorField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Vendor Name"
        variant="outlined"
        label={label}
        id={input.name}
        value={params.vendor}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderDeliveryStatusField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Delivery Status"
        label={label}
        id={input.name}
        value={params.deliveryStatus}
        fullWidth
        type={type}
        // multiline={true}
        // minRows={5}
        {...custom}
        // onChange={handleInput}
      />
    );
  };

  const renderScheduledByField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Trip Scheduled By"
        label={label}
        id={input.name}
        value={params.scheduledBy}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        // multiline={true}
        // minRows={5}
        {...custom}
        //onChange={handleInput}
      />
    );
  };

  const renderFullfilledByField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        // placeholder="category description"
        variant="outlined"
        helperText="Trip Fullfilled By"
        label={label}
        id={input.name}
        value={params.fullfilledBy}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        // multiline={true}
        // minRows={5}
        {...custom}
        // onChange={handleInput}
      />
    );
  };

  const renderTripTeamLeadField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Trip Team Lead"
        label={label}
        id={input.name}
        value={params.teamLeadName}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        // multiline={true}
        // minRows={5}
        {...custom}
        //onChange={handleInput}
      />
    );
  };

  const renderTripTeamLeadDesignationField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Trip Team Lead Designation"
        label={label}
        id={input.name}
        value={params.teamLeadDesignation}
        fullWidth
        type={type}
        style={{ marginTop: 20 }}
        // multiline={true}
        // minRows={5}
        {...custom}
        //onChange={handleInput}
      />
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Trip Details
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="tripShowFormForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 420,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Grid container direction="row">
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="orderNumber"
              name="orderNumber"
              type="text"
              component={renderAssignedOrderNumberField}
            />
          </Grid>
          <Grid item style={{ width: "68%", marginLeft: 10 }}>
            <Field
              label=""
              id="vendor"
              name="vendor"
              type="text"
              component={renderAssignedVendorField}
            />
          </Grid>
        </Grid>

        <Grid container direction="row" style={{ marginTop: 30 }}>
          <Grid item style={{ width: "36%" }}>
            <Field
              label=""
              id="dateCommenced"
              name="dateCommenced"
              type="date"
              component={renderDateTripCommencedField}
            />
          </Grid>
          <Grid item style={{ width: "30%", marginLeft: 10 }}>
            <Field
              label=""
              id="dateFullfilled"
              name="dateFullfilled"
              type="date"
              component={renderDateTripFullfiledField}
            />
          </Grid>
          <Grid item style={{ width: "30%", marginLeft: 10 }}>
            <Field
              label=""
              id="deliveryStatus"
              name="deliveryStatus"
              type="text"
              component={renderDeliveryStatusField}
            />
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item style={{ width: "49%" }}>
            <Field
              label=""
              id="scheduledBy"
              name="scheduledBy"
              type="text"
              component={renderScheduledByField}
            />
          </Grid>
          <Grid item style={{ width: "49%", marginLeft: 10 }}>
            <Field
              label=""
              id="fullfilledBy"
              name="fullfilledBy"
              type="text"
              component={renderFullfilledByField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="teamLeadName"
              name="teamLeadName"
              type="text"
              component={renderTripTeamLeadField}
            />
          </Grid>
          <Grid item style={{ width: "38%", marginLeft: 10 }}>
            <Field
              label=""
              id="teamLeadDesignation"
              name="teamLeadDesignation"
              type="text"
              component={renderTripTeamLeadDesignationField}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Close View
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "tripShowFormForm",
})(TripShowForm);
