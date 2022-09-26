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
    width: 120,
    marginLeft: 190,
    marginTop: 30,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function AddPaymentForm(props) {
  const classes = useStyles();

  const [order, setOrder] = useState({});
  const [agreedPaymentCurrency, setAgreedPaymentCurrency] = useState();
  const [
    agreedNumberOfPaymentInstallements,
    setAgreedNumberOfPaymentInstallements,
  ] = useState();
  const [currencyList, setCurrencyList] = useState([]);
  const [customer, setCustomer] = useState();
  const [usersList, setUsersList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [value, setValue] = useState();
  const [selectedOrder, setSelectedOrder] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/currencies");
      const workingData = response.data.data.data;
      workingData.map((currency) => {
        allData.push({ id: currency._id, name: currency.name });
      });
      setCurrencyList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/orders", {
        params: { status: "pending" },
      });
      const workingData = response.data.data.data;
      workingData.map((order) => {
        allData.push({ id: order._id, orderNumber: order.orderNumber });
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
      const response = await data.get("/users");
      const workingData = response.data.data.data;
      workingData.map((user) => {
        allData.push({ id: user._id, name: user.name });
      });
      setUsersList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    setValue((state) => {
      console.log("lets get know what is the new state value:", state); // "React is awesome!"

      // return state;
    });
  }, [value]);

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setOrderList(event.target.value);
  };

  const handleCustomerChange = (event) => {
    console.log("this is th selected customer:", event.target.value);
    setCustomer(event.target.value);
    setUsersList(event.target.value);
  };

  const handleAgreedPaymentInstallmentsChange = (event) => {
    setValue(event.target.value);
    setAgreedNumberOfPaymentInstallements(event.target.value);
  };

  const handleAgreedPaymentCurrencyChange = (event) => {
    setAgreedPaymentCurrency(event.target.value);
    setCurrencyList(event.target.value);
  };

  //const paymentStatusList = ["pending", "partial", "full"];

  console.log("this is teh userlist:", usersList);

  //get the operational currency list
  const renderCurrencyList = () => {
    return currencyList.map((item) => {
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
          {item.orderNumber}
        </MenuItem>
      );
    });
  };

  //get the user list
  const renderUserList = () => {
    return usersList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
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
      <Box style={{ marginTop: 15 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Choose the agreed payment installments
          </FormLabel>
          <RadioGroup
            aria-label="agreedNumberOfPaymentInstallements"
            name="agreedNumberOfPaymentInstallements"
            value={agreedNumberOfPaymentInstallements}
            onChange={handleAgreedPaymentInstallmentsChange}
            style={{ marginTop: 10 }}
            {...input}
          >
            <Grid item container direction="row">
              <Grid item style={{ width: "34%" }}>
                <FormControlLabel
                  value={"1"}
                  control={<Radio />}
                  label="One Installment"
                />
              </Grid>

              <Grid item style={{ width: "33%" }}>
                <FormControlLabel
                  value={"2"}
                  control={<Radio />}
                  label="Two Installments"
                />
              </Grid>
              <Grid item style={{ width: "33%" }}>
                <FormControlLabel
                  value={"3"}
                  control={<Radio />}
                  label="Three Installments"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const renderPercentageForThirdPaymentField = ({
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
        placeholder="0.12"
        helperText="Enter Third % Payment"
        variant="outlined"
        //label={label}
        id={input.name}
        // value={params.paymentStatus}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        {...input}
        // InputProps={{
        //   inputProps: {
        //     type: "number",
        //     max: 1,
        //     min: 0,
        //   },
        // }}

        //onChange={handleInput}
      />
    );
  };

  const renderPercentageForSecondPaymentField = ({
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
        placeholder="0.12"
        helperText="Enter Second % Payment"
        variant="outlined"
        //label={label}
        id={input.name}
        // value={params.totalAmountExpected}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        {...input}

        //onChange={handleInput}
      />
    );
  };

  const renderTotalAgreedAmountForPaymentField = ({
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
        helperText="Enter Total Amount Agreed for this Order"
        variant="outlined"
        //label={label}
        id={input.name}
        // value={params.totalAmountExpected - params.totalAmountAlreadyPaid}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        {...input}

        //onChange={handleInput}
      />
    );
  };

  const renderPercentageForInitialPaymentField = ({
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
        placeholder="0.12"
        helperText="Enter Initial % Payment"
        variant="outlined"
        //label={label}
        id={input.name}
        // value={params.lastPaymentAmountMade}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        {...input}
        // InputProps={{
        //   inputProps: {
        //     type: "number",
        //     max: 1,
        //     min: 0,
        //   },
        // }}
      />
    );
  };

  const renderAgreedPaymentCurrencyField = ({
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
            labelId="agreedPaymentCurrency"
            id="agreedPaymentCurrency"
            value={agreedPaymentCurrency}
            onChange={handleAgreedPaymentCurrencyChange}
            // label="Prefered Currency"
            style={{ marginTop: 10, width: 210 }}
            {...input}
          >
            {renderCurrencyList()}
          </Select>
          <FormHelperText>Select Agreed Payment Currency</FormHelperText>
        </FormControl>
      </Box>
    );
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
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="order"
            id="order"
            value={order}
            onChange={handleOrderChange}
            // label="Order"
            style={{ marginTop: 10, width: 250 }}
            {...input}
          >
            {renderOrderList()}
          </Select>
          <FormHelperText>Select Order</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderOrderCustomer = ({
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
            labelId="customer"
            id="customer"
            value={customer}
            onChange={handleCustomerChange}
            // label="Customer"
            style={{ marginTop: 10, marginLeft: 10, width: 260 }}
            {...input}
          >
            {renderUserList()}
          </Select>
          <FormHelperText>Select Customer</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (formValues) => {
    let percentageForInitialPayment = 0;
    let initialPaymentAmountExpected = 0;
    let percentageForSecondPayment = 0;
    let secondPaymentAmountExpected = 0;
    let percentageForThirdPayment = 0;
    let thirdPaymentAmountExpected = 0;
    let initialPaymentPercentage = 0;
    let remainingPercentage = 0;

    if (parseInt(formValues.agreedNumberOfPaymentInstallements) === 1) {
      percentageForInitialPayment = 1;
      initialPaymentAmountExpected = formValues.totalAmountExpected;
      percentageForSecondPayment = 0;
      secondPaymentAmountExpected = 0;
      percentageForThirdPayment = 0;
      thirdPaymentAmountExpected = 0;
    } else if (parseInt(formValues.agreedNumberOfPaymentInstallements) === 2) {
      const total =
        parseFloat(formValues.percentageForInitialPayment) +
        parseFloat(formValues.percentageForSecondPayment);
      if (parseInt(total) === 1) {
        if (formValues.percentageForInitialPayment < 1) {
          initialPaymentPercentage = parseFloat(
            formValues.percentageForInitialPayment
          );
          remainingPercentage = 1 - parseFloat(initialPaymentPercentage);
        } else if (formValues.percentageForSecondPayment < 1) {
          remainingPercentage = parseFloat(
            formValues.percentageForSecondPayment
          );
          initialPaymentPercentage = 1 - parseFloat(remainingPercentage);
        } else {
          remainingPercentage = 0.5;
          initialPaymentPercentage = 0.5;
        }
      } else {
        remainingPercentage = 0.5;
        initialPaymentPercentage = 0.5;
      }
      percentageForInitialPayment = initialPaymentPercentage;
      initialPaymentAmountExpected =
        parseFloat(formValues.totalAmountExpected) * initialPaymentPercentage;
      percentageForSecondPayment = parseFloat(remainingPercentage);
      secondPaymentAmountExpected =
        parseFloat(formValues.totalAmountExpected) *
        parseFloat(remainingPercentage);
      percentageForThirdPayment = 0;
      thirdPaymentAmountExpected = 0;
    } else if (parseInt(formValues.agreedNumberOfPaymentInstallements) === 3) {
      const total =
        parseFloat(formValues.percentageForInitialPayment) +
        parseFloat(formValues.percentageForSecondPayment) +
        parseFloat(formValues.percentageForThirdPayment);
      if (parseInt(total) === 1) {
        percentageForInitialPayment = formValues.percentageForInitialPayment;
        initialPaymentAmountExpected =
          formValues.totalAmountExpected *
          formValues.percentageForInitialPayment;

        percentageForSecondPayment = formValues.percentageForSecondPayment;
        secondPaymentAmountExpected =
          formValues.totalAmountExpected *
          formValues.percentageForSecondPayment;

        percentageForThirdPayment = formValues.percentageForThirdPayment;
        thirdPaymentAmountExpected =
          formValues.totalAmountExpected * formValues.percentageForThirdPayment;
      }
    }
    const data = {
      order: formValues.order,
      customer: formValues.customer,
      totalAmountExpected: formValues.totalAmountExpected,
      currentPaymentRound: 1,
      agreedPaymentCurrency: formValues.agreedPaymentCurrency,
      agreedNumberOfPaymentInstallements:
        formValues.agreedNumberOfPaymentInstallements,
      paymentAgreementBookedBy: props.userId,
      paymentBreakdown: {
        initialPaymentInstallment: {
          percentageForInitialPayment: percentageForInitialPayment,
          initialPaymentAmountExpected: initialPaymentAmountExpected,
        },
        secondInstallmentPayment: {
          percentageForSecondPayment: percentageForSecondPayment,
          secondPaymentAmountExpected: secondPaymentAmountExpected,
        },
        thirdInstallmentPayment: {
          percentageForThirdPayment: percentageForThirdPayment,
          thirdPaymentAmountExpected: thirdPaymentAmountExpected,
        },
      },
    };

    props.onSubmit(data);
  };

  return (
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Agreed Payment for an Order
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="paymentForm"
        // onSubmit={onSubmit}
        sx={{
          width: 520,
          height: 450,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "46%" }}>
            <Field
              label=""
              id="order"
              name="order"
              type="text"
              component={renderOrderForPaymentField}
            />
          </Grid>
          <Grid item style={{ width: "48%", marginLeft: 10 }}>
            <Field
              label=""
              id="customer"
              name="customer"
              type="text"
              component={renderOrderCustomer}
            />
          </Grid>
          {/* <Grid item style={{ width: "32%", marginLeft: 10 }}>
            <Field
              label=""
              id="vendor"
              name="vendor"
              type="text"
              component={renderVendorsForOrderid}
            />
          </Grid> */}
        </Grid>
        <Grid container direction="row">
          <Grid item style={{ width: "40%" }}>
            <Field
              label=""
              id="agreedPaymentCurrency"
              name="agreedPaymentCurrency"
              type="text"
              component={renderAgreedPaymentCurrencyField}
              style={{ marginTop: 10 }}
            />
          </Grid>

          <Grid item style={{ width: "58%", marginLeft: 10 }}>
            <Field
              label=""
              id="totalAmountExpected"
              name="totalAmountExpected"
              type="text"
              component={renderTotalAgreedAmountForPaymentField}
              style={{ marginTop: 10 }}
            />
          </Grid>
        </Grid>

        <Grid item style={{ marginTop: 10, width: "100%" }}>
          <Field
            label=""
            id="agreedNumberOfPaymentInstallements"
            name="agreedNumberOfPaymentInstallements"
            type="number"
            component={renderSelectablePaymentPhaseField}
          />
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="percentageForInitialPayment"
              name="percentageForInitialPayment"
              type="number"
              component={renderPercentageForInitialPaymentField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="percentageForSecondPayment"
              name="percentageForSecondPayment"
              type="number"
              component={renderPercentageForSecondPaymentField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="percentageForThirdPayment"
              name="percentageForThirdPayment"
              type="number"
              component={renderPercentageForThirdPaymentField}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "addPaymentForm",
})(AddPaymentForm);
