import React, { useState, useEffect } from "react";
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

function RemittanceEditForm(props) {
  const classes = useStyles();

  const [orderPayment, setOrderPayment] = useState();
  const [preferredCurrency, setPreferredCurrency] = useState();
  const [params, setParams] = useState([]);
  const [selectedPaymentPhase, setSelectedPaymentPhase] = useState();
  const [preferredCurrencyList, setPreferredCurrencyList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [selectedPreferredCurrency, setSelectedPreferredCurrency] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedPayment, setSelectedPayment] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/remittances/${props.params.id}`);
      const workingData = Object.values(response.data.data.data);

      let row = {};
      workingData.map((remittance) => {
        console.log("this is the remittance at map:", remittance);
        console.log("this is the woeking array:", workingData);
        row = {
          id: remittance.id,
          orderNumber: remittance.order[0],
          order: remittance.order[0],
          vendor: remittance.vendor[0],
          paymentStatus: remittance.payment,
          prevailingBaseCurrency: remittance.prevailingBaseCurrency,
          generalRemittanceStatus: remittance.generalRemittanceStatus,
          paymentPhase: remittance.paymentPhase[0],
          customer: remittance.customer[0],
          agreedRemittanceCurrency:
            remittance.remittance.agreedRemittanceCurrency[0],
          agreedRemittanceBaseExchangeRate:
            remittance.remittance.agreedRemittanceBaseExchangeRate,
          paymentRemittanceDate: remittance.remittance.paymentRemittanceDate,
          totalAmountExpectedForRemittance:
            remittance.remittance.totalAmountExpectedForRemittance,
          actualAmountRemitted: remittance.remittance.actualAmountRemitted,
          remittanceStatus: remittance.remittance.remittanceStatus,
          agreedRetentionCurrency: remittance.retention.agreedRetentionCurrency,
          agreedRetentionBaseExchangeRate:
            remittance.retention.agreedRetentionBaseExchangeRate,
          paymentRetentionDate: remittance.retention.paymentRetentionDate,
          totalAmountExpectedForRetention:
            remittance.retention.totalAmountExpectedForRetention,
          amountRetained: remittance.retention.amountRetained,
          retentionStatus: remittance.retention.retentionStatus,
        };
      });
      setParams(row);
      setSelectedPaymentPhase(row.paymentPhase);
      setSelectedPreferredCurrency(row.agreedRemittanceCurrency);
      setSelectedOrder(row.order);
      setSelectedPayment(row.payment);

      // setSelectedOperationalCurrency(row.agreedPaymentCurrency);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/currencies");
      const workingData = response.data.data.data;
      workingData.map((currency) => {
        allData.push({ id: currency._id, name: currency.name });
      });
      setPreferredCurrencyList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/orders");
      const workingData = response.data.data.data;
      workingData.map((order) => {
        console.log("ths is th order:", order);
        // if (order.status !== "pending") {
        allData.push({
          id: order._id,
          status: order.status,
          order: order.orderNumber,
        });
        //}
      });
      setOrderList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/payments", {
        params: { order: selectedOrder },
      });
      const workingData = response.data.data.data;
      workingData.map((payment) => {
        console.log("ths is th payment:", payment);
        // if (order.status !== "pending") {
        allData.push({
          id: payment._id,
          lastPaymentAmountMade: payment.lastPaymentAmountMade,
        });
        //}
      });
      setPaymentList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [selectedOrder]);

  const handlePaymentPhaseChange = (event) => {
    setSelectedPaymentPhase(event.target.value);
  };

  const handlePreferredCurrencyChange = (event) => {
    setSelectedPreferredCurrency(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSelectedOrder(event.target.value);
    //setOrderList([]);
  };
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  //get the preferred currency list
  const renderPreferredCurrencyList = () => {
    return preferredCurrencyList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the order list
  const renderOrderList = () => {
    return orderList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.order}
        </MenuItem>
      );
    });
  };

  //get the payment list
  const renderPaymentList = () => {
    return paymentList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.lastPaymentAmountMade}
        </MenuItem>
      );
    });
  };

  console.log("the selected order is:", selectedOrder);
  console.log("tis is the paymet lisy:", paymentList);
  console.log("this is the selectedpayment:", selectedPayment);

  // const renderOrderForPaymentField = ({
  //   input,
  //   label,
  //   meta: { touched, error, invalid },
  //   type,
  //   id,
  //   ...custom
  // }) => {
  //   return (
  //     <TextField
  //       //error={touched && invalid}
  //       helperText="Order Number"
  //       variant="outlined"
  //       //label={label}
  //       id={input.name}
  //       value={params.orderNumber}
  //       fullWidth
  //       //required
  //       type={type}
  //       {...custom}

  //       //onChange={handleInput}
  //     />
  //   );
  // };

  const renderOrderForPaymentField = ({
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
            labelId="order"
            id="order"
            value={selectedOrder ? selectedOrder : params.order}
            onChange={handleOrderChange}
            label="Order"
            style={{ width: 270 }}
          >
            {renderOrderList()}
          </Select>
          <FormHelperText>Select Order</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPaymentForRemittanceField = ({
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
            labelId="payment"
            id="payment"
            value={selectedPayment ? selectedPayment : params.payment}
            onChange={handlePaymentChange}
            label="Payment"
            style={{ width: 225 }}
          >
            {renderPaymentList()}
          </Select>
          <FormHelperText>Select Payment</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderOrderedCustomerId = ({
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
        value={params.customer}
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
            aria-label="paymentPhase"
            name="paymentPhase"
            value={
              selectedPaymentPhase ? selectedPaymentPhase : params.paymentPhase
            }
            onChange={handlePaymentPhaseChange}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value="initialPayment"
                  control={<Radio />}
                  label="Initial Installment Payment"
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  value="secondPayment"
                  control={<Radio />}
                  label="Second Installment Payment"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value="thirdPayment"
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
        value={params.paymentStatus}
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

  const renderTotalExpectedAmountForRemittanceField = ({
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
        value={params.totalAmountExpectedForRemittance}
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

  const renderActualAmountRemittedField = ({
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
        value={params.actualAmountRemitted}
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
        value={params.maximumAmountForRemittance}
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
        value={params.amountToBeRemitted}
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
            labelId="preferredCurrency"
            id="preferredCurrency"
            value={
              selectedPreferredCurrency
                ? selectedPreferredCurrency
                : params.agreedRemittanceCurrency
            }
            onChange={handlePreferredCurrencyChange}
            label="Prefered Currency"
            style={{ width: 270 }}
          >
            {renderPreferredCurrencyList()}
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
        value={params.vendor}
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
          Payment Remittance
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
          <Grid item style={{ width: "54%" }}>
            <Field
              label=""
              id="orderforpayment"
              name="orderforpayment"
              type="text"
              component={renderOrderForPaymentField}
            />
          </Grid>
          <Grid item style={{ width: "44%", marginLeft: 10 }}>
            <Field
              label=""
              id="payment"
              name="payment"
              type="text"
              component={renderPaymentForRemittanceField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "45%" }}>
            <Field
              label=""
              id="productvendor"
              name="productvendor"
              type="text"
              component={renderProductVendorField}
            />
          </Grid>
          <Grid item style={{ width: "45%", marginLeft: 10 }}>
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
            id="paymentPhase"
            name="paymentPhase"
            type="text"
            component={renderSelectablePaymentPhaseField}
          />
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="paymentStatus"
              name="paymentStatus"
              type="text"
              component={PaymentStatusField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="totalAmountExpectedForRemittance"
              name="totalAmountExpectedForRemittance"
              type="text"
              component={renderTotalExpectedAmountForRemittanceField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="actualAmountRemitted"
              name="actualAmountRemitted"
              type="text"
              component={renderActualAmountRemittedField}
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
          Update Remittance
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "processRemittanceForm",
})(RemittanceEditForm);
