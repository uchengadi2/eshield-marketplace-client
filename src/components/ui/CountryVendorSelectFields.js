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
    marginTop: 20,
  },
  formStyles: {
    width: 550,
  },
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 150,
    marginTop: 20,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 80,
    marginLeft: 20,
    marginTop: 15,
    // marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
    accountType: {
      minWidth: 150,
      marginTop: 30,
    },
    formSectionHeader: {
      color: theme.palette.common.blue,
    },
  },
}));

function CountryVendorSelectField(props) {
  const classes = useStyles();
  const [country, setCountry] = useState();
  const [vendor, setVendor] = useState();
  const [countryVendorList, setCountryVendorList] = useState([]);

  // useEffect(() => {
  //   setCountry(props.selectedCountry);
  //   // setVendor(props.selectedVendor);
  //   if (props.selectedCountry !== "all") {
  //     props.handleCountryChange(props.selectedCountry);
  //   }

  //   //props.handleVendorChange(props.selectedVendor);
  // }, []);

  // useEffect(() => {
  //   setCountry(props.selectedCountry);
  //   // setVendor(props.selectedVendor);
  //   if (props.selectedCountry !== "all") {
  //     props.handleCountryChange(props.selectedCountry);
  //   }
  //   //props.handleVendorChange(props.selectedVendor);
  // }, [props.selectedCountry]);

  // useEffect(() => {
  //   setVendor(props.selectedVendor);
  //   props.handleVendorChange(props.selectedVendor);
  // }, [props.selectedVendor]);

  useEffect(() => {
    // setVendor(props.selectedVendor);
    // props.handleVendorChange(props.selectedVendor);
    const fetchData = async () => {
      let allData = [{ id: "all", name: "All" }];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/vendors", {
        params: { vendorCountry: props.selectedCountry },
      });

      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push(vendor);
      });

      setCountryVendorList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props.selectedCountry]);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    props.handleCountryChange(event.target.value);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
    props.handleVendorChange(event.target.value);
  };

  const renderItemList = () => {
    return props.selectList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const selectAllVendors = () => {
    return props.vendorList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const selectCountryVendorList = () => {
    return countryVendorList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderVendorList = () => {
    if (props.selectedCountry === "all" && props.selectedVendor === "all") {
      return selectAllVendors();
    } else {
      return selectCountryVendorList();
    }
  };

  const renderCountryField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <FormHelperText style={{ marginLeft: 20 }}>
            Select Country
          </FormHelperText>
          <Select
            labelId="country"
            id="country"
            value={props.selectedCountry}
            // onChange={props.handleCountryChange}
            onChange={handleCountryChange}
            label="Country"
            style={{ width: 300, marginLeft: 10, height: 40 }}
          >
            {renderItemList()}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const renderVendorField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <FormHelperText style={{ marginLeft: 20 }}>
            Select Vendor
          </FormHelperText>
          <Select
            labelId="vendor"
            id="vendor"
            value={props.selectedVendor}
            // onChange={props.handleCountryChange}
            onChange={handleVendorChange}
            label="Vendor"
            style={{ width: 300, marginLeft: 10, height: 40 }}
          >
            {renderVendorList()}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (event) => {
    //props.onSubmit(formValues);
    handleVendorChange(event.target.value);
    console.log("these is the selected counry:", props.selectedCountry);
    console.log("these are the selected vendor:", props.selectedVendor);
  };

  return (
    <div className={classes.root}>
      <form id="selectForm" className={classes.formStyles}>
        <Box
          sx={{
            width: 1000,
            height: 50,
          }}
          noValidate
          autoComplete="off"
        >
          <Grid
            container
            direction="row"
            //style={{ marginTop: 20 }}
            //justifyContent="center"
            //style={{ width: 1000 }}
          >
            <Grid item>
              <Field
                label=""
                id="country"
                name="country"
                type="text"
                component={renderCountryField}
                autoComplete="off"
                //style={{ marginTop: 20 }}
              />
            </Grid>
            <Grid item>
              <Field
                label=""
                id="vendor"
                name="vendor"
                type="text"
                component={renderVendorField}
                autoComplete="off"
                //style={{ marginTop: 20 }}
              />
            </Grid>
            <Grid item>
              {/* <Button
                variant="contained"
                className={classes.submitButton}
                // onClick={props.handleSubmit(onSubmit)}
                onClick={onSubmit}
              >
                Go
              </Button> */}
            </Grid>
            {/* </Grid> */}
          </Grid>
        </Box>
      </form>
    </div>
  );
}

export default reduxForm({
  form: "selectForm",
})(CountryVendorSelectField);
