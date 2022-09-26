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
    width: 100,
    marginLeft: 220,
    //marginTop: 20,
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

function VendorSelectFilter(props) {
  const classes = useStyles();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(props.selectedVendor);
    props.handleVendorChange(props.selectedVendor);
  }, [props]);

  const handleChange = (event) => {
    console.log("this is the valuettttt:", value);
    setValue(event.target.value);
    props.handleVendorChange(event.target.value);
  };

  const renderItemList = () => {
    return props.vendorList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderSelectField = ({
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
            labelId="value"
            id="value"
            value={props.selectedVendor}
            // onChange={props.handleCountryChange}
            onChange={handleChange}
            label="Country"
            style={{ width: 300, marginLeft: 10, height: 40 }}
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
            {renderItemList()}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <div className={classes.root}>
      {/* <form id="VendorSelectFilterForm" className={classes.formStyles}> */}
      <Box
        sx={{
          width: 500,
          height: 50,
        }}
        noValidate
        autoComplete="off"
        type="form"
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
              id="value"
              name="value"
              type="text"
              component={renderSelectField}
              autoComplete="off"
              //style={{ marginTop: 20 }}
            />
            {/* <Grid item>
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  onClick={props.handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </Grid> */}
          </Grid>
        </Grid>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "VendorSelectFilterForm",
})(VendorSelectFilter);
