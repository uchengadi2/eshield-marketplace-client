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
    marginTop: 10,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 160,
    marginLeft: 170,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function CountryForm(props) {
  const classes = useStyles();

  const [continent, setContinent] = useState();
  const [region, setRegion] = useState();

  const handleContinentChange = (event) => {
    setContinent(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const renderCountryNameField = ({
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
        helperText="Enter Country Name"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderCountryCodeField = ({
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
        helperText="Enter Country Code"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        {...input}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderContinentField = ({
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
            labelId="continent"
            id="continent"
            value={continent}
            onChange={handleContinentChange}
            label="Prefered Currency"
            style={{ width: 300 }}
            {...input}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"africa"}>Africa</MenuItem>
            <MenuItem value={"europe"}>Europe</MenuItem>
            <MenuItem value={"asia"}>Asia</MenuItem>
            <MenuItem value={"north-america"}>North America</MenuItem>
            <MenuItem value={"south-america"}>South America</MenuItem>
          </Select>
          <FormHelperText>Select Continent</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderContinentRegionsField = ({
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
            value={region}
            onChange={handleRegionChange}
            label="Continent Region"
            style={{ width: 190 }}
            {...input}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
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
          <FormHelperText>Select Continent Region</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCountryDescriptionField = ({
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
        helperText="Provide a description of this country"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        multiline={true}
        minRows={4}
        {...input}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderCountryFlagField = ({
    floatingLabelText,
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    // if (input.value && input.value[0] && input.value[0].name) {
    //   floatingLabelText = input.value[0].name;
    // }
    delete input.value;
    return (
      <TextField
        id={input.name}
        variant="outlined"
        type={type}
        fullWidth
        style={{ marginTop: 20 }}
        helperText="Upload Country Flag"
        {...custom}
        {...input}

        // inputProps={{ type: "file" }}
      />
    );
  };

  //script to upload multiple images at once
  let images = [];
  const uploadScreenshotFile = (event) => {
    for (let size = 0; size < event.target.files.length; size++) {
      console.log("Selected file:", event.target.files[size]);
      let file = event.target.files[size];
      console.log("uploading screenshot file...", file);
      images.push(file);

      // Do necessary request to upload here.......
    }
  };

  const onSubmit = (formValues) => {
    const form = new FormData();
    form.append("name", formValues.name);
    form.append("code", formValues.code);
    form.append("description", formValues.description);
    form.append("continent", formValues.continent);
    form.append("region", formValues.region);
    form.append("createdBy", props.userId);
    if (formValues.flag) {
      form.append("flag", formValues.flag[0]);
    }

    props.onSubmit(form);
  };

  return (
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Enter New Country Details
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="countryForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 450,
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
              component={renderCountryNameField}
            />
          </Grid>
          <Grid item style={{ width: "28%", marginLeft: 10 }}>
            <Field
              label=""
              id="code"
              name="code"
              type="text"
              component={renderCountryCodeField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="continent"
              name="continent"
              type="text"
              component={renderContinentField}
            />
          </Grid>
          <Grid item style={{ width: "37%", marginLeft: 10 }}>
            <Field
              label=""
              id="region"
              name="region"
              type="text"
              component={renderContinentRegionsField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="description"
          name="description"
          type="text"
          component={renderCountryDescriptionField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="flag"
          name="flag"
          type="file"
          accept="image/*"
          component={renderCountryFlagField}
          floatingLabelText={"Upload Image"}
          fullWidth={true}
          style={{ marginTop: 10 }}

          // onChange={uploadScreenshotFile}
        />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Add Country
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "countryForm",
})(CountryForm);
