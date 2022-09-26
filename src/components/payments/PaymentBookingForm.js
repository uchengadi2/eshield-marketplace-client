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
    width: 180,
    marginLeft: 190,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function PaymentBookingForm(props) {
  const classes = useStyles();

  const [params, setParams] = useState({});
  const [currencyList, setCurrencyList] = useState([]);
  const [customer, setCustomer] = useState();
  const [usersList, setUsersList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [agreedPaymentCurrency, setAgreedPaymentCurrency] = useState();
  const [currentPaymentRound, setCurrentPaymentRound] = useState("1");

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/payments/${props.params.id}`);
      const workingData = Object.values(response.data.data);
      let row = {};
      workingData.map((payment) => {
        console.log("this is the payments:", payment);
        row = {
          id: payment.id,
          order: payment.order,
          vendor: payment.vendor,
          customer: payment.customer,
          totalAmountExpected: payment.totalAmountExpected,
          totalAmountAlreadyPaid: payment.totalAmountAlreadyPaid,
          lastPaymentAmountMade: payment.lastPaymentAmountMade,
          lastPaymentRound: payment.lastPaymentRound,
          currentPaymentRound: payment.currentPaymentRound,
          startingPaymentDate: payment.startingPaymentDate,
          lastPaymentDate: payment.lastPaymentDate,
          agreedPaymentCurrency: payment.agreedPaymentCurrency,
          totalAmountExpected: payment.totalAmountExpected,
          paymentStatus: payment.paymentStatus,
          lastInitialPaymentAmountMade:
            payment.paymentBreakdown.initialPaymentInstallment
              .lastInitialPaymentAmountMade,
          lastSecondPaymentAmountMade:
            payment.paymentBreakdown.secondInstallmentPayment
              .lastSecondPaymentAmountMade,
          lastThirdPaymentAmountMade:
            payment.paymentBreakdown.thirdInstallmentPayment
              .lastThirdPaymentAmountMade,
          percentageForInitialPayment:
            payment.paymentBreakdown.initialPaymentInstallment
              .percentageForInitialPayment,
          percentageForSecondPayment:
            payment.paymentBreakdown.secondInstallmentPayment
              .percentageForSecondPayment,
          percentageForThirdPayment:
            payment.paymentBreakdown.thirdInstallmentPayment
              .percentageForThirdPayment,
          initialPaymentAmountExpected:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentAmountExpected,
          initialPaymentAmountPaid:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentAmountPaid,
          dateInitialPaymentWasMade:
            payment.paymentBreakdown.initialPaymentInstallment
              .dateInitialPaymentWasMade,
          initialPaymentStatus:
            payment.paymentBreakdown.initialPaymentInstallment
              .initialPaymentStatus,
          secondPaymentAmountExpected:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentAmountExpected,
          secondPaymentAmountPaid:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentAmountPaid,
          dateSecondPaymentWasMade:
            payment.paymentBreakdown.secondInstallmentPayment
              .dateSecondPaymentWasMade,
          secondPaymentStatus:
            payment.paymentBreakdown.secondInstallmentPayment
              .secondPaymentStatus,
          thirdPaymentAmountExpected:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdPaymentAmountExpected,
          thirdPaymentAmountPaid:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdPaymentAmountPaid,
          thirdSecondPaymentWasMade:
            payment.paymentBreakdown.thirdInstallmentPayment
              .thirdSecondPaymentWasMade,
          thirdPaymentStatus:
            payment.paymentBreakdown.thirdInstallmentPayment.thirdPaymentStatus,
        };
      });
      setParams(row);
      //setSelectedOperationalCurrency(row.agreedPaymentCurrency);
      setAgreedPaymentCurrency(row.agreedPaymentCurrency);
      setSelectedOrder(row.order[0]);
      setCustomer(row.customer);
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

  const handleCurrentPaymentRoundChange = (event) => {
    setCurrentPaymentRound(event.target.value);
  };

  //retrieve all payment status

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

  const renderOrderedCustomerid = ({
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
        helperText="Customer"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.customer}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
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
      <TextField
        //error={touched && invalid}
        helperText="Order Number"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.order}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

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
            aria-label="currentPaymentRound"
            name="currentPaymentRound"
            value={currentPaymentRound}
            onChange={handleCurrentPaymentRoundChange}
            {...input}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value={"1"}
                  control={<Radio />}
                  label="Initial Installment Payment"
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  value={"2"}
                  control={<Radio />}
                  label="Second Installment Payment"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value={"3"}
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
        value={params.totalAmountExpected}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
    );
  };

  const renderRemainingAmountField = ({
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
        helperText="Remaining Amount"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.totalAmountExpected - params.totalAmountAlreadyPaid}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        // disabled

        //onChange={handleInput}
      />
    );
  };

  const renderAmountToBePaidField = ({
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
        helperText="Enter the Amount to be paid"
        variant="outlined"
        //label={label}
        id={input.name}
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
            // onChange={handlePreferredCurrencyChange}
            label="Agreed Payment Currency"
            style={{ marginTop: 10, width: 550 }}
            readOnly
          >
            {renderCurrencyList()}
          </Select>
          <FormHelperText>Agreed Payment Currency</FormHelperText>
        </FormControl>
      </Box>
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
        helperText="Total Amount for this Order"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.totalAmountExpected}
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

  const renderTotalAmountAlreadyPaidField = ({
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
        helperText="Amount Already Paid"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.totalAmountAlreadyPaid}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
    );
  };

  const renderTotalAmountForFirstInstallmentield = ({
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
        helperText="First Installment Expected Amount"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.initialPaymentAmountExpected}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
    );
  };

  const renderTotalAmountForSecondInstallmentield = ({
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
        helperText="Second Installment Expected Amount"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.secondPaymentAmountExpected}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
    );
  };

  const renderTotalAmountForThirdInstallmentield = ({
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
        helperText="Third Installment Expected Amount"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.thirdPaymentAmountExpected}
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
    );
  };

  const renderInitialPaymentRemainingAmountield = ({
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
        helperText="Initial Installment Remaining Amount"
        variant="outlined"
        //label={label}
        id={input.name}
        value={
          params.initialPaymentAmountExpected - params.initialPaymentAmountPaid
        }
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
    );
  };

  const renderSecondPaymentRemainingAmountield = ({
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
        helperText="Second Installment Remaining Amount"
        variant="outlined"
        //label={label}
        id={input.name}
        value={
          params.secondPaymentAmountExpected - params.secondPaymentAmountPaid
        }
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
    );
  };

  const renderThirdPaymentRemainingAmountield = ({
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
        helperText="Third Installment Remaining Amount"
        variant="outlined"
        //label={label}
        id={input.name}
        value={
          params.thirdPaymentAmountExpected - params.thirdPaymentAmountPaid
        }
        fullWidth
        //required
        type={type}
        {...custom}
        style={{ marginTop: 10 }}
        //disabled

        //onChange={handleInput}
      />
    );
  };

  const onSubmit = (formValues) => {
    let totalAmountAlreadyPaid =
      parseFloat(params.totalAmountAlreadyPaid) +
      parseFloat(formValues.amountToBePaid);

    let currentPaymentRound = 1;
    let initialPaymentAmountPaid = params.initialPaymentAmountPaid;
    let secondPaymentAmountPaid = params.secondPaymentAmountPaid;
    let thirdPaymentAmountPaid = params.thirdPaymentAmountPaid;
    let paymentStatus = "";

    if (formValues.currentPaymentRound) {
      currentPaymentRound = formValues.currentPaymentRound;
    } else {
      currentPaymentRound = currentPaymentRound;
    }

    if (
      parseFloat(params.totalAmountExpected) -
        parseFloat(params.totalAmountAlreadyPaid) <=
      0
    ) {
      paymentStatus = "full";
    } else {
      paymentStatus = "partial";
    }

    const data = {
      currentPaymentRound: currentPaymentRound,
      totalAmountAlreadyPaid: totalAmountAlreadyPaid,
      paymentStatus: paymentStatus,
      paymentBreakdown: {
        initialPaymentInstallment: {
          percentageForInitialPayment: params.percentageForInitialPayment,
          initialPaymentAmountExpected: params.initialPaymentAmountExpected,
          initialPaymentAmountPaid:
            currentPaymentRound === "1"
              ? parseFloat(initialPaymentAmountPaid) +
                parseFloat(formValues.amountToBePaid)
              : params.initialPaymentAmountPaid,

          lastInitialPaymentAmountMade:
            currentPaymentRound === "1"
              ? parseFloat(formValues.amountToBePaid)
              : params.lastInitialPaymentAmountMade,
        },
        secondInstallmentPayment: {
          percentageForSecondPayment: params.percentageForSecondPayment,
          secondPaymentAmountExpected: params.secondPaymentAmountExpected,
          secondPaymentAmountPaid:
            currentPaymentRound === "2"
              ? parseFloat(thirdPaymentAmountPaid) +
                parseFloat(formValues.amountToBePaid)
              : params.secondPaymentAmountPaid,

          lastSecondPaymentAmountMade:
            currentPaymentRound === "2"
              ? parseFloat(formValues.amountToBePaid)
              : params.lastSecondPaymentAmountMade,
        },
        thirdInstallmentPayment: {
          percentageForThirdPayment: params.percentageForThirdPayment,
          thirdPaymentAmountExpected: params.thirdPaymentAmountExpected,
          thirdPaymentAmountPaid:
            currentPaymentRound === "3"
              ? parseFloat(thirdPaymentAmountPaid) +
                parseFloat(formValues.amountToBePaid)
              : params.thirdPaymentAmountPaid,

          lastThirdPaymentAmountMade:
            currentPaymentRound === "3"
              ? parseFloat(formValues.amountToBePaid)
              : params.lastThirdPaymentAmountMade,
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
          Book New payment
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="paymentForm"
        // onSubmit={onSubmit}
        sx={{
          width: 550,
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
              id="order"
              name="order"
              type="text"
              component={renderOrderForPaymentField}
            />
          </Grid>
          <Grid item style={{ width: "58%", marginLeft: 10 }}>
            <Field
              label=""
              id="customer"
              name="customer"
              type="text"
              component={renderOrderedCustomerid}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="agreedPaymentCurrency"
          name="agreedPaymentCurrency"
          type="text"
          component={renderAgreedPaymentCurrencyField}
          style={{ marginTop: 10 }}
        />
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="totalAmountExpected"
              name="totalAmountExpected"
              type="number"
              component={rendertotalExpectedAmountField}
            />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 10 }}>
            <Field
              label=""
              id="totalAmountAlreadyPaid"
              name="totalAmountAlreadyPaid"
              type="number"
              component={renderTotalAmountAlreadyPaidField}
            />
          </Grid>
          <Grid item style={{ width: "34%", marginLeft: 10 }}>
            <Field
              label=""
              id="remainingamount"
              name="remainingamount"
              type="number"
              component={renderRemainingAmountField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="initialPaymentAmountExpected"
              name="initialPaymentAmountExpected"
              type="number"
              component={renderTotalAmountForFirstInstallmentield}
            />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 10 }}>
            <Field
              label=""
              id="secondPaymentAmountExpected"
              name="secondPaymentAmountExpected"
              type="number"
              component={renderTotalAmountForSecondInstallmentield}
            />
          </Grid>
          <Grid item style={{ width: "34%", marginLeft: 10 }}>
            <Field
              label=""
              id="thirdPaymentAmountExpected"
              name="thirdPaymentAmountExpected"
              type="number"
              component={renderTotalAmountForThirdInstallmentield}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="initialPaymentRemainingAmount"
              name="initialPaymentRemainingAmount"
              type="number"
              component={renderInitialPaymentRemainingAmountield}
            />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 10 }}>
            <Field
              label=""
              id="secondPaymentRemainingAmount"
              name="secondPaymentRemainingAmount"
              type="number"
              component={renderSecondPaymentRemainingAmountield}
            />
          </Grid>
          <Grid item style={{ width: "34%", marginLeft: 10 }}>
            <Field
              label=""
              id="thirdPaymentRemainingAmount"
              name="thirdPaymentRemainingAmount"
              type="number"
              component={renderThirdPaymentRemainingAmountield}
            />
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: 20 }}>
          <Field
            label=""
            id="currentPaymentRound"
            name="currentPaymentRound"
            type="text"
            component={renderSelectablePaymentPhaseField}
          />
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          {/* <Grid item style={{ width: "30%" }}>
            <Field
              label=""
              id="paymentStatus"
              name="paymentStatus"
              type="text"
              component={renderPaymentStatusField}
            />
          </Grid> */}
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          {/* <Grid item style={{ width: "40%" }}>
            <Field
              label=""
              id="operationalCurrency"
              name="operationalCurrency"
              type="text"
              component={renderOperationalCurrencyField}
            />
          </Grid> */}
          <Grid item style={{ width: "100%" }}>
            <Field
              label=""
              id="amountToBePaid"
              name="amountToBePaid"
              type="number"
              component={renderAmountToBePaidField}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Book Payment
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "paymentForm",
})(PaymentBookingForm);
