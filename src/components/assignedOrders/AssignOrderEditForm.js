import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import api from "../../apis/local";
import { EDIT_ASSIGNED_ORDER } from "../../actions/types";

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
    width: 220,
    marginLeft: 150,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

const renderOrderQuantityAssignedField = ({
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
      helperText="Quantity for Allocation"
      variant="outlined"
      //label={label}
      id={input.name}
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

const renderLabelField = ({
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
      helperText="Order Assignment Label"
      variant="outlined"
      //label={label}
      id={input.name}
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

const renderRefNumberField = ({
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
      helperText="Order Assignment Reference Number"
      variant="outlined"
      //label={label}
      id={input.name}
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

function AssignOrderEditForm(props) {
  const { params } = props;
  const classes = useStyles();
  const [category, setCategory] = useState(params.category);
  const [order, setOrder] = useState(params.order);
  const [vendor, setVendor] = useState(params.vendor);
  const [country, setCountry] = useState(params.vendorCountry);
  const [totalUnassignedQuantity, setTotalUnassignedQuantity] = useState();
  const [remainingOrderedQuantity, setRemainingOrderedQuantity] = useState();
  const [orderNumber, setOrderNumber] = useState();
  const [currentOrderQuantityAssigned, setCurrentOrderQuantityAssigned] =
    useState(params.orderQuantityAssigned);

  const [orderList, setOrderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get("/categories");
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
      const response = await api.get("/orders", {
        params: { status: "pending" },
      });
      const workingData = response.data.data.data;
      workingData.map((order) => {
        allData.push({ id: order._id, name: order.orderNumber });
      });
      setOrderList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get("/countries");
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
      const response = await api.get("/vendors", {
        params: { vendorCountry: country },
      });
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
      });
      setVendorList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [country]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/orders/${order}`);
      const item = response.data.data.data;

      allData.push({
        id: item.id,
        category: item.category,
        orderQuantity: item.orderQuantity,
        totalUnassignedQuantity: item.totalUnassignedQuantity,
        orderQuantity: item.orderQuantity,
        orderNumber: item.orderNumber,
        remainingOrderedQuantity: item.remainingOrderedQuantity,
      });

      setCategory(allData[0].category);
      setRemainingOrderedQuantity(allData[0].remainingOrderedQuantity);
      setTotalUnassignedQuantity(allData[0].totalUnassignedQuantity);

      setOrderNumber(allData[0].orderNumber);
    };

    //call the function

    fetchData().catch(console.error);
  }, [order]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  //get the category list
  const renderCategoryList = () => {
    return categoryList.map((item) => {
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
            readOnly={true}
            style={{ marginTop: 0, width: 240, height: 38 }}
          >
            {renderCategoryList()}
          </Select>
          <FormHelperText>Vehicle Category</FormHelperText>
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
            style={{ width: 500, height: 38, marginTop: 10 }}
          >
            {renderVendorList()}
          </Select>
          <FormHelperText>Select Vendor to Assign Order To </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderOrderField = ({
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
            label="Order"
            style={{ width: 250, height: 38 }}
          >
            {renderOrderList()}
          </Select>
          <FormHelperText>Select Order </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCountryField = ({
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
            style={{ width: 500, height: 38, marginTop: 10 }}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Vendor Country </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderUnallocatedOrderedQuantityField = ({
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
        helperText="Unallocated Ordered Quantity"
        variant="outlined"
        //label={label}
        id={input.name}
        fullWidth
        //required
        type={type}
        {...custom}
        onChange={input.onChange}
        disabled
        inputProps={{
          style: {
            height: 1,
          },
        }}

        //onChange={handleInput}
      />
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Update Assigned Order</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);
    formValues["assignedBy"] = props.userId;
    formValues["order"] = order;
    formValues["category"] = category;
    formValues["vendor"] = vendor;
    formValues["vendorCountry"] = country;

    // if (!formValues["refNumber"]) {
    //   const refNum =
    //     "AS" + "-" + Math.floor(Math.random() * 100000000) + "-" + "ORD";

    //   formValues["refNumber"] = refNum;
    // }

    const newUnassignedTotal =
      parseInt(totalUnassignedQuantity) +
      parseInt(currentOrderQuantityAssigned);

    if (formValues["orderQuantityAssigned"]) {
      if (
        newUnassignedTotal < parseFloat(formValues["orderQuantityAssigned"])
      ) {
        formValues["orderQuantityAssigned"] = newUnassignedTotal;
      }
    }

    //calculate the diff
    const diff =
      parseInt(currentOrderQuantityAssigned) -
      parseInt(formValues["orderQuantityAssigned"]);

    //calculate the new total unassigned quantity
    const newTotalUnassignedQuantity = parseInt(totalUnassignedQuantity) + diff;

    //calculate new Remaining Quantity in teh store
    const newRemainingOrderedQuantity =
      parseInt(remainingOrderedQuantity) + diff;

    if (formValues) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(
          `/orderassignments/${params.id}`,
          formValues
        );

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_ASSIGNED_ORDER,
            payload: response.data.data.data,
          });

          //reduce the number assigned from the order quantity in the order document
          if (formValues["orderQuantityAssigned"]) {
            // const diff =
            //   parseFloat(newUnassignedTotal) -
            //   parseFloat(formValues["orderQuantityAssigned"]);
            // const newTotalUnassignedQuantity = totalUnassignedQuantity + diff;
            // const newRemainingOrderedQuantity = remainingOrderedQuantity + diff;
            const dataValue = {
              totalUnassignedQuantity: newTotalUnassignedQuantity,
              remainingOrderedQuantity: newRemainingOrderedQuantity,
              status: "assigned",
            };

            const newResponse = await api.patch(`/orders/${order}`, dataValue);
          }

          props.handleSuccessfulEditSnackbar(
            `${orderNumber} Order is assigned successfully!!!`
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
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "grey", fontSize: "1.3em" }}
          component="legend"
        >
          Assign Order
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="assignOrderEditForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 400,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Grid container direction="row">
          <Grid item style={{ width: "51%" }}>
            <Field
              label=""
              id="order"
              name="order"
              type="number"
              component={renderOrderField}
              style={{ marginTop: 20 }}
            />
          </Grid>
          <Grid item style={{ width: "47%", marginLeft: 5 }}>
            <Field
              label=""
              id="category"
              name="category"
              defaultValue={category}
              type="text"
              component={renderCategoryField}
              // style={{ marginTop: 15 }}
            />
          </Grid>
        </Grid>

        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid>
            <Field
              label=""
              id="unAllocatedOrderedQuantity"
              name="unAllocatedOrderedQuantity"
              defaultValue={totalUnassignedQuantity}
              type="number"
              component={renderUnallocatedOrderedQuantityField}
              item
              style={{ width: 245 }}
            />
          </Grid>
          <Grid item>
            <Field
              label=""
              id="orderQuantityAssigned"
              name="orderQuantityAssigned"
              defaultValue={params.orderQuantityAssigned}
              type="number"
              component={renderOrderQuantityAssignedField}
              style={{ width: 250, marginLeft: 5 }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "51%" }}>
            <Field
              label=""
              id="Label"
              name="label"
              defaultValue={params.label}
              type="text"
              component={renderLabelField}
              // style={{ marginTop: 20 }}
            />
          </Grid>
          <Grid item style={{ width: "48%", marginLeft: 5 }}>
            <Field
              label=""
              id="refNumber"
              name="refNumber"
              defaultValue={params.refNumber}
              type="text"
              component={renderRefNumberField}
              // style={{ marginTop: 15 }}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="country"
          name="country"
          type="text"
          component={renderCountryField}
        />
        <Field
          label=""
          id="vendor"
          name="vendor"
          type="text"
          component={renderVendorField}
        />
        {/* <Field
          label=""
          id="dateAssigned"
          name="dateAssigned"
          type="date"
          component={renderDateAssignedField}
          style={{ marginTop: 10 }}
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
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "assignOrderEditForm",
})(AssignOrderEditForm);
