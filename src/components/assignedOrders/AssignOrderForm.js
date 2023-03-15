import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import ProductCard from "./ProductCard";
import api from "../../apis/local";
import { CREATE_ASSIGNED_ORDER } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //marginTop: "100px",
    //height: "80vh",
    // height: "100%",
    // position: "relative",
    // "& video": {
    //   objectFit: "cover",
    // },
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 180,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function AssignOrderForm(props) {
  const { params } = props.params;

  const classes = useStyles();
  const [category, setCategory] = useState();
  const [order, setOrder] = useState();
  const [vendor, setVendor] = useState();
  const [country, setCountry] = useState();
  const [totalUnassignedQuantity, setTotalUnassignedQuantity] = useState();
  const [remainingOrderedQuantity, setRemainingOrderedQuantity] = useState();
  const [orderNumber, setOrderNumber] = useState();

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
      const response = await api.get("/orders", {
        params: { transactionId: props.params.id },
      });
      const workingData = response.data.data.data;
      workingData.map((item) => {
        allData.push({
          id: item._id,
          orderNumber: item.orderNumber,
          cartId: item.cartId,
          product: item.product,
          orderedQuantity: item.orderedQuantity,
          orderedPrice: item.orderedPrice,
          productCurrency: item.productCurrency,
          productImageCover: item.product.imageCover,
          productName: item.product.name,
          productCategory: item.product.category,
          productSku: item.product.sku,
        });
      });
      setOrderList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props.params.id]);

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

  console.log("length is:", orderList.length);

  const allOrderList = (
    <React.Fragment>
      {
        <Grid container direction="row">
          {orderList.map((order, index) => (
            <ProductCard
              title={order.product.name}
              key={`${order.id}${index}`}
              image={order.product.imageCover}
              category={order.product.category}
              orderNumber={order.orderNumber}
              orderedQuantity={order.orderedQuantity}
              sku={order.product.sku}
              configuration={order.product.configuration}
              orderedPrice={order.orderedPrice}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  );

  return (
    <>
      <Grid
        item
        container
        style={{ marginTop: 1, marginBottom: 2 }}
        justifyContent="center"
      >
        {orderList.length === 1 && (
          <CancelRoundedIcon
            style={{
              marginLeft: 250,
              fontSize: 30,
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={() => [props.handleAssignDialogOpenStatus()]}
          />
        )}
        {orderList.length > 1 && (
          <CancelRoundedIcon
            style={{
              marginLeft: 480,
              fontSize: 30,
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={() => [props.handleAssignDialogOpenStatus()]}
          />
        )}
      </Grid>
      <Grid container direction="row" className={classes.root}>
        {/* <Typography style={{ marginLeft: "150px" }}>
          Items in this Order
        </Typography> */}

        <Grid item>{allOrderList}</Grid>
      </Grid>
    </>
  );
}

export default AssignOrderForm;
