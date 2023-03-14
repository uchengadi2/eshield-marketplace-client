import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
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
import { EDIT_PAYMENT } from "../../actions/types";

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
      helperText="Amount TopUp"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      // defaultValue={params.amountPaid}
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
function PaymentEditForm(props) {
  const { params } = props;
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
  const [paymentCurrency, setPaymentCurrency] = useState(
    params.paymentCurrency
  );
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
  const [orderForDelivery, setOrderForDelivery] = useState(params.transaction);
  const [orderNumber, setOrderNumber] = useState(params.orderNumber);
  const [orderedQuantity, setOrderedQuantity] = useState();
  const [orderedPrice, setOrderedPrice] = useState(0);
  const [totalDeliveryCost, setTotalDeliveryCost] = useState(0);
  const [totalProductCost, setTotalProductCost] = useState(
    params.totalProductCost
  );
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
  const [currentPaymentConfirmation, setCurrentPaymentConfirmation] = useState(
    params.paymentConfirmationStatus
  );
  const [paymentConfirmation, setPaymentConfirmation] = useState(
    params.paymentConfirmationStatus
  );

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/transactions/${orderForDelivery}`);
      const item = response.data.data.data;

      allData.push({
        id: item._id,
        orderNumber: item.orderNumber,

        currency: item.productCurrency,
        // location: item.productLocation,
        // country: item.locationCountry,
        totalDeliveryCost: item.totalDeliveryCost,
        totalProductCost: item.totalProductCost,
        recipientName: item.recipientName,
        recipientPhoneNumber: item.recipientPhoneNumber,
        recipientAddress: item.recipientAddress,
        recipientState: item.recipientState,
        recipientCountry: item.recipientCountry,
        dateOrdered: new Date(item.transactionDate).toISOString().slice(0, 10),
        orderedBy: item.orderedBy,
        paymentStatus: item.paymentStatus,
        paymentMethod: item.paymentMethod,
        status: item.status,
        rejectionReason: item.rejectionReason,
      });

      if (!allData) {
        return;
      }

      setOrderNumber(allData[0].orderNumber);
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
      setCurrency(allData[0].currency);
    };

    //call the function

    fetchData().catch(console.error);
  }, [orderForDelivery]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/transactions`);
      const workingData = response.data.data.data;
      workingData.map((transaction) => {
        allData.push({ id: transaction._id, name: transaction.orderNumber });
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
            //{...input}
            readOnly
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
            style={{ width: 500, marginTop: 0, height: 38 }}
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

  const renderConfirmationPaymentStatusField = ({
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
          readOnly: true,
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
          readOnly: true,
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
          readOnly: true,
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
          readOnly: true,
        }}
      />
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
      <TextField
        //error={touched && invalid}
        helperText="Payment Status"
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
          readOnly: true,
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
          readOnly: true,
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
        inputProps={{
          readOnly: true,
        }}
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
          readOnly: true,
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
          readOnly: true,
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
          readOnly: true,
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
          readOnly: true,
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
        // defaultValue={
        //   totalProductCost
        //   .toFixed(2)
        //   .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        // }
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
          readOnly: true,
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

  const renderAmountAlreadyPaidField = ({
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
        label={label}
        id={input.name}
        //value={formInput.name}
        // defaultValue={params.amountPaid}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        inputProps={{
          style: {
            height: 1,
          },
          readOnly: true,
        }}
      />
    );
  };

  //   const DateOrdered = params.dateOrdered
  //     ? new Date(params.dateOrdered).toISOString().slice(0, 10)
  //     : "";

  const buttonContent = () => {
    return <React.Fragment> Process Payment</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!formValues["amountPaid"] && !params.amountPaid) {
      props.handleFailedSnackbar("Please enter the amount paid and try again");
      setLoading(false);
      return;
    }

    if (!paymentConfirmation && !currentPaymentConfirmation) {
      props.handleFailedSnackbar(
        "Please enter the payment confirmation status and try again"
      );
      setLoading(false);
      return;
    }

    if (!formValues["paymentDate"] && !params.paymentDate) {
      props.handleFailedSnackbar("Please enter the payment date and try again");
      setLoading(false);
      return;
    }

    let paymentamount;
    // if (!formValues["amountPaid"]) {
    //   paymentamount = params.amountPaid;
    // } else {
    //   paymentamount = formValues["amountPaid"];
    // }

    // const totalExpectedPayment = +totalProductCost + +totalDeliveryCost;

    // if (paymentConfirmation === "confirmed-full") {
    //   if (+paymentamount !== +totalExpectedPayment) {
    //     props.handleFailedSnackbar(
    //       "The amount paid is not eqaul to the total amount expected. Change the payment confirmation status or enter the correct total amount"
    //     );
    //     setLoading(false);
    //     return;
    //   }
    // }

    const dataValue = {
      refNumber: "PAY-" + Math.floor(Math.random() * 100000000) + "-OR",
      transaction: orderForDelivery,
      orderNumber: orderNumber,
      customer: orderedBy,
      totalProductAmount: totalProductCost,
      totalDeliveryCost: totalDeliveryCost,
      paymentCurrency: paymentCurrency,
      paymentConfirmationStatus: paymentConfirmation,
      paymentConfirmedBy: props.userId,
      paymentDate: formValues["paymentDate"]
        ? formValues["paymentDate"]
        : paymentDate,
      amountAlreadyPaid: parseFloat(formValues["amountPaid"])
        ? parseFloat(formValues["amountPaid"]) + params.amountAlreadyPaid
        : parseFloat(params.amountAlreadyPaid),
    };

    if (dataValue) {
      const editForm = async () => {
        //confirm if this order is already assigned

        //assign this order to a logistic partner

        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/payments/${params.id}`, dataValue);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_PAYMENT,
            payload: response.data.data.data,
          });

          //change the status of this order

          if (paymentConfirmation === "confirmed-full") {
            const data = {
              paymentStatus: "paid",
            };
            const orderResponse = await api.patch(
              `/transactions/${orderForDelivery}`,
              data
            );
          }

          props.handleSuccessfulEditSnackbar(
            `This payment is processed successfully!!!`
          );
          props.handleEditDialogOpenStatus();
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

  const paymentDate = params.paymentDate
    ? new Date(params.paymentDate).toISOString().slice(0, 10)
    : "";

  return (
    <div>
      <form id="paymentEditForm" className={classes.formStyles}>
        <Grid
          item
          container
          style={{ marginTop: 1, marginBottom: 2 }}
          justifyContent="center"
        >
          <CancelRoundedIcon
            style={{
              marginLeft: 520,
              fontSize: 30,
              marginTop: "-20px",
              cursor: "pointer",
            }}
            onClick={() => [props.handleEditDialogOpenStatus()]}
          />
        </Grid>
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "grey", fontSize: "1.3em" }}
            component="legend"
          >
            <Typography variant="h5">Process Payment</Typography>
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
          <Grid container direction="row" style={{ marginTop: 20 }}></Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "100%" }}>
              <Field
                label=""
                id="orderNumber"
                name="orderNumber"
                //defaultValue={params.orderNumber}
                type="text"
                component={renderOrderNumberField}
              />
            </Grid>
          </Grid>

          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Customer Details
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="transactionDate"
                name="transactionDate"
                //defaultValue={DateOrdered}
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
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="customerEmail"
                name="customerEmail"
                //defaultValue={customerEmail}
                type="text"
                component={renderCustomerEmailField}
              />
            </Grid>
            <Grid item style={{ width: 240, marginLeft: 10 }}>
              <Field
                label=""
                id="customerPhoneNumber"
                name="customerPhoneNumber"
                // defaultValue={customerPhoneNumber}
                type="text"
                component={renderCustomerPhoneNumberField}
              />
            </Grid>
          </Grid>

          <Grid item container style={{ marginTop: 15 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Recipient Details
            </FormLabel>
          </Grid>

          <Field
            label=""
            id="recipientName"
            name="recipientName"
            //defaultValue={params.recipientName}
            type="text"
            component={renderRecipientNameField}
            style={{ marginTop: 10 }}
          />

          <Field
            label=""
            id="recipientPhoneNumber"
            name="recipientPhoneNumber"
            //defaultValue={params.recipientPhoneNumber}
            type="text"
            component={renderRecipientPhoneNumberField}
            style={{ marginTop: 10 }}
          />

          <Field
            label=""
            id="recipientAddress"
            name="recipientAddress"
            //defaultValue={params.recipientAddress}
            type="text"
            component={renderRecipientAddressField}
            style={{ marginTop: 10 }}
          />

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="recipientCountry"
                name="recipientCountry"
                type="number"
                component={renderRecipientCountryField}
              />
            </Grid>
            <Grid item style={{ width: 250, marginLeft: 0 }}>
              <Field
                label=""
                id="recipientState"
                name="recipientState"
                type="number"
                component={renderRecipientStateField}
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
                defaultValue={
                  params.totalDeliveryCost
                    ? params.totalDeliveryCost
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : 0
                }
                type="text"
                component={renderTotalDeliveryCostField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="totalProductCost"
                name="totalProductCost"
                defaultValue={
                  totalProductCost
                    ? totalProductCost
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : 0
                }
                type="text"
                component={renderTotalProductCostField}
              />
            </Grid>

            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="status"
                name="status"
                //defaultValue={params.status}
                type="text"
                component={renderOrderStatusField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="productCurrency"
            name="productCurrency"
            defaultValue={params.currency}
            type="text"
            component={renderProductCurrencyField}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="paymentStatus"
                name="paymentStatus"
                defaultValue={paymentStatus}
                type="text"
                component={renderPaymentStatusField}
              />
            </Grid>
            <Grid item style={{ width: 240, marginLeft: 10 }}>
              <Field
                label=""
                id="paymentMethod"
                name="paymentMethod"
                defaultValue={paymentMethod}
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
            <Grid item style={{ width: 150 }}>
              <Field
                label=""
                id="amountAlreadyPaid"
                name="amountAlreadyPaid"
                defaultValue={params.amountAlreadyPaid
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                type="text"
                component={renderAmountAlreadyPaidField}
              />
            </Grid>
            <Grid item style={{ width: 150, marginLeft: 10 }}>
              <Field
                label=""
                id="amountPaid"
                name="amountPaid"
                defaultValue={0}
                type="text"
                component={renderAmountPaidField}
              />
            </Grid>
            <Grid item style={{ width: 180, marginLeft: 10 }}>
              <Field
                label=""
                id="paymentDate"
                name="paymentDate"
                defaultValue={paymentDate}
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
            component={renderConfirmationPaymentStatusField}
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
  form: "paymentEditForm",
})(PaymentEditForm);
