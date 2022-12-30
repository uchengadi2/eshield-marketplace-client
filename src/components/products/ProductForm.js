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
import { CREATE_PRODUCT } from "../../actions/types";

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

function ProductForm(props) {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [image, setImage] = useState();
  const [cityList, setCityList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [currency, setCurrency] = useState();
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [isFeaturedProduct, setIsFeaturedProduct] = useState(false);

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
      const response = await api.get(`/currencies`);
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
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
            <MenuItem value={"false"}>False</MenuItem>
            <MenuItem value={"true"}>True</MenuItem>
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
            labelId="locationCountry"
            id="locationCountry"
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

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!vendor) {
      props.handleFailedSnackbar(
        "Please select the vendor of this product and try again"
      );
      setLoading(false);
      return;
    }
    if (!category) {
      props.handleFailedSnackbar(
        "Please select the product category and try again"
      );
      setLoading(false);
      return;
    }

    if (!formValues["name"]) {
      props.handleFailedSnackbar("Please enter the name of the product");
      setLoading(false);
      return;
    }

    if (!formValues["configuration"]) {
      props.handleFailedSnackbar(
        "Please enter the product configuration and try again"
      );
      setLoading(false);
      return;
    }

    if (!formValues["pricePerUnit"]) {
      props.handleFailedSnackbar(
        "Please enter the product price per unit and try again"
      );
      setLoading(false);
      return;
    }

    if (!currency) {
      props.handleFailedSnackbar(
        "Please select the price currency of the product and try again"
      );
      setLoading(false);
      return;
    }

    if (!formValues["minimumQuantity"]) {
      props.handleFailedSnackbar(
        "Please enter the product's required minimum quantity and try again"
      );
      setLoading(false);
      return;
    }
    if (!location) {
      props.handleFailedSnackbar(
        "Please select the product location/state and try again"
      );
      setLoading(false);
      return;
    }

    if (!country) {
      props.handleFailedSnackbar(
        "Please select the product location/state country and try again"
      );
      setLoading(false);
      return;
    }

    if (!formValues["priceMarkupPerUnit"]) {
      props.handleFailedSnackbar(
        "Please enter the price markup per unit of this product and try again"
      );
      setLoading(false);
      return;
    }

    const form = new FormData();
    form.append("name", formValues.name);
    form.append("configuration", formValues.configuration);
    form.append("isFeaturedProduct", isFeaturedProduct);
    form.append(
      "shortDescription",
      formValues.shortDescription ? formValues.shortDescription : ""
    );
    form.append(
      "fullDescription",
      formValues.fullDescription ? formValues.fullDescription : ""
    );

    form.append("category", category);
    form.append("vendor", vendor);
    form.append("currency", currency);
    form.append("location", location);
    form.append("locationCountry", country);
    form.append("createdBy", props.userId);

    form.append("make", formValues.make ? formValues.make : "");
    form.append("priceMarkupPerUnit", formValues.priceMarkupPerUnit);
    form.append("model", formValues.model ? formValues.model : "");
    form.append("color", formValues.color ? formValues.color : "");
    form.append(
      "weightPerUnit",
      formValues.weightPerUnit ? formValues.weightPerUnit : ""
    );
    form.append(
      "totalUnits",
      formValues.totalUnits ? formValues.totalUnits : ""
    );
    form.append(
      "remainingTotalUnits",
      formValues.totalUnits ? formValues.totalUnits : ""
    );
    form.append("size", formValues.size ? formValues.size : "");
    form.append("design", formValues.design ? formValues.design : "");
    form.append("content", formValues.content ? formValues.content : "");
    form.append("smell", formValues.smell ? formValues.smell : "");
    form.append("taste", formValues.taste ? formValues.taste : "");
    form.append("feel", formValues.feel ? formValues.feel : "");
    form.append(
      "ingredients",
      formValues.ingredients ? formValues.ingredients : ""
    );
    form.append(
      "reliability",
      formValues.reliability ? formValues.reliability : ""
    );
    form.append("safety", formValues.safety ? formValues.safety : "");
    form.append("packaging", formValues.packaging ? formValues.packaging : "");
    form.append(
      "marketingClaims",
      formValues.marketingClaims ? formValues.marketingClaims : ""
    );
    form.append(
      "durability",
      formValues.durability ? formValues.durability : ""
    );
    form.append("pricePerUnit", formValues.pricePerUnit);
    form.append("keyword1", formValues.keyword1 ? formValues.keyword1 : "");
    form.append("keyword2", formValues.keyword2 ? formValues.keyword2 : "");
    form.append("keyword3", formValues.keyword3 ? formValues.keyword3 : "");
    form.append("minimumQuantity", formValues.minimumQuantity);
    form.append(
      "deliveryCostPerUnitWithinProductLocation",
      formValues.deliveryCostPerUnitWithinProductLocation
        ? formValues.deliveryCostPerUnitWithinProductLocation
        : 0
    );
    form.append(
      "maxmumQuantityForBaselineDelivery",
      formValues.maxmumQuantityForBaselineDelivery
        ? formValues.maxmumQuantityForBaselineDelivery
        : 0
    );
    form.append(
      "baselineDeliveryCostWithinProductLocation",
      formValues.baselineDeliveryCostWithinProductLocation
        ? formValues.baselineDeliveryCostWithinProductLocation
        : 0
    );

    form.append(
      "estimatedDeliveryPeriodInDays",
      formValues.estimatedDeliveryPeriodInDays
        ? formValues.estimatedDeliveryPeriodInDays
        : 0
    );

    form.append(
      "estimatedDeliveryPeriodInHours",
      formValues.estimatedDeliveryPeriodInHours
        ? formValues.estimatedDeliveryPeriodInHours
        : 0
    );

    form.append(
      "estimatedDeliveryPeriodInMinutes",
      formValues.estimatedDeliveryPeriodInMinutes
        ? formValues.estimatedDeliveryPeriodInMinutes
        : 0
    );

    if (!formValues["refNumber"]) {
      const refNum =
        "ELS" + "-" + Math.floor(Math.random() * 100000000) + "-" + "PR";

      form.append("refNumber", refNum);
    }

    if (!formValues["sku"]) {
      const sku =
        "SKU" + "-" + Math.floor(Math.random() * 100000000) + "-" + "PR";

      form.append("sku", sku);
    }

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

    if (form) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/products`, form);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_PRODUCT,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `${response.data.data.data.name} Product is added successfully!!!`
          );
          props.handleDialogOpenStatus();
          setLoading(false);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  return (
    <div>
      <form id="productForm" className={classes.formStyles}>
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "grey", fontSize: "1.3em" }}
            component="legend"
          >
            <Typography variant="h5">Add Product</Typography>
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
                type="text"
                component={renderSkuField}
              />
            </Grid>
          </Grid>

          <Field
            label=""
            id="name"
            name="name"
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
            component={renderProductConfigurationField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />
          <Field
            label=""
            id="refNumber"
            name="refNumber"
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
            type="text"
            component={renderMultilineField}
          />
          <Field
            label=""
            id="fullDescription"
            name="fullDescription"
            rows={8}
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
                type="number"
                component={renderWeightPerUnitField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="totalUnits"
                name="totalUnits"
                type="number"
                component={renderTotalUnitField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="remainingTotalUnits"
                name="remainingTotalUnits"
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
                type="text"
                component={renderProductMakeField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="model"
                name="model"
                type="text"
                component={renderProductModelField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="size"
                name="size"
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
                type="text"
                component={renderProductColourField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="design"
                name="design"
                type="text"
                component={renderProductDesignField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="content"
                name="content"
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
                type="text"
                component={renderProductTasteField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="smell"
                name="smell"
                type="text"
                component={renderProductSmellField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="feel"
                name="feel"
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
                type="text"
                component={renderProductIngredientsField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="reliability"
                name="reliability"
                type="text"
                component={renderProductReliabilityField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="safety"
                name="safety"
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
                type="text"
                component={renderProductPackagingField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="durability"
                name="durability"
                type="text"
                component={renderProductDurabilityField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="marketingClaims"
                name="marketingClaims"
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
                type="number"
                component={renderProductPricePerUnitField}
              />
            </Grid>
            <Grid item style={{ width: "35%", marginLeft: 10 }}>
              <Field
                label=""
                id="currency"
                name="currency"
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
                type="number"
                component={renderProductMaximumQuantityForBaselineDeliveryField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="baselineDeliveryCostWithinProductLocation"
                name="baselineDeliveryCostWithinProductLocation"
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
                type="number"
                component={renderEstimatedDeliveryPeriodInDaysField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="estimatedDeliveryPeriodInHours"
                name="estimatedDeliveryPeriodInHours"
                type="number"
                component={renderEstimatedDeliveryPeriodInHoursField}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="estimatedDeliveryPeriodInMinutes"
                name="estimatedDeliveryPeriodInMinutes"
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
                type="text"
                component={renderProductKeyword1Field}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="keyword2"
                name="keyword2"
                type="text"
                component={renderProductKeyword2Field}
              />
            </Grid>
            <Grid item style={{ width: "33%", marginLeft: 10 }}>
              <Field
                label=""
                id="keyword3"
                name="keyword3"
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
            accept="image/*"
            component={renderImageCoverField}
          />
          {/* <Field
            name="firstImage"
            type="file"
            accept="image/*"
            component={renderProductFirstImageField}
          />
          <Field
            name="secondImage"
            type="file"
            accept="image/*"
            component={renderProductSecondImageField}
          />
          <Field
            name="thirdImage"
            type="file"
            accept="image/*"
            component={renderProductThirdImageField}
          />
          <Field
            name="fourthImage"
            type="file"
            accept="image/*"
            component={renderProductFourthImageField}
          /> */}
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
  form: "productForm",
})(ProductForm);
