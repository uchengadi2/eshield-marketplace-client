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
import { CREATE_COMPLETED_ORDER } from "../../actions/types";

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
      helperText="Order Fullfillment Label"
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
      helperText="Order Fullfillment Reference Number"
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

const renderRecieverNameField = ({
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
      helperText="Reciever Name"
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

const renderRecieverPhoneNumberField = ({
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
      helperText="Reciever Phone Number"
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

const renderDateFullfilledField = ({
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
      helperText="Date Fullfilled"
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

const renderCommentField = ({
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
      helperText="Comment"
      variant="outlined"
      //label={label}
      id={input.name}
      fullWidth
      //required
      type={type}
      {...custom}
      multiline={true}
      minRows={3}
      onChange={input.onChange}

      //onChange={handleInput}
    />
  );
};

function OrderOnCompletionCreateForm(props) {
  const classes = useStyles();

  const [countryList, setCountryList] = useState([]);
  const [orderAssignmentList, setOrderAssignmentList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [onTransitOrderList, setOnTransitOrderList] = useState([]);

  const [country, setCountry] = useState();
  const [orderAssignment, setOrderAssignment] = useState();
  const [order, setOrder] = useState();
  const [category, setCategory] = useState();
  const [vendor, setVendor] = useState();
  const [vehicle, setVehicle] = useState();
  const [orderNumber, setOrderNumber] = useState();
  const [orderAssignmentRefNumber, setOrderAssignmentRefNumber] = useState();
  const [onTransitOrder, setOnTransitOrder] = useState();
  const [crewLeaderName, setCrewLeaderName] = useState();
  const [crewLeaderPhoneNumber, setCrewLeaderPhoneNumber] = useState();
  const [crewFirstAssistantName, setCrewFirstAssistantName] = useState();
  const [crewFirstAssistantPhoneNumber, setCrewFirstAssistantPhoneNumber] =
    useState();
  const [crewSecondAssistantName, setCrewSecondAssistantName] = useState();
  const [crewSecondAssistantPhoneNumber, setCrewSecondAssistantPhoneNumber] =
    useState();
  const [transitCommencementDate, setTransitCommencementDate] = useState();
  const [status, setStatus] = useState();
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
      const response = await api.get("/orderontransits", {
        params: { vendorCountry: country },
      });
      const workingData = response.data.data.data;
      workingData.map((order) => {
        allData.push({
          id: order._id,
          name: `${order.refNumber}-${order.label}`,
        });
      });
      setOnTransitOrderList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [country]);

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
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/orderontransits/${onTransitOrder}`);
      const item = response.data.data.data;
      allData.push({
        assignedOrder: item.assignedOrder,
        vehicle: item.vehicle,
        crewLeaderName: item.crewLeaderName,
        crewLeaderPhoneNumber: item.crewLeaderPhoneNumber,
        crewFirstAssistantName: item.crewFirstAssistantName,
        crewFirstAssistantPhoneNumber: item.crewFirstAssistantPhoneNumber,
        crewSecondAssistantName: item.crewSecondAssistantName,
        crewSecondAssistantPhoneNumber: item.crewSecondAssistantPhoneNumber,
        transitCommencementDate: item.transitCommencementDate,
      });
      setOrderAssignment(allData[0].assignedOrder);
      setVehicle(allData[0].vehicle);
      setCrewLeaderName(allData[0].crewLeaderName);
      setCrewLeaderPhoneNumber(allData[0].crewLeaderPhoneNumber);
      setCrewFirstAssistantName(allData[0].crewFirstAssistantName);
      setCrewFirstAssistantPhoneNumber(
        allData[0].crewFirstAssistantPhoneNumber
      );
      setCrewSecondAssistantName(allData[0].crewSecondAssistantName);
      setCrewSecondAssistantPhoneNumber(
        allData[0].crewSecondAssistantPhoneNumber
      );
      setTransitCommencementDate(allData[0].transitCommencementDate);
    };

    //call the function

    fetchData().catch(console.error);
  }, [onTransitOrder]);

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

  const handleOnTransitOrderChange = (event) => {
    setOnTransitOrder(event.target.value);
  };

  const handleFullfillmentStatusChange = (event) => {
    setStatus(event.target.value);
  };

  console.log("crewLeaderName:", crewLeaderName);

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

  //get the  ontransit order list
  const renderOrderOnTransitList = () => {
    return onTransitOrderList.map((item) => {
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
            readOnly
          >
            {renderVehicleList()}
          </Select>
          <FormHelperText>Vehicle </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderOnTransitOrderType = ({
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
            labelId="onTransitOrder"
            id="onTransitOrder"
            value={onTransitOrder}
            onChange={handleOnTransitOrderChange}
            label="Order On Transit"
            style={{ marginTop: 10, width: 500, height: 38 }}
          >
            {renderOrderOnTransitList()}
          </Select>
          <FormHelperText>Order on Transit </FormHelperText>
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
            readOnly
          >
            {renderOrderAssignmentList()}
          </Select>
          <FormHelperText>Select Order Assignment </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderFullfillmentStatusType = ({
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
            labelId="status"
            id="status"
            value={status}
            onChange={handleFullfillmentStatusChange}
            label="Fullfillment Status"
            style={{ width: 500, height: 38, marginTop: 10 }}
          >
            <MenuItem value={"accepted"}>Accepted</MenuItem>
            <MenuItem value={"rejected"}>Rejected</MenuItem>
          </Select>
          <FormHelperText>Fullfillment Status </FormHelperText>
        </FormControl>
      </Box>
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
        disabled
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
        disabled
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
        disabled
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
        disabled
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
        disabled
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
        disabled
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
    return <React.Fragment> Fullfill Order</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    //prepare the data for submission
    setLoading(true);
    formValues["category"] = category;
    formValues["vendor"] = vendor;
    formValues["order"] = order;
    formValues["country"] = country;
    formValues["vehicle"] = vehicle;
    formValues["assignedOrder"] = orderAssignment;
    formValues["createdBy"] = props.userId;
    formValues["onTransitOrder"] = onTransitOrder;
    formValues["status"] = status;

    if (!formValues["refNumber"]) {
      formValues["refNumber"] =
        "FFL-" + Math.floor(Math.random() * 10000000000) + "-ORD";
    }

    console.log("formvalues are:", formValues);

    if (formValues) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/orderoncompletions`, formValues);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_COMPLETED_ORDER,
            payload: response.data.data.data,
          });

          //change the status of ontransit order
          const dataValue = {
            status: "fullfilled",
          };
          const transResponse = await api.patch(
            `/orderontransits/${onTransitOrder}`,
            dataValue
          );

          props.handleSuccessfulCreateSnackbar(
            `${response.data.data.data.refNumber} Order is fullfilled successfully!!!`
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

  console.log("the token is:", props.token);

  const dateOfTransitCommencement = transitCommencementDate
    ? new Date(transitCommencementDate).toISOString().slice(0, 10)
    : "";

  return (
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "grey", fontSize: "1.3em" }}
          component="legend"
        >
          Order Fullfillment
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="orderOnCompletionCreateForm"
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
        <Field
          label=""
          id="onTransitOrder"
          name="onTransitOrder"
          type="text"
          component={renderOnTransitOrderType}
          style={{ marginTop: 10 }}
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

        <FormLabel
          style={{ color: "blue", marginTop: 15, fontSize: "1.2em" }}
          component="legend"
        >
          Crew Details
        </FormLabel>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="crewLeaderName"
              name="crewLeaderName"
              defaultValue={crewLeaderName}
              type="text"
              component={renderCrewLeaderNameTypeField}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5, marginTop: 0 }}>
            <Field
              label=""
              id="crewLeaderPhoneNumber"
              name="crewLeaderPhoneNumber"
              defaultValue={crewLeaderPhoneNumber}
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
              defaultValue={crewFirstAssistantName}
              type="text"
              component={renderFirstAssistantNameField}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5, marginTop: 0 }}>
            <Field
              label=""
              id="crewFirstAssistantPhoneNumber"
              name="crewFirstAssistantPhoneNumber"
              defaultValue={crewFirstAssistantPhoneNumber}
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
              defaultValue={crewSecondAssistantName}
              type="text"
              component={renderCrewSecondAssistantNameField}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5, marginTop: 0 }}>
            <Field
              label=""
              id="crewSecondAssistantPhoneNumber"
              name="crewSecondAssistantPhoneNumber"
              defaultValue={crewSecondAssistantPhoneNumber}
              type="text"
              component={renderCrewSecondAssistantPhoneNumberField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="transitCommencementDate"
          name="transitCommencementDate"
          defaultValue={dateOfTransitCommencement}
          type="date"
          component={renderTransitCommencementDateField}
          style={{ marginTop: 10 }}
        />
        <FormLabel
          style={{ color: "blue", marginTop: 15, fontSize: "1.2em" }}
          component="legend"
        >
          Order Fullfillment Details
        </FormLabel>
        <Field
          label=""
          id="status"
          name="status"
          type="text"
          component={renderFullfillmentStatusType}
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
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="recieverName"
              name="recieverName"
              type="text"
              component={renderRecieverNameField}
            />
          </Grid>
          <Grid item style={{ width: "39%", marginLeft: 5, marginTop: 0 }}>
            <Field
              label=""
              id="recieverPhoneNumber"
              name="recieverPhoneNumber"
              type="text"
              component={renderRecieverPhoneNumberField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="dateFullfilled"
          name="dateFullfilled"
          type="date"
          component={renderDateFullfilledField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="comment"
          name="comment"
          type="text"
          component={renderCommentField}
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
  form: "orderOnCompletionCreateForm",
})(OrderOnCompletionCreateForm);
