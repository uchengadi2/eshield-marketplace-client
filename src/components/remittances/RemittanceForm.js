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
    width: 200,
    marginLeft: 150,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function RemittanceForm(props) {
  const classes = useStyles();

  const [orderPayment, setOrderPayment] = useState();
  const [preferredCurrency, setPreferredCurrency] = useState();

  const handleOrderPaymentChange = (event) => {
    setOrderPayment(event.target.value);
  };

  const handlePreferredCurrencyChange = (event) => {
    setPreferredCurrency(event.target.value);
  };

  const renderOrderForPaymentField = ({
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
        helperText="Order Number"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderOrderedCustomerield = ({
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
        helperText="Customer that made the Order"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}

        //onChange={handleInput}
      />
    );
  };

  const renderSelectablePaymentPhaseField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose the payment phase</FormLabel>
          <RadioGroup
            aria-label="orderPayment"
            name="orderPayment"
            value={orderPayment}
            onChange={handleOrderPaymentChange}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value="city"
                  control={<Radio />}
                  label="Initial Installment Payment"
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  value="state"
                  control={<Radio />}
                  label="Second Installment Payment"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value="country"
                  control={<Radio />}
                  label="Third Installment Payment"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const PaymentStatusField = ({
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
        helperText="Payment Status"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        disabled

        //onChange={handleInput}
      />
    );
  };

  const rendertotalExpectedAmountField = ({
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
        helperText="Total Amount Expected"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        disabled

        //onChange={handleInput}
      />
    );
  };

  const renderTotalAmountPaidField = ({
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
        helperText="Total Amount Paid"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        disabled
        style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderMaximumAmountForRemittanceField = ({
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
        helperText="Maximum Amount for Remittance"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        disabled
        style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderAmountTBeRemittedField = ({
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
        helperText="Enter Amount to be Remitted"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const renderPrefferedCurrencyField = ({
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
            labelId="preferredcurrency"
            id="preferredcurrency"
            value={preferredCurrency}
            onChange={handlePreferredCurrencyChange}
            label="Prefered Currency"
            style={{ width: 290 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"nigeria"}>Nigeria</MenuItem>
            <MenuItem value={"ghana"}>Ghana</MenuItem>
            <MenuItem value={"Togo"}>Togo</MenuItem>
          </Select>
          <FormHelperText>Select Preferred Currency</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductVendorField = ({
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
        helperText="Vendor/Partner"
        variant="outlined"
        //label={label}
        id={input.name}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        disabled
        // style={{ marginTop: 10 }}

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
          Process Payment Remittance
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="processRemittanceForm"
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
          <Grid item style={{ width: "40%" }}>
            <Field
              label=""
              id="orderforpayment"
              name="orderforpayment"
              type="text"
              component={renderOrderForPaymentField}
            />
          </Grid>
          <Grid item style={{ width: "57%", marginLeft: 10 }}>
            <Field
              label=""
              id="ordercustomer"
              name="ordercustomer"
              type="text"
              component={renderOrderedCustomerield}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "40%" }}>
            <Field
              label=""
              id="productvendor"
              name="productvendor"
              type="text"
              component={renderProductVendorField}
            />
          </Grid>
          <Grid item style={{ width: "57%", marginLeft: 10 }}>
            <Field
              label=""
              id="preferredcurrency"
              name="preferredcurrency"
              type="text"
              component={renderPrefferedCurrencyField}
            />
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: 10 }}>
          <Field
            label=""
            id="paymentphase"
            name="paymentphase"
            type="text"
            component={renderSelectablePaymentPhaseField}
          />
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="paymentstatus"
              name="paymentstatus"
              type="text"
              component={PaymentStatusField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="totalexpectedamount"
              name="totalexpectedamount"
              type="text"
              component={rendertotalExpectedAmountField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="totalamountpaid"
              name="totalamountpaid"
              type="text"
              component={renderTotalAmountPaidField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "40%" }}>
            <Field
              label=""
              id="maximumamountforremittance"
              name="maximumamountforremittance"
              type="text"
              component={renderMaximumAmountForRemittanceField}
            />
          </Grid>
          <Grid item style={{ width: "58%", marginLeft: 10 }}>
            <Field
              label=""
              id="amounttoberemitted"
              name="amounttoberemitted"
              type="number"
              component={renderAmountTBeRemittedField}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Process Remittance
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "processRemittanceForm",
})(RemittanceForm);
