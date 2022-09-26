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
    width: 170,
    marginLeft: 160,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function CurrencyEditForm(props) {
  const classes = useStyles();

  const [country, setCountry] = useState();

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const params = props.params;
  const renderCurrencyNameField = ({
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
        helperText="Enter Currency Name"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.name}
        fullWidth
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderCurrencyCodeField = ({
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
        helperText="Enter Currency Code"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.code}
        fullWidth
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderCurrencyCountryField = ({
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
            style={{ width: 500 }}
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
          <FormHelperText>Select Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCurrencyDescriptionField = ({
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
        helperText="Provide a description of this currency"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.description}
        fullWidth
        //required
        type={type}
        {...custom}
        multiline={true}
        minRows={7}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderCurrencySymbolField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        id={input.name}
        variant="outlined"
        type={type}
        fullWidth
        style={{ marginTop: 20 }}
        helperText="Upload Currency Symbol"
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
          Currency Details
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="currencyForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 420,
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
              component={renderCurrencyNameField}
            />
          </Grid>
          <Grid item style={{ width: "28%", marginLeft: 10 }}>
            <Field
              label=""
              id="code"
              name="code"
              type="text"
              component={renderCurrencyCodeField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item>
            <Field
              label=""
              id="country"
              name="country"
              type="text"
              component={renderCurrencyCountryField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="description"
          name="description"
          type="text"
          component={renderCurrencyDescriptionField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="symbol"
          name="symbol"
          type="file"
          component={renderCurrencySymbolField}
          style={{ marginTop: 10 }}
        />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Update Currency
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "currencyForm",
})(CurrencyEditForm);
