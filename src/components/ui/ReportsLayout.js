import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import history from "../../history";

import PaymentPaymentLayout from "./PaymentPaymentLayout";
import RemittanceRemittanceLayout from "./RemittanceRemittanceLayout";
import GeneralReportsLayout from "./reports/GeneralReportsLayout";
import UserReportsLayout from "./reports/UserReportsLayout";
import ProductReportsLayout from "./reports/ProductReportsLayout";
import RemittanceReportsLayout from "./reports/RemittanceReportsLayout";
import PaymantReportsLayout from "./reports/PaymentReportsLayout";
import OrderReportsLayout from "./reports/OrderReportsLayout";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component={Link}
      //to={route.link}
      //label={route.name}
      onClick={(event) => {
        event.preventDefault();
        history.push(`/reports/`);
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    //height: 180,
    marginTop: "-20px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function ReportsLayout({ token, userId }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        //variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab
          label="General"
          {...a11yProps(0)}
          onClick={(event) => {
            event.preventDefault();
            history.push(`/reports/general`);
          }}
        />
        <Tab
          label="Users"
          {...a11yProps(0)}
          onClick={(event) => {
            event.preventDefault();
            history.push(`/reports/users`);
          }}
        />
        <Tab
          label="Products"
          {...a11yProps(0)}
          onClick={(event) => {
            event.preventDefault();
            history.push(`/reports/products`);
          }}
        />
        <Tab
          label="Orders"
          {...a11yProps(0)}
          onClick={(event) => {
            event.preventDefault();
            history.push(`/reports/orders`);
          }}
        />
        <Tab
          label="Payments"
          {...a11yProps(0)}
          onClick={(event) => {
            event.preventDefault();
            history.push(`/reports/payments`);
          }}
        />
        <Tab
          label="Remittances"
          {...a11yProps(0)}
          onClick={(event) => {
            event.preventDefault();
            history.push(`/reports/remittances`);
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <GeneralReportsLayout token={token} userId={userId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserReportsLayout token={token} userId={userId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProductReportsLayout token={token} userId={userId} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <OrderReportsLayout token={token} userId={userId} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <PaymantReportsLayout token={token} userId={userId} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <RemittanceReportsLayout token={token} userId={userId} />
      </TabPanel>
    </div>
  );
}

export default ReportsLayout;
