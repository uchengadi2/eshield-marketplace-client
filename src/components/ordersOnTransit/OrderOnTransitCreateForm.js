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
import api from "./../../apis/local";
import { CREATE_ONTRANSIT_ORDER } from "../../actions/types";

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
    width: 230,
    marginLeft: 140,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

const renderTransitCommencementDateField = ({
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
      helperText="Delivery Commencement Date"
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

const renderCrewSecondAssistantPhoneNumberField = ({
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
      helperText="Second Assistant Phone Number"
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

const renderCrewSecondAssistantNameField = ({
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
      helperText="Second Assistant Name"
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

const renderCrewFirstAssistantPhoneNumberField = ({
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
      helperText="First Assistant Phone Number"
      variant="outlined"
      label={label}
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

const renderFirstAssistantNameField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="First Assistant Name"
      label={label}
      id={input.name}
      fullWidth
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

const renderCrewLeaderPhoneNumberField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Crew Leader Phone Number"
      label={label}
      id={input.name}
      fullWidth
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

const renderCrewLeaderNameTypeField = ({
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
      helperText="Crew Leader Name"
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
      helperText="Order Delivery Label"
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
      helperText="Order Delivery Reference Number"
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

function OrderOnTransitCreateForm(props) {
  const classes = useStyles();

  const [countryList, setCountryList] = useState([]);
  const [orderAssignmentList, setOrderAssignmentList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);

  const [country, setCountry] = useState();
  const [orderAssignment, setOrderAssignment] = useState();
  const [order, setOrder] = useState();
  const [category, setCategory] = useState();
  const [vendor, setVendor] = useState();
  const [vehicle, setVehicle] = useState();
  const [orderNumber, setOrderNumber] = useState();
  const [orderAssignmentRefNumber, setOrderAssignmentRefNumber] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
      const response = await api.get("/orderassignments", {
        params: { vendorCountry: country },
      });
      const workingData = response.data.data.data;
      workingData.map((assignedOrder) => {
        allData.push({
          id: assignedOrder._id,
          name: `${assignedOrder.refNumber}-${assignedOrder.label}`,
        });
      });
      setOrderAssignmentList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [country]);

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
      const response = await api.get("/orders");
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
      const response = await api.get("/vendors");
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
      const response = await api.get("/products", {
        params: { vendor: vendor, category: category },
      });
      const workingData = response.data.data.data;
      workingData.map((product) => {
        allData.push({
          id: product._id,
          name: `${product.plateNumber}-${product.name}`,
        });
      });
      setVehicleList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [vendor, category]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/orderassignments/${orderAssignment}`);
      const item = response.data.data.data;

      allData.push({
        refNumber: item.refNumber,
        label: item.label,
        order: item.order,
        category: item.category,
        vendor: item.vendor,
        vendorCountry: item.country,
        orderQuantityAssigned: item.orderQuantityAssigned,
        dateAssigned: item.dateAssigned,
        assignedBy: item.assignedBy,
        name: `${item.refNumber}-${item.label}`,
      });

      setOrder(allData[0].order);
      setCategory(allData[0].category);
      setVendor(allData[0].vendor);
      setOrderAssignmentRefNumber(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [orderAssignment]);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleOrderAssignmentChange = (event) => {
    setOrderAssignment(event.target.value);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  const handleVehicleChange = (event) => {
    setVehicle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
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

  //get the order assignment list
  const renderOrderAssignmentList = () => {
    return orderAssignmentList.map((item) => {
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

  //get the vehicle list
  const renderVehicleList = () => {
    return vehicleList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the  order list
  const renderOrderList = () => {
    return orderList.map((item) => {
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
            style={{ marginTop: 0, width: 280, height: 38 }}
            readOnly
          >
            {renderCategoryList()}
          </Select>
          <FormHelperText>Vehicle Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVendorCountryType = ({
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
            style={{ marginTop: 10, width: 500, height: 38 }}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Country </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVehicleField = ({
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
            labelId="vehicle"
            id="vehicle"
            value={vehicle}
            onChange={handleVehicleChange}
            label="Vehicle"
            style={{ marginTop: 10, width: 500, height: 38 }}
          >
            {renderVehicleList()}
          </Select>
          <FormHelperText>Vehicle </FormHelperText>
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
            style={{ width: 210, height: 38, marginLeft: 5 }}
            readOnly
          >
            {renderVendorList()}
          </Select>
          <FormHelperText>Vendor </FormHelperText>
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
            style={{ width: 280, height: 38, marginLeft: 10 }}
            readOnly
          >
            {renderOrderList()}
          </Select>
          <FormHelperText>Order </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderOrderAssignmentField = ({
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
            labelId="orderAssignment"
            id="orderAssignment"
            value={orderAssignment}
            onChange={handleOrderAssignmentChange}
            label="Order Assignment"
            style={{ width: 210, height: 38 }}
          >
            {renderOrderAssignmentList()}
          </Select>
          <FormHelperText>Select Order Assignment </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Commence Order Delivery</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    //prepare the data for submission
    setLoading(true);
    formValues["category"] = category;
    formValues["vendor"] = vendor;
    formValues["order"] = order;
    formValues["vendorCountry"] = country;
    formValues["vehicle"] = vehicle;
    formValues["assignedOrder"] = orderAssignment;
    formValues["createdBy"] = props.userId;

    if (!formValues["refNumber"]) {
      formValues["refNumber"] =
        "TR-" + Math.floor(Math.random() * 10000000000) + "-ORD";
    }

    if (formValues) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/orderontransits`, formValues);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_ONTRANSIT_ORDER,
            payload: response.data.data.data,
          });

          //change the status of ontransit order
          const dataValue = {
            status: "onTransit",
          };
          const transResponse = await api.patch(
            `/orderassignments/${orderAssignment}`,
            dataValue
          );

          props.handleSuccessfulCreateSnackbar(
            `${response.data.data.data.refNumber} Order delivery is initiated successfully!!!`
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
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "grey", fontSize: "1.3em" }}
          component="legend"
        >
          Order for Delivery
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="orderOnTransitCreateForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 420,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Field
          label=""
          id="vendorCountry"
          name="vendorCountry"
          type="text"
          component={renderVendorCountryType}
        />
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "40%" }}>
            <Field
              label=""
              id="assignedOrder"
              name="assignedOrder"
              //defaultValue={}
              type="text"
              component={renderOrderAssignmentField}
            />
          </Grid>
          <Grid item style={{ width: "55%", marginLeft: 10 }}>
            <Field
              label=""
              id="order"
              name="order"
              defaultValue={order}
              type="text"
              component={renderOrderField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "51%" }}>
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
          <Grid item style={{ width: "43%", marginLeft: 30 }}>
            <Field
              label=""
              id="vendor"
              name="vendor"
              defaultValue={vendor}
              type="text"
              component={renderVendorField}
              //style={{ marginTop: 20 }}
            />
          </Grid>
        </Grid>

        <Field
          label=""
          id="vehicle"
          name="vehicle"
          type="text"
          component={renderVehicleField}
          style={{ marginTop: 20 }}
        />
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "51%" }}>
            <Field
              label=""
              id="Label"
              name="label"
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
              type="text"
              component={renderRefNumberField}
              // style={{ marginTop: 15 }}
            />
          </Grid>
        </Grid>
        <FormLabel
          style={{ color: "blue", marginTop: 15, fontSize: "1.2em" }}
          component="legend"
        >
          Enter Crew Details
        </FormLabel>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="crewLeaderName"
              name="crewLeaderName"
              type="text"
              component={renderCrewLeaderNameTypeField}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5, marginTop: 0 }}>
            <Field
              label=""
              id="crewLeaderPhoneNumber"
              name="crewLeaderPhoneNumber"
              type="text"
              component={renderCrewLeaderPhoneNumberField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="crewFirstAssistantName"
              name="crewFirstAssistantName"
              type="text"
              component={renderFirstAssistantNameField}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5, marginTop: 0 }}>
            <Field
              label=""
              id="crewFirstAssistantPhoneNumber"
              name="crewFirstAssistantPhoneNumber"
              type="text"
              component={renderCrewFirstAssistantPhoneNumberField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="crewSecondAssistantName"
              name="crewSecondAssistantName"
              type="text"
              component={renderCrewSecondAssistantNameField}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5, marginTop: 0 }}>
            <Field
              label=""
              id="crewSecondAssistantPhoneNumber"
              name="crewSecondAssistantPhoneNumber"
              type="text"
              component={renderCrewSecondAssistantPhoneNumberField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="transitCommencementDate"
          name="transitCommencementDate"
          type="date"
          component={renderTransitCommencementDateField}
          style={{ marginTop: 10 }}
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
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "orderOnTransitCreateForm",
})(OrderOnTransitCreateForm);
