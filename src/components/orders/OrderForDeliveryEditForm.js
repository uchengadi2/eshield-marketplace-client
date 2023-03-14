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
import { EDIT_ORDERFORDELIVERY } from "../../actions/types";

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
    width: 100,
    marginLeft: 200,
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

const renderProductNameField = ({
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
      helperText="Product name"
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

      //onChange={handleInput}
    />
  );
};

const renderProductRefNumberField = ({
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
      helperText="Reference Number"
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

      //onChange={handleInput}
    />
  );
};

const renderMultilineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
  id,
  rows,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText={helperText}
      label={label}
      id={input.name}
      // value={formInput.description}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={rows}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderProductMakeField = ({
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
      helperText="Product Make"
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

const renderProductModelField = ({
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
      helperText="Product model"
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

const renderProductSizeField = ({
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
      helperText="Product Size"
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

const renderProductColourField = ({
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
      helperText="Product color"
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

const renderProductDesignField = ({
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
      helperText="Product design"
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

const renderProductContentField = ({
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
      helperText="Product content"
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

const renderProductTasteField = ({
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
      helperText="Product taste"
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

const renderProductSmellField = ({
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
      helperText="Product smell"
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

const renderProductFeelField = ({
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
      helperText="Product feel"
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

const renderProductIngredientsField = ({
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
      helperText="Product ingredients"
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

const renderProductReliabilityField = ({
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
      helperText="Product reliability"
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

const renderProductFirstImageField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  delete input.value;
  return (
    <TextField
      id={input.name}
      variant="outlined"
      type={type}
      name={input.name}
      fullWidth
      style={{ marginTop: 20 }}
      helperText="Upload Product First Image(1000px x 1000 px, jpg/png)"
      onChange={input.onChange}
    />
  );
};

const renderImageCoverField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  delete input.value;
  return (
    <TextField
      id={input.name}
      variant="outlined"
      type={type}
      name={input.name}
      fullWidth
      style={{ marginTop: 20 }}
      helperText="Upload Product Image Cover(1000px x 1000 px, jpg/png)"
      onChange={input.onChange}
    />
  );
};

const renderProductSecondImageField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  delete input.value;
  return (
    <TextField
      id={input.name}
      variant="outlined"
      type={type}
      name={input.name}
      fullWidth
      style={{ marginTop: 20 }}
      helperText="Upload Product Second Image(1000px x 1000 px, jpg/png)"
      onChange={input.onChange}
    />
  );
};

const renderProductThirdImageField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  delete input.value;
  return (
    <TextField
      id={input.name}
      variant="outlined"
      type={type}
      name={input.name}
      fullWidth
      style={{ marginTop: 20 }}
      helperText="Upload Product Third Image(1000px x 1000 px, jpg/png)"
      onChange={input.onChange}
    />
  );
};

const renderProductFourthImageField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  delete input.value;
  return (
    <TextField
      id={input.name}
      variant="outlined"
      type={type}
      name={input.name}
      fullWidth
      style={{ marginTop: 20 }}
      helperText="Upload Product Fourth Image(1000px x 1000 px, jpg/png)"
      onChange={input.onChange}
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

const renderTotalUnitField = ({
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
      helperText="Total Product Units"
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
      fullWidth
      //required
      type={type}
      {...custom}
      disabled
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

const renderDeliveryCostPerUnitWithinProductLocationField = ({
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
      helperText="Subsequent Delivery Cost per Unit"
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

const renderProductMaximumQuantityForBaselineDeliveryField = ({
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
      helperText="Maximum Quantity for Baseline Delivery"
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

const renderProductSkuField = ({
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

function OrderForDeliveryEditForm(props) {
  const { params } = props;
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [product, setProduct] = useState(params.product);
  const [vendor, setVendor] = useState(params.productVendor);
  const [image, setImage] = useState();
  const [cityList, setCityList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [currency, setCurrency] = useState(params.productCurrency);
  const [location, setLocation] = useState(params.productLocation);
  const [country, setCountry] = useState(params.locationCountry);
  const [recipientState, setRecipientState] = useState(params.recipientState);
  const [recipientCountry, setRecipientCountry] = useState(
    params.recipientCountry
  );
  const [recipientStateList, setRecipientStateList] = useState([]);
  const [recipientCountryList, setRecipientCountryList] = useState([]);
  const [orderedByList, setOrderedByList] = useState([]);
  const [orderedBy, setOrderedBy] = useState(params.orderedBy);
  const [actionStatus, setActionStatus] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [currencyName, setCurrencyName] = useState();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
      const response = await api.get(`/users/${params.orderedBy}`);
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
      console.log("all data is:", allData);
      setCustomerEmail(allData[0].email);
      setCustomerPhoneNumber(allData[0].phoneNumber);
    };

    //call the function

    fetchData().catch(console.error);
  }, [params.orderedBy]);

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

  //get the currency name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${params.productCurrency}`);
      const item = response.data.data.data;
      allData.push({ id: item._id, name: item.name });

      if (!allData) {
        return;
      }

      if (allData[0].name) {
        setCurrencyName(allData[0].name);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [params.productCurrency]);

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
            //{...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Product Country</FormHelperText>
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
            //readOnly
            style={{ width: 250, marginTop: 0, height: 38 }}
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
            //readOnly
            style={{ width: 240, marginTop: 0, height: 38, marginLeft: 10 }}
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
            style={{ width: 170, marginTop: 0, height: 38 }}
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
            readOnly
            style={{ width: 500, marginTop: 0, height: 38, marginTop: 10 }}
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
            style={{ marginTop: 0, width: 320, height: 38, marginLeft: 0 }}
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
            readOnly
            style={{ marginLeft: 10, width: 240, height: 38 }}
            //{...input}
          >
            {renderOrderedByList()}
          </Select>
          <FormHelperText>Ordered By</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderActionStatusField = ({
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
            labelId="actionStatus"
            id="actionStatus"
            value={actionStatus}
            onChange={handleActionStatusChange}
            label="Action Status"
            style={{ width: 500, height: 38, marginTop: 20 }}
          >
            <MenuItem value={"unprocessed"}>Unprocessed</MenuItem>
            <MenuItem value={"rejected"}>Rejected</MenuItem>
          </Select>
          <FormHelperText>Process Order</FormHelperText>
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

  const getCurrencyCode = () => {
    if (currencyName) {
      if (currencyName.toLowerCase() === "naira") {
        return <span>&#8358;</span>;
      } else {
        return;
      }
    }
  };

  const productCost =
    parseFloat(params.orderedPrice) * parseFloat(params.orderedQuantity);

  const DateOrdered = params.transactionDate
    ? new Date(params.transactionDate).toISOString().slice(0, 10)
    : "";

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    const dataValue = {
      status: actionStatus,
    };

    if (!dataValue.status) {
      props.handleFailedSnackbar(
        "Please select want you want to do with this order and try again"
      );
      setLoading(false);
      return;
    }

    if (formValues) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(
          `/transactions/${params.id}`,
          dataValue
        );

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_ORDERFORDELIVERY,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `${params.orderNumber} Order is processed successfully!!!`
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

  return (
    <div>
      <form id="orderForDeliveryEditForm" className={classes.formStyles}>
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
            <Typography variant="h5">Order Details</Typography>
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
          <Grid container direction="row" style={{ marginTop: 20 }}>
            {/* <Grid item style={{ width: 160 }}>
              <Field
                label=""
                id="productVendor"
                name="productVendor"
                type="text"
                component={renderVendorField}
              />
            </Grid> */}
            {/* <Grid item style={{ marginLeft: 0, width: 320 }}>
              <Field
                label=""
                id="product"
                name="product"
                type="text"
                component={renderProductField}
              />
            </Grid>
            <Grid item style={{ width: 170, marginLeft: 10 }}>
              <Field
                label=""
                id="sku"
                name="sku"
                defaultValue={params.sku}
                type="text"
                component={renderSkuField}
              />
            </Grid> */}
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "100%" }}>
              <Field
                label=""
                id="orderNumber"
                name="orderNumber"
                defaultValue={params.orderNumber}
                type="text"
                component={renderOrderNumberField}
              />
            </Grid>
            {/* <Grid item style={{ marginLeft: 10, width: 150 }}>
              <Field
                label=""
                id="orderedQuantity"
                name="orderedQuantity"
                defaultValue={params.orderedQuantity}
                type="text"
                component={renderOrderedQuantityField}
              />
            </Grid>
            <Grid item style={{ width: 165, marginLeft: 15 }}>
              <Field
                label=""
                id="orderedPrice"
                name="orderedPrice"
                defaultValue={params.orderedPrice}
                type="text"
                component={renderOrderedPriceField}
              />
            </Grid> */}
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
                defaultValue={DateOrdered}
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
                defaultValue={customerEmail}
                type="text"
                component={renderCustomerEmailField}
              />
            </Grid>
            <Grid item style={{ width: 240, marginLeft: 10 }}>
              <Field
                label=""
                id="customerPhoneNumber"
                name="customerPhoneNumber"
                defaultValue={customerPhoneNumber}
                type="text"
                component={renderCustomerPhoneNumberField}
              />
            </Grid>
          </Grid>

          {/* <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Product Location
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="locationCountry"
                name="locationCountry"
                type="number"
                component={renderProductCountryField}
              />
            </Grid>
            <Grid item style={{ width: 250, marginLeft: 0 }}>
              <Field
                label=""
                id="productLocation"
                name="productLocation"
                type="number"
                component={renderProductLocationField}
              />
            </Grid>
          </Grid> */}

          <Grid item container style={{ marginTop: 15 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Recipient Details
            </FormLabel>
          </Grid>

          <Field
            label=""
            id="recipientName"
            name="recipientName"
            defaultValue={params.recipientName}
            type="text"
            component={renderRecipientNameField}
            style={{ marginTop: 10 }}
          />

          <Field
            label=""
            id="recipientPhoneNumber"
            name="recipientPhoneNumber"
            defaultValue={params.recipientPhoneNumber}
            type="text"
            component={renderRecipientPhoneNumberField}
            style={{ marginTop: 10 }}
          />

          <Field
            label=""
            id="recipientAddress"
            name="recipientAddress"
            defaultValue={params.recipientAddress}
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
                defaultValue={params.totalProductCost}
                type="text"
                component={renderTotalProductCostField}
              />
            </Grid>

            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="status"
                name="status"
                defaultValue={params.status}
                type="text"
                component={renderOrderStatusField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="productCurrency"
            name="productCurrency"
            defaultValue={params.orderedPrice}
            type="text"
            component={renderProductCurrencyField}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: 250 }}>
              <Field
                label=""
                id="paymentStatus"
                name="paymentStatus"
                defaultValue={params.paymentStatus}
                type="text"
                component={renderPaymentStatusField}
              />
            </Grid>
            <Grid item style={{ width: 240, marginLeft: 10 }}>
              <Field
                label=""
                id="paymentMethod"
                name="paymentMethod"
                defaultValue={params.paymentMethod}
                type="text"
                component={renderPaymentMethodField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="actionStatus"
            name="actionStatus"
            type="text"
            component={renderActionStatusField}
            style={{ marginTop: 20 }}
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
  form: "orderForDeliveryEditForm",
})(OrderForDeliveryEditForm);
