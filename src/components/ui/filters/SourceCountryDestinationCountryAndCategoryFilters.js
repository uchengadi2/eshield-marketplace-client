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
import data from "./../../../apis/local";

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

function SourceCountryDestinationCountryAndCategoryFilters(props) {
  const classes = useStyles();
  const [sourceCountry, setSourceCountry] = useState();
  const [destinationCountry, setDestinationCountry] = useState();
  const [category, setCategory] = useState();
  const [countryVendorList, setCountryVendorList] = useState([]);

  useEffect(() => {
    setSourceCountry(props.selectedSourceCountry);
    // setVendor(props.selectedVendor);
    props.handleSourceCountryChange(props.selectedSourceCountry);
    //props.handleVendorChange(props.selectedVendor);
  }, [props.selectedSourceCountry]);

  useEffect(() => {
    setDestinationCountry(props.selectedDestinationCountry);
    // setVendor(props.selectedVendor);
    props.handleDestinationCountryChange(props.selectedDestinationCountry);
    //props.handleVendorChange(props.selectedVendor);
  }, [props.selectedDestinationCountry]);

  useEffect(() => {
    setCategory(props.selectedCategory);
    props.handleCategoryChange(props.selectedCategory);
  }, [props.selectedCategory]);

  //   useEffect(() => {
  //     // setVendor(props.selectedVendor);
  //     // props.handleVendorChange(props.selectedVendor);
  //     const fetchData = async () => {
  //       let allData = [{ id: "all", name: "All" }];
  //       data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
  //       const response = await data.get("/vendors", {
  //         params: { vendorCountry: props.selectedCountry },
  //       });

  //       const workingData = response.data.data.data;
  //       workingData.map((vendor) => {
  //         allData.push(vendor);
  //       });

  //       setCountryVendorList(allData);
  //     };

  //     //call the function

  //     fetchData().catch(console.error);
  //   }, [props.selectedCountry]);

  const handleSourceCountryChange = (event) => {
    setSourceCountry(event.target.value);
    props.handleSourceCountryChange(event.target.value);
  };

  const handleDestinationCountryChange = (event) => {
    setDestinationCountry(event.target.value);
    props.handleDestinationCountryChange(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    props.handleCategoryChange(event.target.value);
  };

  const renderSourceCountryList = () => {
    return props.sourceCountryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderDestinationCountryList = () => {
    return props.destinationCountryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderCategoryList = () => {
    return props.categoryList.map((item) => {
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

  //   const renderCategoryList = () => {
  //     if (
  //       props.selectedSourceCountry === "all" &&
  //       props.selectedDestinationCountry === "all" &&
  //       props.selectedCategory === "all"
  //     ) {
  //       return selectAllCategories();
  //     } else {
  //       //   return selectCountryVendorList();
  //       return null;
  //     }
  //   };

  const renderSourceCountryField = ({
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
            Select Source Country
          </FormHelperText>
          <Select
            labelId="sourceCountry"
            id="sourceCountry"
            value={props.selectedSourceCountry}
            // onChange={props.handleCountryChange}
            onChange={handleSourceCountryChange}
            label="Source Country"
            style={{ width: 300, marginLeft: 10, height: 40 }}
          >
            {renderSourceCountryList()}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const renderDestinationCountryField = ({
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
            Select Destinstion Country
          </FormHelperText>
          <Select
            labelId="destinationCountry"
            id="destinationCountry"
            value={props.selectedDestinationCountry}
            // onChange={props.handleCountryChange}
            onChange={handleDestinationCountryChange}
            label="Destination Country"
            style={{ width: 300, marginLeft: 10, height: 40 }}
          >
            {renderDestinationCountryList()}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const renderCategoryField = ({
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
            Select Category
          </FormHelperText>
          <Select
            labelId="category"
            id="category"
            value={props.selectedCategory}
            // onChange={props.handleCountryChange}
            onChange={handleCategoryChange}
            label="Category"
            style={{ width: 300, marginLeft: 10, height: 40 }}
          >
            {renderCategoryList()}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (event) => {
    //props.onSubmit(formValues);
    handleCategoryChange(event.target.value);
  };

  return (
    <div className={classes.root}>
      <form
        id="SourceCountryDestinationCountryAndCategoryFiltersForm"
        className={classes.formStyles}
      >
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
                id="sourceCountry"
                name="sourceCountry"
                type="text"
                component={renderSourceCountryField}
                autoComplete="off"
                //style={{ marginTop: 20 }}
              />
            </Grid>
            <Grid item>
              <Field
                label=""
                id="destinationCountry"
                name="destinationCountry"
                type="text"
                component={renderDestinationCountryField}
                autoComplete="off"
                //style={{ marginTop: 20 }}
              />
            </Grid>
            <Grid item>
              <Field
                label=""
                id="category"
                name="category"
                type="text"
                component={renderCategoryField}
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
  form: "SourceCountryDestinationCountryAndCategoryFiltersForm",
})(SourceCountryDestinationCountryAndCategoryFilters);
