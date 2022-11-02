import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import api from "./../../apis/local";
import { PROCESS_REMITTANCE } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  formStyles: {
    width: 500,
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
  firstSection: {
    width: 300,
  },
}));

const renderDateRemittedField = ({
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
      helperText="Remittance Date"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const renderAmountForRemittanceField = ({
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
      helperText="Amount to be Remitted"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const renderAccountTitleField = ({
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
      helperText="Account Title"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const renderBankAccountNumberField = ({
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
      helperText="Account Number"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const renderBankNameField = ({
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
      helperText="Bank Name"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const renderChequeNumberField = ({
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
      helperText="Cheque Number"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const renderChequeBankOwnerField = ({
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
      helperText="Cheque Bank Owner"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

function RemittanceForm(props) {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [product, setProduct] = useState();
  const [vendor, setVendor] = useState();
  const [image, setImage] = useState();
  const [cityList, setCityList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [currency, setCurrency] = useState();
  const [paymentCurrency, setPaymentCurrency] = useState();
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [recipientState, setRecipientState] = useState();
  const [recipientCountry, setRecipientCountry] = useState();
  const [recipientStateList, setRecipientStateList] = useState([]);
  const [recipientCountryList, setRecipientCountryList] = useState([]);
  const [orderedByList, setOrderedByList] = useState([]);
  const [orderedBy, setOrderedBy] = useState();
  const [actionStatus, setActionStatus] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [orderForDeliveryList, setOrderForDeliveryList] = useState([]);
  const [orderForDelivery, setOrderForDelivery] = useState();
  const [orderNumber, setOrderNumber] = useState();
  const [orderedQuantity, setOrderedQuantity] = useState();
  const [orderedPrice, setOrderedPrice] = useState(0);
  const [totalDeliveryCost, setTotalDeliveryCost] = useState(0);
  const [totalProductCost, setTotalProductCost] = useState(0);
  const [recipientName, setRecipientName] = useState();
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState();
  const [recipientAddress, setRecipientAddress] = useState();
  const [dateOrdered, setDateOrdered] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const [rejectionReason, setRejectionReason] = useState();
  const [currencyName, setCurrencyName] = useState();
  const [sku, setSku] = useState();
  const [logisticsPartnerCountry, setLogisticsPartnerCountry] = useState();
  const [logisticsPartnerState, setLogisticsPartnerState] = useState();
  const [logisticsPartnerCountryList, setlogisticsPartnerCountryList] =
    useState([]);
  const [logisticsPartnerStateList, setlogisticsPartnerStateList] = useState(
    []
  );
  const [logisticsPartner, setLogisticsPartner] = useState();
  const [logisticsPartnerList, setLogisticsPartnerList] = useState([]);
  const [paymentConfirmation, setPaymentConfirmation] = useState();
  const [paymentForRemittance, setPaymentForRemittance] = useState();
  const [paymentForRemittanceList, setPaymentForRemittanceList] = useState([]);
  const [productVendor, setProductVendor] = useState();
  const [customerForOrder, setCustomerForOrder] = useState();
  const [totalProductAmount, setTotalProductAmount] = useState();
  const [amountPaid, setAmountPaid] = useState(0);
  const [paymentConfirmedBy, setPaymentConfirmedBy] = useState();
  const [paymentDate, setPaymentDate] = useState();
  const [remittanceStatus, setRemittanceStatus] = useState();
  const [remittanceMethod, setRemittanceMethod] = useState();
  const [isChequePayment, setIsChequePayment] = useState(false);
  const [totalSumRemittance, setTotalSumRemittance] = useState();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/payments/${paymentForRemittance}`);
      const item = response.data.data.data;

      allData.push({
        id: item._id,
        order: item.order,
        vendor: item.vendor,
        customer: item.customer,
        totalProductAmount: item.totalProductAmount,
        totalDeliveryCost: item.totalDeliveryCost,
        amountPaid: item.amountPaid,
        paymentConfirmationStatus: item.paymentConfirmationStatus,
        paymentConfirmedBy: item.paymentConfirmedBy,
        paymentDate: new Date(item.paymentDate).toISOString().slice(0, 10),
        totalSumRemittance: item.totalSumRemittance,
      });

      if (!allData) {
        return;
      }
      setOrderForDelivery(allData[0].order);
      setProductVendor(allData[0].vendor);
      setCustomerForOrder(allData[0].customer);
      setTotalProductAmount(allData[0].totalProductAmount);
      setAmountPaid(allData[0].amountPaid);
      setPaymentConfirmation(allData[0].paymentConfirmationStatus);
      setPaymentConfirmedBy(allData[0].paymentConfirmedBy);
      setPaymentDate(allData[0].paymentDate);
    };

    //call the function

    fetchData().catch(console.error);
  }, [paymentForRemittance]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/payments`);
      const workingData = response.data.data.data;
      workingData.map((payment) => {
        allData.push({ id: payment._id, name: payment.refNumber });
      });
      setPaymentForRemittanceList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/orders/${orderForDelivery}`);
      const item = response.data.data.data;

      allData.push({
        id: item._id,
        orderNumber: item.orderNumber,
        product: item.product,
        vendor: item.productVendor,
        orderedQuantity: item.orderedQuantity,
        orderedPrice: item.orderedPrice,
        currency: item.productCurrency,
        location: item.productLocation,
        country: item.locationCountry,
        totalDeliveryCost: item.totalDeliveryCost,
        totalProductCost: item.totalProductCost,
        recipientName: item.recipientName,
        recipientPhoneNumber: item.recipientPhoneNumber,
        recipientAddress: item.recipientAddress,
        recipientState: item.recipientState,
        recipientCountry: item.recipientCountry,
        dateOrdered: new Date(item.dateOrdered).toISOString().slice(0, 10),
        orderedBy: item.orderedBy,
        paymentStatus: item.paymentStatus,
        paymentMethod: item.paymentMethod,
        status: item.status,
        rejectionReason: item.rejectionReason,
        sku: item.sku,
      });

      if (!allData) {
        return;
      }

      setVendor(allData[0].vendor);
      setOrderNumber(allData[0].orderNumber);
      setProduct(allData[0].product);
      setOrderedQuantity(allData[0].orderedQuantity);
      setOrderedPrice(allData[0].orderedPrice);
      setCurrency(allData[0].currency);
      setLocation(allData[0].location);
      setCountry(allData[0].country);
      setTotalDeliveryCost(allData[0].totalDeliveryCost);
      setTotalProductCost(allData[0].totalProductCost);
      setRecipientName(allData[0].recipientName);
      setRecipientPhoneNumber(allData[0].recipientPhoneNumber);
      setRecipientAddress(allData[0].recipientAddress);
      setRecipientState(allData[0].recipientState);
      setRecipientCountry(allData[0].recipientCountry);
      setDateOrdered(allData[0].dateOrdered);
      setOrderedBy(allData[0].orderedBy);
      setPaymentStatus(allData[0].paymentStatus);
      setPaymentMethod(allData[0].paymentMethod);
      setOrderStatus(allData[0].status);
      setRejectionReason(allData[0].rejectionReason);
      setSku(allData[0].sku);
    };

    //call the function

    fetchData().catch(console.error);
  }, [orderForDelivery]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/orders`);
      const workingData = response.data.data.data;
      workingData.map((order) => {
        allData.push({ id: order._id, name: order.orderNumber });
      });
      setOrderForDeliveryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/logisticspartners`, {
        params: { partnerState: logisticsPartnerState },
      });
      const workingData = response.data.data.data;
      workingData.map((partner) => {
        allData.push({ id: partner._id, name: partner.name });
      });
      setLogisticsPartnerList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [logisticsPartnerState]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/countries`);
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setCountryList(allData);
      setlogisticsPartnerCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/countries`);
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setRecipientCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states`, {
        params: { country: country },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [country]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states`, {
        params: { country: logisticsPartnerCountry },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });

      setlogisticsPartnerStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [logisticsPartnerCountry]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/states`, {
        params: { country: country },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setRecipientStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [recipientCountry]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/cities`);
      const workingData = response.data.data.data;
      workingData.map((city) => {
        allData.push({ id: city._id, name: city.name });
      });
      setCityList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/users`);
      const workingData = response.data.data.data;
      workingData.map((user) => {
        allData.push({ id: user._id, name: user.name });
      });
      setOrderedByList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/products`);
      const workingData = response.data.data.data;
      workingData.map((product) => {
        allData.push({ id: product._id, name: product.name });
      });
      setProductList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/vendors`);
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
      });
      setVendorList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/users/${orderedBy}`);
      const item = response.data.data.data;

      allData.push({
        id: item._id,
        name: item.name,
        email: item.email,
        phoneNumber: item.phoneNumber,
      });

      if (!allData) {
        return;
      }

      setCustomerEmail(allData[0].email);
      setCustomerPhoneNumber(allData[0].phoneNumber);
    };

    //call the function

    fetchData().catch(console.error);
  }, [orderedBy]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies`);
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
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${currency}`);
      const item = response.data.data.data;

      allData.push({ id: item._id, name: item.name });
      setCurrencyName(allData[0].name);
      setPaymentCurrency(allData[0].userId);
    };

    //call the function

    fetchData().catch(console.error);
  }, [currency]);

  //get the order for delivery list
  const renderOrderForDeliveryList = () => {
    return orderForDeliveryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the vendor list
  const renderVendorList = () => {
    return vendorList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the city list
  const renderCityList = () => {
    return cityList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the product list
  const renderProductList = () => {
    return productList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the currency list
  const renderCurencyList = () => {
    return currencyList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the state list
  const renderLocationList = () => {
    return stateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the state list
  const renderRecipientStateList = () => {
    return recipientStateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the country list
  const renderCountryList = () => {
    return countryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the logistics partner country list
  const renderLogisticsPartnerCountryList = () => {
    return logisticsPartnerCountryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the logistics partner state list
  const renderLogisticsPartnerStateList = () => {
    return logisticsPartnerStateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the country list
  const renderRecipientCountryList = () => {
    return recipientCountryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the ordered by list
  const renderOrderedByList = () => {
    return orderedByList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the logistics partners list
  const renderLogisticsPartnersList = () => {
    return logisticsPartnerList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the remittance list
  const renderPaymentForRemittanceList = () => {
    return paymentForRemittanceList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const getCurrencyCode = () => {
    if (currencyName) {
      if (currencyName.toLowerCase() === "naira") {
        return <span>&#8358;</span>;
      } else {
        return;
      }
    }
  };

  const onImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleRecipientCountryChange = (event) => {
    setRecipientCountry(event.target.value);
  };

  const handleRecipientStateChange = (event) => {
    setRecipientState(event.target.value);
  };

  const handleOrderedByChange = (event) => {
    setOrderedBy(event.target.value);
  };

  const handleActionStatusChange = (event) => {
    setActionStatus(event.target.value);
  };

  const handleOrderForDeliveryChange = (event) => {
    setOrderForDelivery(event.target.value);
  };

  const handlePartnerCountryChange = (event) => {
    setLogisticsPartnerCountry(event.target.value);
  };

  const handlePartnerStateChange = (event) => {
    setLogisticsPartnerState(event.target.value);
  };

  const handleLogisticsPartnerChange = (event) => {
    setLogisticsPartner(event.target.value);
  };

  const handlePaymentConfirmationChange = (event) => {
    setPaymentConfirmation(event.target.value);
  };

  const handlePaymentForRemittanceChange = (event) => {
    setPaymentForRemittance(event.target.value);
  };

  const handleRemittanceStatusChange = (event) => {
    setRemittanceStatus(event.target.value);
  };

  const handleRemittanceMethodChange = (event) => {
    setRemittanceMethod(event.target.value);

    if (event.target.value === "cheque-payment") {
      setIsChequePayment(true);
    } else {
      setIsChequePayment(false);
    }
  };

  const renderRemittanceStatusField = ({
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
            labelId="remittanceStatus"
            id="remittanceStatus"
            value={remittanceStatus}
            onChange={handleRemittanceStatusChange}
            label="Remittance Status"
            style={{ width: 500, height: 38, marginTop: 20 }}
          >
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"partial"}>Partial Remittance</MenuItem>
            <MenuItem value={"complete"}>Completed</MenuItem>
          </Select>
          <FormHelperText>Remittance Status</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderRemittancMethodeField = ({
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
            labelId="remittanceMethod"
            id="remittanceMethod"
            value={remittanceMethod}
            onChange={handleRemittanceMethodChange}
            label="Remittance Status"
            style={{ width: 250, height: 38, marginTop: 5 }}
          >
            <MenuItem value={"cash-payment"}>Cash Payout</MenuItem>
            <MenuItem value={"bank-transfer"}>Bank Transfer</MenuItem>
            <MenuItem value={"cheque-payment"}>Cheque</MenuItem>
          </Select>
          <FormHelperText>Remittance Method</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderRemittanceCurrencyField = ({
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
            labelId="remittanceCurrency"
            id="remittanceCurrency"
            value={currency}
            onChange={handleCurrencyChange}
            label="Currency"
            style={{ width: 240, marginTop: 5, height: 38, marginLeft: 10 }}
            readOnly
            //{...input}
          >
            {renderCurencyList()}
          </Select>
          <FormHelperText>Remittance Currency</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPaymentField = ({
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
            labelId="paymentForRemittance"
            id="paymentForRemittance"
            value={paymentForRemittance}
            onChange={handlePaymentForRemittanceChange}
            label="Payment"
            style={{ width: 500, marginTop: 10, height: 38 }}

            //{...input}
          >
            {renderPaymentForRemittanceList()}
          </Select>
          <FormHelperText>Payment Reference Number</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderLogisticsPartnersField = ({
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
            labelId="logisticsPartner"
            id="logisticsPartner"
            value={logisticsPartner}
            onChange={handleLogisticsPartnerChange}
            label="Logistics Partner"
            style={{ width: 510, marginTop: 10, height: 38 }}
            readOnly
            //{...input}
          >
            {renderLogisticsPartnersList()}
          </Select>
          <FormHelperText>Logistics Partner</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderOrderForDeliveryField = ({
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
            labelId="orderForDelivery"
            id="orderForDelivery"
            value={orderForDelivery}
            onChange={handleOrderForDeliveryChange}
            label="Order Number"
            style={{ width: 500, marginTop: 10, height: 38 }}
            readOnly
            //{...input}
          >
            {renderOrderForDeliveryList()}
          </Select>
          <FormHelperText>Order Number</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductCountryField = ({
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
            value={country}
            onChange={handleCountryChange}
            label="Country"
            style={{ width: 250, marginTop: 0, height: 38 }}
            readOnly
            //{...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Product Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderLogisticsPartnerCountryField = ({
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
            labelId="logisticsPartnerCountry"
            id="logisticsPartnerCountry"
            value={logisticsPartnerCountry}
            onChange={handlePartnerCountryChange}
            label="Country"
            style={{ width: 250, marginTop: 0, height: 38 }}
            readOnly
            //{...input}
          >
            {renderLogisticsPartnerCountryList()}
          </Select>
          <FormHelperText>Logistics Partner Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderLogisticsPartnerStateField = ({
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
            labelId="logisticsPartnerState"
            id="logisticsPartnerState"
            value={logisticsPartnerState}
            onChange={handlePartnerStateChange}
            label="State"
            style={{ width: 250, marginTop: 0, height: 38 }}
            readOnly
            //{...input}
          >
            {renderLogisticsPartnerStateList()}
          </Select>
          <FormHelperText>Logistics Partner State</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderRecipientCountryField = ({
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
            labelId="recipientCountry"
            id="recipientCountry"
            value={recipientCountry}
            onChange={handleRecipientCountryChange}
            label="Country"
            style={{ width: 250, marginTop: 0, height: 38 }}
            readOnly
            //{...input}
          >
            {renderRecipientCountryList()}
          </Select>
          <FormHelperText>Recipient Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductLocationField = ({
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
            labelId="location"
            id="location"
            value={location}
            onChange={handleLocationChange}
            label="Location"
            style={{ width: 240, marginTop: 0, height: 38, marginLeft: 10 }}
            readOnly
            //{...input}
          >
            {renderLocationList()}
          </Select>
          <FormHelperText>Product Location</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderRecipientStateField = ({
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
            labelId="recipientState"
            id="recipientState"
            value={recipientState}
            onChange={handleRecipientStateChange}
            label="Recipient State"
            style={{ width: 240, marginTop: 0, height: 38, marginLeft: 10 }}
            readOnly
            //{...input}
          >
            {renderRecipientStateList()}
          </Select>
          <FormHelperText>Recipient State</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVendorField = ({
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
            labelId="vendor"
            id="vendor"
            value={vendor}
            onChange={handleVendorChange}
            label="Vendor"
            style={{ width: 350, marginTop: 0, height: 38 }}
            readOnly
            //{...input}
          >
            {renderVendorList()}
          </Select>
          <FormHelperText>Vendor</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductCurrencyField = ({
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
            labelId="currency"
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
            label="Currency"
            style={{ width: 500, marginTop: 10, height: 38 }}
            readOnly
            //{...input}
          >
            {renderCurencyList()}
          </Select>
          <FormHelperText>Price Currency</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductField = ({
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
            labelId="product"
            id="product"
            value={product}
            onChange={handleProductChange}
            label="Product"
            style={{ marginTop: 10, width: 500, height: 38, marginLeft: 0 }}
            readOnly
            //{...input}
          >
            {renderProductList()}
          </Select>
          <FormHelperText>Product</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderLocationCityField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.formControl}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="city"
            id="city"
            value={city}
            onChange={handleCityChange}
            label="City"
            style={{ marginTop: 20, width: 500, height: 38 }}
            readOnly
            //{...input}
          >
            {renderCityList()}
          </Select>
          <FormHelperText>Current Location</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderOrderedByField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.formControl}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="orderedBy"
            id="orderedBy"
            value={orderedBy}
            onChange={handleOrderedByChange}
            label="OrderedBy"
            style={{ marginLeft: 10, width: 240, height: 38 }}
            readOnly
            //{...input}
          >
            {renderOrderedByList()}
          </Select>
          <FormHelperText>Ordered By</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPaymentStatusField = ({
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
            labelId="paymentConfirmation"
            id="paymentConfirmation"
            value={paymentConfirmation}
            onChange={handlePaymentConfirmationChange}
            label="Payment Confirmation"
            style={{ width: 500, height: 38, marginTop: 20 }}
            readOnly
          >
            <MenuItem value={"confirmed-full"}>Confirmed Full Payment</MenuItem>
            <MenuItem value={"confirmed-partial"}>
              Confirmed Partial Payment
            </MenuItem>
            <MenuItem value={"not-confirmed"}>Payment Not Confirmed</MenuItem>
          </Select>
          <FormHelperText>Payment Confirmation Status</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCustomerEmailField = ({
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
        helperText="Customer Email"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={customerEmail}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderCustomerPhoneNumberField = ({
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
        helperText="Customer Phone Number"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={customerPhoneNumber}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderOrderNumberField = ({
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
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={orderNumber}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderPaymentMethodField = ({
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
        helperText="Payment Method"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={paymentMethod}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderOrderPaymentStatusField = ({
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
        helperText="Order Payment Status"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={paymentStatus}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderOrderStatusField = ({
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
        helperText="Order Status"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={orderStatus}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderRecipientAddressField = ({
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
        helperText="Recipient Address"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={recipientAddress}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        multiline={true}
        minRows={3}
      />
    );
  };

  const renderRecipientPhoneNumberField = ({
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
        helperText="Recipient Phone Number"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={recipientPhoneNumber}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderRecipientNameField = ({
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
        helperText="Recipient Name"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={recipientName}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderSkuField = ({
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
        helperText="Sku"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={sku}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderDateOrderedField = ({
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
        helperText="Date Ordered"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={dateOrdered}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderTotalDeliveryCostField = ({
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
        helperText="Delivery Cost"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={totalDeliveryCost
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderTotalProductCostField = ({
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
        helperText="Product Cost"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={totalProductCost
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderOrderedPriceField = ({
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
        helperText="Ordered Price"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={orderedPrice
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderOrderedQuantityField = ({
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
        helperText="Ordered Quantity"
        variant="outlined"
        label={label}
        id={input.name}
        //value={formInput.name}
        defaultValue={orderedQuantity}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderAmountPaidField = ({
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
        helperText="Amount Paid"
        variant="outlined"
        label={label}
        id={input.name}
        defaultValue={amountPaid.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const renderPaymentDateField = ({
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
        helperText="Payment Date"
        variant="outlined"
        label={label}
        id={input.name}
        defaultValue={paymentDate}
        //value={formInput.name}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
        }}
      />
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Process Remittance</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!formValues["amountRemitted"]) {
      props.handleFailedSnackbar(
        "Please enter the amount to be remitted and try again"
      );
      setLoading(false);
      return;
    }

    if (!formValues["dateRemitted"]) {
      props.handleFailedSnackbar(
        "Please enter the remittance date and try again"
      );
      setLoading(false);
      return;
    }

    if (!remittanceMethod) {
      props.handleFailedSnackbar(
        "Please enter the remittance method and try again"
      );
      setLoading(false);
      return;
    }

    if (!remittanceStatus) {
      props.handleFailedSnackbar(
        "Please enter the remittance status and try again"
      );
      setLoading(false);
      return;
    }

    if (+amountPaid < +formValues["amountRemitted"]) {
      props.handleFailedSnackbar(
        "You cannot remit more than the customer had paid for the order. Change the remittance amount and try again"
      );
      setLoading(false);
      return;
    }

    const dataValue = {
      refNumber: "REM-" + Math.floor(Math.random() * 100000000) + "-PY",
      order: orderForDelivery,
      vendor: vendor,
      customer: orderedBy,
      payment: paymentForRemittance,
      remittanceStatus: remittanceStatus,
      amountRemitted: formValues["amountRemitted"],
      totalRemittableAmount: amountPaid,
      remittanceCurrency: currency,
      dateRemitted: formValues["dateRemitted"],
      remittanceMethod: remittanceMethod,
      bankName: formValues["bankName"],
      bankAccountNumber: formValues["bankAccountNumber"],
      accountTitle: formValues["accountTitle"],
      chequeNumber: formValues["chequeNumber"],
      bankChequeOwner: formValues["bankChequeOwner"],
      postedBy: props.userId,
    };

    if (dataValue) {
      const editForm = async () => {
        //confirm if remittance had already started on this payment

        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const conResponse = await api.get(`/remittances`, {
          params: { payment: paymentForRemittance },
        });

        if (conResponse.data.results > 0) {
          props.handleFailedSnackbar(
            "Remittance had already commenced on this payment. To make additional remittances you have to edit it"
          );
          setLoading(false);
          return;
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/remittances`, dataValue);

        if (response.data.status === "success") {
          dispatch({
            type: PROCESS_REMITTANCE,
            payload: response.data.data.data,
          });

          //change the remittance status of this payment

          if (remittanceStatus !== "complete") {
            const data = {
              remittanceStatus: "pending-or-partial",
              totalSumRemitted: formValues["amountRemitted"],
            };
            const paymentResponse = await api.patch(
              `/payments/${paymentForRemittance}`,
              data
            );
          } else {
            const data = {
              remittanceStatus: "full",
              totalSumRemitted: formValues["amountRemitted"],
            };
            const paymentResponse = await api.patch(
              `/payments/${paymentForRemittance}`,
              data
            );
          }

          props.handleSuccessfulCreateSnackbar(
            `This remittance is processed successfully !!!`
          );
          props.handleDialogOpenStatus();
          setLoading(false);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      editForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  return (
    <div>
      <form id="remittanceForm" className={classes.formStyles}>
        <Grid
          item
          container
          style={{ marginTop: 20, marginBottom: 15 }}
          justifyContent="center"
        >
          <FormLabel
            style={{ color: "grey", fontSize: "1.3em" }}
            component="legend"
          >
            <Typography variant="h5">Remittance Processing</Typography>
          </FormLabel>
        </Grid>
        <Box
          sx={{
            width: 500,
            height: 420,
          }}
          noValidate
          autoComplete="off"
        >
          <Field
            label=""
            id="payment"
            name="payment"
            type="text"
            component={renderPaymentField}
          />
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Order Details
            </FormLabel>
          </Grid>
          <Field
            label=""
            id="order"
            name="order"
            type="text"
            component={renderOrderForDeliveryField}
            style={{ marginTop: 20 }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 350 }}>
              <Field
                label=""
                id="productVendor"
                name="productVendor"
                type="text"
                component={renderVendorField}
              />
            </Grid>

            <Grid item style={{ width: 140, marginLeft: 10 }}>
              <Field
                label=""
                id="sku"
                name="sku"
                type="text"
                component={renderSkuField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="product"
            name="product"
            type="text"
            component={renderProductField}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 160 }}>
              <Field
                label=""
                id="orderNumber"
                name="orderNumber"
                type="text"
                component={renderOrderNumberField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10, width: 150 }}>
              <Field
                label=""
                id="orderedQuantity"
                name="orderedQuantity"
                type="text"
                component={renderOrderedQuantityField}
              />
            </Grid>
            {/* {getCurrencyCode()} */}
            <Grid item style={{ width: 165, marginLeft: 15 }}>
              <Field
                label=""
                id="orderedPrice"
                name="orderedPrice"
                type="text"
                component={renderOrderedPriceField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="productCurrency"
            name="productCurrency"
            type="text"
            component={renderProductCurrencyField}
          />
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Customer Details
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="dateOrdered"
                name="dateOrdered"
                type="date"
                component={renderDateOrderedField}
              />
            </Grid>
            <Grid item style={{ width: 250, marginLeft: 0 }}>
              <Field
                label=""
                id="orderedBy"
                name="orderedBy"
                type="number"
                component={renderOrderedByField}
              />
            </Grid>
          </Grid>

          <Grid item container style={{ marginTop: 15 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Payment Details
            </FormLabel>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="totalDeliveryCost"
                name="totalDeliveryCost"
                type="text"
                component={renderTotalDeliveryCostField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="totalProductCost"
                name="totalProductCost"
                type="text"
                component={renderTotalProductCostField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="status"
                name="status"
                type="text"
                component={renderOrderStatusField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="orderPaymentStatus"
                name="orderPaymentStatus"
                type="text"
                component={renderOrderPaymentStatusField}
              />
            </Grid>
            <Grid item style={{ width: 240, marginLeft: 10 }}>
              <Field
                label=""
                id="paymentMethod"
                name="paymentMethod"
                type="text"
                component={renderPaymentMethodField}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Payment Confirmation Details
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="amountPaid"
                name="amountPaid"
                type="text"
                component={renderAmountPaidField}
              />
            </Grid>
            <Grid item style={{ width: 240, marginLeft: 10 }}>
              <Field
                label=""
                id="paymentDate"
                name="paymentDate"
                type="date"
                component={renderPaymentDateField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="paymentConfirmation"
            name="paymentConfirmation"
            type="text"
            component={renderPaymentStatusField}
          />

          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Remittance Details
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="amountRemitted"
                name="amountRemitted"
                type="text"
                component={renderAmountForRemittanceField}
              />
            </Grid>
            <Grid item style={{ width: 240, marginLeft: 10 }}>
              <Field
                label=""
                id="dateRemitted"
                name="dateRemitted"
                type="date"
                component={renderDateRemittedField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 10 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="remittanceMethod"
                name="remittanceMethod"
                type="text"
                component={renderRemittancMethodeField}
              />
            </Grid>
            <Grid item style={{ width: 240, marginLeft: 0 }}>
              <Field
                label=""
                id="remittanceCurrency"
                name="remittanceCurrency"
                type="date"
                component={renderRemittanceCurrencyField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 160 }}>
              <Field
                label=""
                id="bankName"
                name="bankName"
                type="text"
                component={renderBankNameField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10, width: 150 }}>
              <Field
                label=""
                id="bankAccountNumber"
                name="bankAccountNumber"
                type="text"
                component={renderBankAccountNumberField}
              />
            </Grid>
            {/* {getCurrencyCode()} */}
            <Grid item style={{ width: 165, marginLeft: 15 }}>
              <Field
                label=""
                id="accountTitle"
                name="accountTitle"
                type="text"
                component={renderAccountTitleField}
              />
            </Grid>
          </Grid>
          {isChequePayment && (
            <Grid container direction="row" style={{ marginTop: 20 }}>
              <Grid item style={{ width: 250 }}>
                <Field
                  label=""
                  id="chequeNumber"
                  name="chequeNumber"
                  type="text"
                  component={renderChequeNumberField}
                />
              </Grid>
              <Grid item style={{ width: 240, marginLeft: 10 }}>
                <Field
                  label=""
                  id="bankChequeOwner"
                  name="bankChequeOwner"
                  type="text"
                  component={renderChequeBankOwnerField}
                />
              </Grid>
            </Grid>
          )}
          <Field
            label=""
            id="remittanceStatus"
            name="remittanceStatus"
            type="text"
            component={renderRemittanceStatusField}
          />

          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={props.handleSubmit(onSubmit)}
          >
            {loading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              buttonContent()
            )}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default reduxForm({
  form: "remittanceForm",
})(RemittanceForm);
