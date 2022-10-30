import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
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
import { EDIT_PRODUCTONSALE } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 120,
    marginLeft: 110,
    marginTop: 40,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

const renderSaleMinimumProductRequiredField = ({
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
      helperText="Minimum Product Required(MQR)"
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

const renderSalePriceField = ({
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
      helperText="Sales Price per Unit"
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

const renderStartDateField = ({
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
      helperText="Enter Start Date"
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

const renderEndDateField = ({
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
      helperText="Enter End Date"
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

function ProductOnSaleEditForm(props) {
  const { params } = props;
  const classes = useStyles();
  const [state, setState] = useState("");
  const [primaryProduct, setPrimaryProduct] = useState(params.product);
  const [relatedProduct, setRelatedProduct] = useState();
  const [primaryProductList, setPrimaryProductList] = useState([]);
  const [relatedProductList, setRelatedProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get("/products", {
        params: { vendor: props.vendorId },
      });
      const workingData = response.data.data.data;
      workingData.map((product) => {
        allData.push({
          id: product._id,
          name: `${product.sku}-${product.name}`,
        });
      });
      setPrimaryProductList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get("/products", {
        params: { vendor: props.vendorId },
      });
      const workingData = response.data.data.data;
      workingData.map((product) => {
        allData.push({
          id: product._id,
          name: `${product.sku}-${product.name}`,
        });
      });
      setRelatedProductList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const handleRelatedProductChange = (event) => {
    setRelatedProduct(event.target.value);
  };

  const handlePrimaryProductChange = (event) => {
    setPrimaryProduct(event.target.value);
  };

  //get the primary product list
  const renderPrimaryProductList = () => {
    return primaryProductList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the related product list
  const renderRelatedProductList = () => {
    return relatedProductList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderPrimaryProductField = ({
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
            value={primaryProduct}
            onChange={handlePrimaryProductChange}
            label="Product"
            style={{ marginTop: 20, width: 350, height: 38 }}
          >
            {renderPrimaryProductList()}
          </Select>
          <FormHelperText>Product</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment>Save</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);
    const data = {
      product: primaryProduct,
      salesPricePerUnit: formValues["salesPricePerUnit"],
      minimumQuantity: formValues["minimumQuantity"],
      vendor: props.vendorId,
      startDate: formValues["startDate"],
      endDate: formValues["endDate"],
      createdBy: props.userId,
    };

    console.log("data:", data);
    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/productsonsale/${params.id}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_PRODUCTONSALE,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `Product is successfully placed on sales`
          );
          props.handleEditDialogOpenStatus();
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

  const salesStartDate = params.startDate
    ? new Date(params.startDate).toISOString().slice(0, 10)
    : "";

  const salesEndDate = params.endDate
    ? new Date(params.endDate).toISOString().slice(0, 10)
    : "";

  return (
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "grey", fontSize: "1.3em" }}
          component="legend"
        >
          Place Product On Sale
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="productOnSaleEditForm"
        // onSubmit={onSubmit}
        sx={{
          width: 350,
          height: 330,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        <Field
          label=""
          id="primaryProduct"
          name="primaryProduct"
          type="text"
          component={renderPrimaryProductField}
        />
        <Grid container direction="row" style={{ marginTop: 0 }}>
          <Grid item style={{ width: 140 }}>
            <Field
              label=""
              id="salesPricePerUnit"
              name="salesPricePerUnit"
              defaultValue={params.salesPricePerUnit}
              type="number"
              component={renderSalePriceField}
              style={{ marginTop: 10 }}
            />
          </Grid>
          <Grid item style={{ width: 200, marginLeft: 10 }}>
            <Field
              label=""
              id="minimumQuantity"
              name="minimumQuantity"
              defaultValue={params.minimumQuantity}
              type="number"
              component={renderSaleMinimumProductRequiredField}
              style={{ marginTop: 10 }}
            />
          </Grid>
        </Grid>

        <Grid container direction="row" style={{ marginTop: 15 }}>
          <Grid item style={{ width: 200 }}>
            <Field
              label=""
              id="startDate"
              name="startDate"
              defaultValue={salesStartDate}
              type="date"
              component={renderStartDateField}
            />
          </Grid>
          <Grid item style={{ width: 140, marginLeft: 10 }}>
            <Field
              label=""
              id="endDate"
              name="endDate"
              defaultValue={salesEndDate}
              type="date"
              component={renderEndDateField}
            />
          </Grid>
        </Grid>

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
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "productOnSaleEditForm",
})(ProductOnSaleEditForm);
