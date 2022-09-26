import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 180,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function StateEditForm(props) {
  const classes = useStyles();

  const [country, setCountry] = useState();
  const [region, setRegion] = useState();

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const params = props.params;

  const renderStateNameField = ({
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
        helperText="Enter State Name"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.name}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}
      />
    );
  };

  const renderStateCodeField = ({
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
        helperText="Enter State Code"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.code}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}
      />
    );
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
          <Select
            labelId="country"
            id="country"
            value={params.country}
            onChange={handleCountryChange}
            label="Country"
            style={{ width: 300 }}
            {...input}
          >
            <MenuItem value={"africa"}>Africa</MenuItem>
            <MenuItem value={"europe"}>Europe</MenuItem>
            <MenuItem value={"asia"}>Asia</MenuItem>
            <MenuItem value={"north-america"}>North America</MenuItem>
            <MenuItem value={"south-america"}>South America</MenuItem>
          </Select>
          <FormHelperText>Select Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCountryRegionsField = ({
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
          <Select
            labelId="region"
            id="region"
            value={params.region}
            onChange={handleRegionChange}
            label="Country Region"
            style={{ width: 190 }}
            {...input}
          >
            <MenuItem value={"west"}>West</MenuItem>
            <MenuItem value={"east"}>East</MenuItem>
            <MenuItem value={"north"}>North</MenuItem>
            <MenuItem value={"south"}>South</MenuItem>
            <MenuItem value={"central"}>Central</MenuItem>
            <MenuItem value={"south-east"}>South East</MenuItem>
            <MenuItem value={"south-west"}>South West</MenuItem>
            <MenuItem value={"south-central"}>South Central</MenuItem>
            <MenuItem value={"south-south"}>South South</MenuItem>
            <MenuItem value={"north-east"}>North East</MenuItem>
            <MenuItem value={"north-west"}>North West</MenuItem>
            <MenuItem value={"north-central"}>North Central</MenuItem>
            <MenuItem value={"north-north"}>North North</MenuItem>
          </Select>
          <FormHelperText>Select Country Region</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderStateDescriptionField = ({
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
        helperText="Provide a description of this state"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.description}
        fullWidth
        //required
        type={type}
        {...custom}
        multiline={true}
        minRows={4}
        {...input}
      />
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          State Details
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="stateForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "70%" }}>
            <Field
              label=""
              id="name"
              name="name"
              type="text"
              component={renderStateNameField}
            />
          </Grid>
          <Grid item style={{ width: "28%", marginLeft: 10 }}>
            <Field
              label=""
              id="name"
              name="name"
              type="text"
              component={renderStateCodeField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="country"
              name="country"
              type="text"
              component={renderCountryField}
            />
          </Grid>
          <Grid item style={{ width: "37%", marginLeft: 10 }}>
            <Field
              label=""
              id="region"
              name="egion"
              type="text"
              component={renderCountryRegionsField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="description"
          name="description"
          type="text"
          component={renderStateDescriptionField}
          style={{ marginTop: 10 }}
        />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Update State
        </Button>
      </Box>
      {/* </form> */}
    </>
  );
}

export default reduxForm({
  form: "stateForm",
})(StateEditForm);
