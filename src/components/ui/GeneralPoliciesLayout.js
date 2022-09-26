import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { TextField, Checkbox } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Typography } from "@mui/material";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";

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
    width: 200,
    marginLeft: 950,
    marginTop: 150,

    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function GeneralPoliciesLayout(props) {
  const classes = useStyles();

  const [
    platformInitialPaymentRemittanceRate,
    setPlatformInitialPaymentRemittanceRate,
  ] = useState(false);
  const [
    platformSecondPaymentRemittanceRate,
    setPlatformSecondPaymentRemittanceRate,
  ] = useState(false);

  const [
    platformThirdPaymentRemittanceRate,
    setPlatformThirdPaymentRemittanceRate,
  ] = useState(false);

  const [
    platformInitialPaymentDaysToRemit,
    setPlatformInitialPaymentDaysToRemit,
  ] = useState(false);

  const [
    platformSecondPaymentDaysToRemit,
    setPlatformSecondPaymentDaysToRemit,
  ] = useState(false);

  const [platformThirdPaymentDaysToRemit, setPlatformThirdPaymentDaysToRemit] =
    useState(false);

  const [
    platformInitialPaymentForRetention,
    setPlatformInitialPaymentForRetention,
  ] = useState(false);

  const [
    platformSecondPaymentForRetention,
    setPlatformSecondPaymentForRetention,
  ] = useState(false);

  const [
    platformThirdPaymentForRetention,
    setPlatformThirdPaymentForRetention,
  ] = useState(false);

  const handlePlatformInitialRemittanceRateChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.checked });
    setPlatformInitialPaymentRemittanceRate(event.target.checked);
  };

  const handlePlatformSecondRemittanceRateChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.checked });
    setPlatformSecondPaymentRemittanceRate(event.target.checked);
  };

  const handlePlatformThirdRemittanceRateChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.checked });
    setPlatformThirdPaymentRemittanceRate(event.target.checked);
  };

  const handlePlatformInitialPaymentDaysToRemitChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.checked });
    setPlatformInitialPaymentDaysToRemit(event.target.checked);
  };

  const handlePlatformSecondPaymentDaysToRemitChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.checked });
    setPlatformSecondPaymentDaysToRemit(event.target.checked);
  };

  const handlePlatformThirdPaymentDaysToRemitChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.checked });
    setPlatformThirdPaymentDaysToRemit(event.target.checked);
  };

  const handlePlatformInitialPaymentForRetentionChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.checked });
    setPlatformInitialPaymentForRetention(event.target.checked);
  };

  const handlePlatformSecondPaymentForRetentionChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.checked });
    setPlatformSecondPaymentForRetention(event.target.checked);
  };

  const handlePlatformThirdPaymentForRetentionChange = (event) => {
    //setState({ ...state, [event.target.name]: event.target.checked });
    setPlatformThirdPaymentForRetention(event.target.checked);
  };

  const renderInitialPercentagePaymentForRetention = ({
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
        helperText="Retention Rate"
        variant="outlined"
        //label={label}
        id={input.name}
        placeholder="0.22"
        //value={}
        fullWidth
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderInitialPercentagePaymentForRemittion = ({
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
        helperText="Remittion Rate"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={}
        fullWidth
        placeholder="0.32"
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderInitialPaymentDaysToRemittion = ({
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
        helperText="Days To Remittion"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={}
        fullWidth
        placeholder="10"
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderSecondPercentagePaymentForRetention = ({
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
        helperText="Retention Rate"
        variant="outlined"
        //label={label}
        id={input.name}
        placeholder="0.22"
        //value={}
        fullWidth
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderSecondPercentagePaymentForRemittion = ({
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
        helperText="Remittion Rate"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={}
        fullWidth
        placeholder="0.32"
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderSecondPaymentDaysToRemittion = ({
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
        helperText="Days To Remittion"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={}
        fullWidth
        placeholder="10"
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderThirdPercentagePaymentForRetention = ({
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
        helperText="Retention Rate"
        variant="outlined"
        //label={label}
        id={input.name}
        placeholder="0.22"
        //value={}
        fullWidth
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderThirdPercentagePaymentForRemittion = ({
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
        helperText="Remittion Rate"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={}
        fullWidth
        placeholder="0.32"
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderThirdPaymentDaysToRemittion = ({
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
        helperText="Days To Remittion"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={}
        fullWidth
        placeholder="10"
        //required
        type={type}
        {...custom}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderOveruleAllVendorsInitialRemittanceRate = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={platformInitialPaymentRemittanceRate}
            onChange={handlePlatformInitialRemittanceRateChange}
            name="platformInitialPaymentRemittanceRate"
          />
        }
        label="Overule Vendors Initial Payment Remittance Rates"
      />
    );
  };

  const renderOveruleAllVendorsSecondRemittanceRate = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={platformSecondPaymentRemittanceRate}
            onChange={handlePlatformSecondRemittanceRateChange}
            name="platformSecondPaymentRemittanceRate"
          />
        }
        label="Overule Vendors Second Payment Remittance Rates"
      />
    );
  };

  const renderOveruleAllVendorsThirdRemittanceRate = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={platformThirdPaymentRemittanceRate}
            onChange={handlePlatformThirdRemittanceRateChange}
            name="platformThirdPaymentRemittanceRate"
          />
        }
        label="Overule Vendors Third Payment Remittance Rates"
      />
    );
  };

  const renderOveruleAllVendorsInitialPaymentDaysToRemittanceValue = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={platformInitialPaymentDaysToRemit}
            onChange={handlePlatformInitialPaymentDaysToRemitChange}
            name="platformInitialPaymentDaysToRemit"
          />
        }
        label="Overule Vendors Initial Payment Days To Remittance Value"
      />
    );
  };

  const renderOveruleAllVendorsSecondPaymentDaysToRemittanceValue = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={platformSecondPaymentDaysToRemit}
            onChange={handlePlatformSecondPaymentDaysToRemitChange}
            name="platformSecondPaymentDaysToRemit"
          />
        }
        label="Overule Vendors Second Payment Days To Remittance Value"
      />
    );
  };

  const renderOveruleAllVendorsThirdPaymentDaysToRemittanceValue = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={platformThirdPaymentDaysToRemit}
            onChange={handlePlatformThirdPaymentDaysToRemitChange}
            name="platformThirdPaymentDaysToRemit"
          />
        }
        label="Overule Vendors Third Payment Days To Remittance Value"
      />
    );
  };

  const renderOveruleAllVendorsInitialPaymentRetentionRate = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={platformInitialPaymentForRetention}
            onChange={handlePlatformInitialPaymentForRetentionChange}
            name="platformInitialPaymentForRetention"
          />
        }
        label="Overule Vendors' Agreed Initial Payment Retention Rate "
      />
    );
  };

  const renderOveruleAllVendorsSecondPaymentRetentionRate = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={platformSecondPaymentForRetention}
            onChange={handlePlatformSecondPaymentForRetentionChange}
            name="platformSecondPaymentForRetention"
          />
        }
        label="Overule Vendors' Agreed Second Payment Retention Rate "
      />
    );
  };

  const renderOveruleAllVendorsThirdPaymentRetentionRate = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={platformThirdPaymentForRetention}
            onChange={handlePlatformThirdPaymentForRetentionChange}
            name="platformThirdPaymentForRetention"
          />
        }
        label="Overule Vendors' Agreed Third Payment Retention Rate "
      />
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };
  return (
    <Box component="form">
      <Grid
        container
        direction="row"
        // justifyContent="center"
        // alignItems="center"
        style={{ width: 1100 }}
      >
        <Grid item container direction="column" style={{ width: 800 }}>
          <FormLabel
            style={{ color: "grey", fontSize: "1em", marginBottom: 15 }}
            component="legend"
          >
            Set The Initial Payment Retention & Remittion Policy
          </FormLabel>
          <Grid item container direction="row" style={{ width: "55%" }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="initialPercentagePaymentForRetention"
                name="initialPercentagePaymentForRetention"
                type="number"
                component={renderInitialPercentagePaymentForRetention}
              />
            </Grid>
            <Grid item style={{ width: "30%", marginLeft: 20 }}>
              <Field
                label=""
                id="initialPaymentForRemittion"
                name="initialPaymentForRemittion"
                type="number"
                component={renderInitialPercentagePaymentForRemittion}
              />
            </Grid>
            <Grid item style={{ width: "30%", marginLeft: 20 }}>
              <Field
                label=""
                id="initialPaymentDaysToRemit"
                name="initialPaymentDaysToRemit"
                type="number"
                component={renderInitialPaymentDaysToRemittion}
              />
            </Grid>
          </Grid>
          <FormLabel
            style={{
              color: "grey",
              fontSize: "1em",
              marginBottom: 15,
              marginTop: 20,
            }}
            component="legend"
          >
            Set The Second Payment Retention & Remittion Policy
          </FormLabel>
          <Grid item container direction="row" style={{ width: "55%" }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="secondPercentagePaymentForRetention"
                name="secondPercentagePaymentForRetention"
                type="number"
                component={renderSecondPercentagePaymentForRetention}
              />
            </Grid>
            <Grid item style={{ width: "30%", marginLeft: 20 }}>
              <Field
                label=""
                id="secondPaymentForRemittion"
                name="secondPaymentForRemittion"
                type="number"
                component={renderSecondPercentagePaymentForRemittion}
              />
            </Grid>
            <Grid item style={{ width: "30%", marginLeft: 20 }}>
              <Field
                label=""
                id="secondPaymentDaysToRemit"
                name="secondPaymentDaysToRemit"
                type="number"
                component={renderSecondPaymentDaysToRemittion}
              />
            </Grid>
          </Grid>
          <FormLabel
            style={{
              color: "grey",
              fontSize: "1em",
              marginBottom: 15,
              marginTop: 20,
            }}
            component="legend"
          >
            Set The Third Payment Retention & Remittion Policy
          </FormLabel>
          <Grid item container direction="row" style={{ width: "55%" }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="thirdPercentagePaymentForRetention"
                name="thirdPercentagePaymentForRetention"
                type="number"
                component={renderThirdPercentagePaymentForRetention}
              />
            </Grid>
            <Grid item style={{ width: "30%", marginLeft: 20 }}>
              <Field
                label=""
                id="thirdPaymentForRemittion"
                name="thirdPaymentForRemittion"
                type="number"
                component={renderThirdPercentagePaymentForRemittion}
              />
            </Grid>
            <Grid item style={{ width: "30%", marginLeft: 20 }}>
              <Field
                label=""
                id="thirdPaymentDaysToRemit"
                name="thirdPaymentDaysToRemit"
                type="number"
                component={renderThirdPaymentDaysToRemittion}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          style={{ width: 800, marginTop: 30 }}
        >
          <Grid item>
            <Field
              label=""
              id="overuleAllVendorsInitialRemittanceRate"
              name="overuleAllVendorsInitialRemittanceRate"
              type="number"
              component={renderOveruleAllVendorsInitialRemittanceRate}
            />
          </Grid>
          <Grid item>
            <Field
              label=""
              id="overuleAllVendorsSecondRemittanceRate"
              name="overuleAllVendorsSecondRemittanceRate"
              type="number"
              component={renderOveruleAllVendorsSecondRemittanceRate}
            />
          </Grid>
          <Grid item>
            <Field
              label=""
              id="overuleAllVendorsThirdRemittanceRate"
              name="overuleAllVendorsThirdRemittanceRate"
              type="number"
              component={renderOveruleAllVendorsThirdRemittanceRate}
            />
          </Grid>
          <Grid item>
            <Field
              label=""
              id="overuleAllVendorsInitialDaysToRemittanceValue"
              name="overuleAllVendorsInitialDaysToRemittanceValue"
              type="number"
              component={
                renderOveruleAllVendorsInitialPaymentDaysToRemittanceValue
              }
            />
          </Grid>
          <Grid item>
            <Field
              label=""
              id="overuleAllVendorsSecondDaysToRemittanceValue"
              name="overuleAllVendorsSecondDaysToRemittanceValue"
              type="number"
              component={
                renderOveruleAllVendorsSecondPaymentDaysToRemittanceValue
              }
            />
          </Grid>
          <Grid item>
            <Field
              label=""
              id="overuleAllVendorsThirdDaysToRemittanceValue"
              name="overuleAllVendorsThirdDaysToRemittanceValue"
              type="number"
              component={
                renderOveruleAllVendorsThirdPaymentDaysToRemittanceValue
              }
            />
          </Grid>
          <Grid item>
            <Field
              label=""
              id="overuleAllVendorsInitialPaymentRetentionRate"
              name="overuleAllVendorsInitialPaymentRetentionRate"
              type="number"
              component={renderOveruleAllVendorsInitialPaymentRetentionRate}
            />
          </Grid>
          <Grid item>
            <Field
              label=""
              id="overuleAllVendorsSecondPaymentRetentionRate"
              name="overuleAllVendorsSecondPaymentRetentionRate"
              type="number"
              component={renderOveruleAllVendorsSecondPaymentRetentionRate}
            />
          </Grid>
          <Grid item>
            <Field
              label=""
              id="overuleAllVendorsThirdPaymentRetentionRate"
              name="overuleAllVendorsThirdPaymentRetentionRate"
              type="number"
              component={renderOveruleAllVendorsThirdPaymentRetentionRate}
            />
          </Grid>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        className={classes.submitButton}
        onClick={props.handleSubmit(onSubmit)}
      >
        Set Or Update Policy
      </Button>
    </Box>
  );
}

export default reduxForm({
  form: "generalPolicyForm",
})(GeneralPoliciesLayout);
