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
import { EDIT_PRODUCT } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,

    width: 500,
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

const renderPriceMarkUpPerUnitField = ({
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
      helperText="Price Markup Per Unit"
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

const renderProductSafetyField = ({
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
      helperText="Product safety"
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

const renderProductPackagingField = ({
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
      helperText="Product packaging"
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

const renderProductDurabilityField = ({
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
      helperText="Product durability"
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

const renderProductMarketClaimsField = ({
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
      helperText="Market Claims"
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

const renderProductPricePerUnitField = ({
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
      helperText="Product Price per Unit"
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

const renderProductKeyword1Field = ({
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
      helperText="Keyword"
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

const renderProductKeyword2Field = ({
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
      helperText="Keyword"
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

const renderProductKeyword3Field = ({
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
      helperText="Keyword"
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

const renderWeightPerUnitField = ({
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
      helperText="Weight per Unit(kg)"
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

const renderRemainingTotalUnitField = ({
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
      helperText="Remaining Product Units"
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
      }}
    />
  );
};

const renderProductMinimumOrderingQuantityField = ({
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
      helperText="Minimum Order Unit"
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

const renderProductBaselineDeliveryCostWithinProductLocationField = ({
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
      helperText="Baseline Delivery Cost"
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

const renderEstimatedDeliveryPeriodInDaysField = ({
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
      helperText="Estimated Delivery Period(in days)"
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

const renderEstimatedDeliveryPeriodInHoursField = ({
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
      helperText="Estimated Delivery Period(in hours)"
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

const renderEstimatedDeliveryPeriodInMinutesField = ({
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
      helperText="Estimated Delivery Period(in minutes)"
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

const renderProductConfigurationField = ({
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
      helperText="Product configuration"
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

function ProductEditForm(props) {
  const { params } = props;
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(params.category);
  const [vendor, setVendor] = useState(params.vendor);
  const [image, setImage] = useState();
  const [cityList, setCityList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [currency, setCurrency] = useState(params.currency);
  const [location, setLocation] = useState(params.location);
  const [country, setCountry] = useState(params.locationCountry);
  const [isFeaturedProduct, setIsFeaturedProduct] = useState(
    params.isFeaturedProduct
  );

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/countries`);
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
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
      const response = await api.get(`/categories`);
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      setCategoryList(allData);
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

  //get the vendor list
  const renderCategoryList = () => {
    return categoryList.map((item) => {
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

  const onImageChange = (e) => {
    setImage(e.target.value);
    console.log("the image is:", image);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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

  const handleIsFeaturedProductChange = (event) => {
    setIsFeaturedProduct(event.target.value);
  };

  const renderIsProductFeatureField = ({
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
            labelId="isFeaturedProduct"
            id="isFeaturedProduct"
            value={isFeaturedProduct}
            onChange={handleIsFeaturedProductChange}
            label="Is Featured"
            style={{ width: 500, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={false}>False</MenuItem>
            <MenuItem value={true}>True</MenuItem>
          </Select>
          <FormHelperText>Set isFeatured Property</FormHelperText>
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
            style={{ width: 170, marginTop: 0, height: 38 }}
            //{...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Product Country</FormHelperText>
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
            style={{ width: 170, marginTop: 0, height: 38 }}
            //{...input}
          >
            {renderLocationList()}
          </Select>
          <FormHelperText>Product Location</FormHelperText>
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

  const renderProductPriceCurrencyField = ({
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
            style={{ width: 190, marginTop: 0, height: 38 }}
            //{...input}
          >
            {renderCurencyList()}
          </Select>
          <FormHelperText>Price Currency</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCategoryField = ({
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
            labelId="category"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            style={{ marginTop: 0, width: 150, height: 38, marginLeft: 10 }}
            //{...input}
          >
            {renderCategoryList()}
          </Select>
          <FormHelperText>Product Category</FormHelperText>
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

  console.log("is featured product:", isFeaturedProduct);

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    const form = new FormData();
    form.append("name", formValues.name ? formValues.name : params.name);
    form.append(
      "configuration",
      formValues.configuration ? formValues.configuration : params.configuration
    );
    form.append("isFeaturedProduct", isFeaturedProduct);
    form.append(
      "shortDescription",
      formValues.shortDescription
        ? formValues.shortDescription
        : params.shortDescription
        ? params.shortDescription
        : ""
    );
    form.append(
      "fullDescription",
      formValues.fullDescription
        ? formValues.fullDescription
        : params.fullDescription
        ? params.fullDescription
        : ""
    );

    form.append("category", category);
    form.append("vendor", vendor);
    form.append("currency", currency);
    form.append("location", location);
    form.append("locationCountry", country);
    form.append("createdBy", props.userId);

    form.append(
      "make",
      formValues.make ? formValues.make : params.make ? params.make : ""
    );
    form.append(
      "model",
      formValues.model ? formValues.model : params.model ? params.model : ""
    );
    form.append(
      "color",
      formValues.color ? formValues.color : params.color ? params.color : ""
    );
    form.append(
      "weightPerUnit",
      formValues.weightPerUnit
        ? formValues.weightPerUnit
        : params.weightPerUnit
        ? params.weightPerUnit
        : ""
    );
    form.append(
      "totalUnits",
      formValues.totalUnits
        ? formValues.totalUnits
        : params.totalUnits
        ? params.totalUnits
        : ""
    );
    form.append(
      "remainingTotalUnits",
      formValues.remainingTotalUnits
        ? formValues.remainingTotalUnits
        : params.remainingTotalUnits
        ? params.remainingTotalUnits
        : ""
    );
    form.append(
      "size",
      formValues.size ? formValues.size : params.size ? params.size : ""
    );
    form.append(
      "design",
      formValues.design ? formValues.design : params.design ? params.design : ""
    );
    form.append(
      "content",
      formValues.content
        ? formValues.content
        : params.content
        ? params.content
        : ""
    );
    form.append(
      "smell",
      formValues.smell ? formValues.smell : params.smell ? params.smell : ""
    );
    form.append(
      "priceMarkupPerUnit",
      formValues.priceMarkupPerUnit
        ? formValues.priceMarkupPerUnit
        : params.priceMarkupPerUnit
    );
    form.append("taste", formValues.taste ? formValues.taste : params.taste);
    form.append(
      "feel",
      formValues.feel ? formValues.feel : params.feel ? params.feel : ""
    );
    form.append(
      "ingredients",
      formValues.ingredients
        ? formValues.ingredients
        : params.ingredients
        ? params.ingredients
        : ""
    );
    form.append(
      "reliability",
      formValues.reliability
        ? formValues.reliability
        : params.reliability
        ? params.reliability
        : ""
    );
    form.append(
      "safety",
      formValues.safety ? formValues.safety : params.safety ? params.safety : ""
    );
    form.append(
      "packaging",
      formValues.packaging
        ? formValues.packaging
        : params.packaging
        ? params.packaging
        : ""
    );
    form.append(
      "deliveryCostPerUnitWithinProductLocation",
      formValues.deliveryCostPerUnitWithinProductLocation
        ? formValues.deliveryCostPerUnitWithinProductLocation
        : params.deliveryCostPerUnitWithinProductLocation
        ? params.deliveryCostPerUnitWithinProductLocation
        : 0
    );
    form.append(
      "maxmumQuantityForBaselineDelivery",
      formValues.maxmumQuantityForBaselineDelivery
        ? formValues.maxmumQuantityForBaselineDelivery
        : params.maxmumQuantityForBaselineDelivery
        ? params.maxmumQuantityForBaselineDelivery
        : 0
    );
    form.append(
      "estimatedDeliveryPeriodInDays",
      formValues.estimatedDeliveryPeriodInDays
        ? formValues.estimatedDeliveryPeriodInDays
        : params.estimatedDeliveryPeriodInDays
        ? params.estimatedDeliveryPeriodInDays
        : 0
    );
    form.append(
      "estimatedDeliveryPeriodInHours",
      formValues.estimatedDeliveryPeriodInHours
        ? formValues.estimatedDeliveryPeriodInHours
        : params.estimatedDeliveryPeriodInHours
        ? params.estimatedDeliveryPeriodInHours
        : 0
    );
    form.append(
      "baselineDeliveryCostWithinProductLocation",
      formValues.baselineDeliveryCostWithinProductLocation
        ? formValues.baselineDeliveryCostWithinProductLocation
        : params.baselineDeliveryCostWithinProductLocation
        ? params.baselineDeliveryCostWithinProductLocation
        : 0
    );
    form.append(
      "estimatedDeliveryPeriodInMinutes",
      formValues.estimatedDeliveryPeriodInMinutes
        ? formValues.estimatedDeliveryPeriodInMinutes
        : params.estimatedDeliveryPeriodInMinutes
        ? params.estimatedDeliveryPeriodInMinutes
        : 0
    );
    form.append(
      "marketingClaims",
      formValues.marketingClaims
        ? formValues.marketingClaims
        : params.marketingClaims
        ? params.marketingClaims
        : ""
    );
    form.append(
      "durability",
      formValues.durability
        ? formValues.durability
        : params.durability
        ? params.durability
        : ""
    );
    form.append(
      "pricePerUnit",
      formValues.pricePerUnit ? formValues.pricePerUnit : params.pricePerUnit
    );
    form.append(
      "keyword1",
      formValues.keyword1
        ? formValues.keyword1
        : params.keyword1
        ? params.keyword1
        : ""
    );
    form.append(
      "keyword2",
      formValues.keyword2
        ? formValues.keyword2
        : params.keyword2
        ? params.keyword2
        : ""
    );
    form.append(
      "keyword3",
      formValues.keyword3
        ? formValues.keyword3
        : params.keyword3
        ? params.keyword3
        : ""
    );
    form.append(
      "refNumber",
      formValues.refNumber ? formValues.refNumber : params.refNumber
    );
    form.append("sku", formValues.sku ? formValues.sku : params.sku);

    if (formValues.imageCover) {
      form.append("imageCover", formValues.imageCover[0]);
    }
    if (formValues.firstImage) {
      form.append("firstImage", formValues.firstImage[0]);
    }
    if (formValues.secondImage) {
      form.append("secondImage", formValues.secondImage[0]);
    }
    if (formValues.thirdImage) {
      form.append("thirdImage", formValues.thirdImage[0]);
    }
    if (formValues.fourthImage) {
      form.append("fourthImage", formValues.fourthImage[0]);
    }

    form.append(
      "minimumQuantity",
      formValues.minimumQuantity
        ? formValues.minimumQuantity
        : params.minimumQuantity
    );
    if (form) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/products/${params.id}`, form);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_PRODUCT,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `${response.data.data.data.name} Product is updated successfully!!!`
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
      <form id="productEditForm" className={classes.formStyles}>
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "grey", fontSize: "1.3em" }}
            component="legend"
          >
            <Typography variant="h5">Update Product</Typography>
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
            <Grid item style={{ width: 160 }}>
              <Field
                label=""
                id="vendor"
                name="vendor"
                type="text"
                component={renderVendorField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10, width: 150 }}>
              <Field
                label=""
                id="category"
                name="category"
                type="text"
                component={renderCategoryField}
              />
            </Grid>
            <Grid item style={{ width: 165, marginLeft: 15 }}>
              <Field
                label=""
                id="sku"
                name="sku"
                defaultValue={params.sku}
                type="text"
                component={renderSkuField}
              />
            </Grid>
          </Grid>

          <Field
            label=""
            id="name"
            name="name"
            defaultValue={params.name}
            type="text"
            component={renderProductNameField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />
          <Field
            label=""
            id="configuration"
            name="configuration"
            type="text"
            defaultValue={params.configuration}
            component={renderProductConfigurationField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />
          <Field
            label=""
            id="refNumber"
            name="refNumber"
            defaultValue={params.refNumber}
            type="text"
            component={renderProductRefNumberField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />

          <Field
            label=""
            id="shortDescription"
            name="shortDescription"
            helperText="Short Description"
            rows={4}
            defaultValue={params.shortDescription}
            type="text"
            component={renderMultilineField}
          />
          <Field
            label=""
            id="fullDescription"
            name="fullDescription"
            rows={8}
            defaultValue={params.fullDescription}
            type="text"
            helperText="Detail Description"
            component={renderMultilineField}
          />

          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Product Features & Attributes
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="weightPerUnit"
                name="weightPerUnit"
                defaultValue={params.weightPerUnit}
                type="number"
                component={renderWeightPerUnitField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="totalUnits"
                name="totalUnits"
                defaultValue={params.totalUnits}
                type="number"
                component={renderTotalUnitField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="remainingTotalUnits"
                name="remainingTotalUnits"
                defaultValue={params.remainingTotalUnits}
                type="number"
                component={renderRemainingTotalUnitField}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="make"
                name="make"
                defaultValue={params.make}
                type="text"
                component={renderProductMakeField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="model"
                name="model"
                defaultValue={params.model}
                type="text"
                component={renderProductModelField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="size"
                name="size"
                defaultValue={params.size}
                type="text"
                component={renderProductSizeField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="color"
                name="color"
                defaultValue={params.color}
                type="text"
                component={renderProductColourField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="design"
                name="design"
                defaultValue={params.design}
                type="text"
                component={renderProductDesignField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="content"
                name="content"
                defaultValue={params.content}
                type="text"
                component={renderProductContentField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="taste"
                name="taste"
                defaultValue={params.taste}
                type="text"
                component={renderProductTasteField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="smell"
                name="smell"
                defaultValue={params.smell}
                type="text"
                component={renderProductSmellField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="feel"
                name="feel"
                defaultValue={params.feel}
                type="text"
                component={renderProductFeelField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="ingredients"
                name="ingredients"
                defaultValue={params.ingredients}
                type="text"
                component={renderProductIngredientsField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="reliability"
                name="reliability"
                defaultValue={params.reliability}
                type="text"
                component={renderProductReliabilityField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="safety"
                name="safety"
                defaultValue={params.safety}
                type="text"
                component={renderProductSafetyField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="packaging"
                name="packaging"
                defaultValue={params.packaging}
                type="text"
                component={renderProductPackagingField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="durability"
                name="durability"
                defaultValue={params.durability}
                type="text"
                component={renderProductDurabilityField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="marketingClaims"
                name="marketingClaims"
                defaultValue={params.marketingClaims}
                type="text"
                component={renderProductMarketClaimsField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="pricePerUnit"
                name="pricePerUnit"
                defaultValue={params.pricePerUnit}
                type="number"
                component={renderProductPricePerUnitField}
              />
            </Grid>
            <Grid item style={{ width: "35%", marginLeft: 10 }}>
              <Field
                label=""
                id="currency"
                name="currency"
                defaultValue={params.currency}
                type="text"
                component={renderProductPriceCurrencyField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "29%" }}>
              <Field
                label=""
                id="minimumQuantity"
                name="minimumQuantity"
                defaultValue={params.minimumQuantity}
                type="number"
                component={renderProductMinimumOrderingQuantityField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="locationCountry"
                name="locationCountry"
                type="text"
                component={renderProductCountryField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="location"
                name="location"
                type="text"
                component={renderProductLocationField}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 20, marginBottom: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Product isFeatured
            </FormLabel>
          </Grid>
          <Field
            label=""
            id="isFeaturedProduct"
            name="isFeaturedProduct"
            type="text"
            component={renderIsProductFeatureField}
            // style={{ marginTop: 10 }}
          />
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Delivery Within Product Location
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "29%" }}>
              <Field
                label=""
                id="maxmumQuantityForBaselineDelivery"
                name="maxmumQuantityForBaselineDelivery"
                defaultValue={params.maxmumQuantityForBaselineDelivery}
                type="number"
                component={renderProductMaximumQuantityForBaselineDeliveryField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="baselineDeliveryCostWithinProductLocation"
                name="baselineDeliveryCostWithinProductLocation"
                defaultValue={params.baselineDeliveryCostWithinProductLocation}
                type="number"
                component={
                  renderProductBaselineDeliveryCostWithinProductLocationField
                }
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="deliveryCostPerUnitWithinProductLocation"
                name="deliveryCostPerUnitWithinProductLocation"
                defaultValue={params.deliveryCostPerUnitWithinProductLocation}
                type="number"
                component={renderDeliveryCostPerUnitWithinProductLocationField}
                //style={{ marginTop: 10 }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "29%" }}>
              <Field
                label=""
                id="estimatedDeliveryPeriodInDays"
                name="estimatedDeliveryPeriodInDays"
                defaultValue={params.estimatedDeliveryPeriodInDays}
                type="number"
                component={renderEstimatedDeliveryPeriodInDaysField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="estimatedDeliveryPeriodInHours"
                name="estimatedDeliveryPeriodInHours"
                defaultValue={params.estimatedDeliveryPeriodInHours}
                type="number"
                component={renderEstimatedDeliveryPeriodInHoursField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="estimatedDeliveryPeriodInMinutes"
                name="estimatedDeliveryPeriodInMinutes"
                defaultValue={params.estimatedDeliveryPeriodInMinutes}
                type="number"
                component={renderEstimatedDeliveryPeriodInMinutesField}
                //style={{ marginTop: 10 }}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Product Keywords for Discoverability
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "30%" }}>
              <Field
                label=""
                id="keyword1"
                name="keyword1"
                defaultValue={params.keyword1}
                type="text"
                component={renderProductKeyword1Field}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="keyword2"
                name="keyword2"
                defaultValue={params.keyword2}
                type="text"
                component={renderProductKeyword2Field}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="keyword3"
                name="keyword3"
                defaultValue={params.keyword3}
                type="text"
                component={renderProductKeyword3Field}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Price Markup Per Unit
            </FormLabel>
          </Grid>
          <Field
            label=""
            id="priceMarkupPerUnit"
            name="priceMarkupPerUnit"
            defaultValue={params.priceMarkupPerUnit}
            type="number"
            component={renderPriceMarkUpPerUnitField}
            style={{ marginTop: 10 }}
          />
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Producti mages
            </FormLabel>
          </Grid>
          <Field
            name="imageCover"
            type="file"
            defaultValue={params.imageCover}
            accept="image/*"
            component={renderImageCoverField}
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
  form: "productEditForm",
})(ProductEditForm);
