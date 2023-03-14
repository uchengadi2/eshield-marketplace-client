import React, { useState, useEffect } from "react";
import { AppBar, IconButton } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { useScrollTrigger } from "@material-ui/core";
//import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
//import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import history from "./../../history";
import UserLogOut from "../users/UserLogOut";

import logo from "./../../assets/logo.svg";
import { RouterRounded } from "@material-ui/icons";
import UserLogout from "../authForms/UserLogout";

function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    //target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    width: "26em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "15px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "250px",
    marginLeft: "30px",
    marginRight: "10px",
    height: "45px",
    width: "100px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "blue",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
    setOpenMenu(true);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleLogOutDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpenLogOut(false);
  };

  const menuOptions = [];

  const routes = [
    // { name: "Dashboard", link: "/", activeIndex: 0 },
    { name: "Categories", link: "/categories", activeIndex: 0 },
    //{ name: "Categories", link: "/categories/new", activeIndex: 1 },
    {
      name: "Partners",
      link: "/partners",
      activeIndex: 1,
    },
    { name: "Products", link: "/products", activeIndex: 2 },
    // { name: "Cities", link: "/cities", activeIndex: 3 },
    { name: "Users", link: "/users", activeIndex: 3 },
    { name: "Orders", link: "/orders", activeIndex: 4 },
    { name: "Deliveries", link: "/deliveries", activeIndex: 5 },
    { name: "Payments", link: "/payments", activeIndex: 6 },
    { name: "Remittances", link: "/remittances", activeIndex: 7 },
    // { name: "Reports", link: "/reports", activeIndex: 8 },
    { name: "Utilities", link: "/utilities", activeIndex: 9 },

    // { name: "Sign Out", link: "/logout" },
  ];

  //   useEffect(() => {
  //
  //         if (window.location.pathname === "/" && value !== 0) {
  //           setValue(0);
  //         } else if (window.location.pathname === "/services" && value !== 1) {
  //           setValue(1);
  //         } else if (window.location.pathname === "/revolution" && value !== 2) {
  //           setValue(2);
  //         } else if (window.location.pathname === "/about" && value !== 3) {
  //           setValue(3);
  //         } else if (window.location.pathname === "/contact" && value !== 4) {
  //           setValue(4);
  //         } else if (window.location.pathname === "/estimate" && value !== 5) {
  //           setValue(5);
  //         }

  //     switch (window.location.pathname) {
  //       case "/":
  //         if (value !== 0) {
  //           setValue(0);
  //         }
  //         break;
  //       case "/services":
  //         if (value !== 1) {
  //           setValue(1);
  //           setSelectedIndex(0);
  //         }
  //         break;
  //       case "/customservices":
  //         if (value !== 1) {
  //           setValue(1);
  //           setSelectedIndex(1);
  //         }
  //         break;
  //       case "/mobileapps":
  //         if (value !== 1) {
  //           setValue(1);
  //           setSelectedIndex(2);
  //         }
  //         break;
  //       case "/websites":
  //         if (value !== 1) {
  //           setValue(1);
  //           setSelectedIndex(3);
  //         }
  //         break;
  //       case "/revolutions":
  //         if (value !== 2) {
  //           setValue(2);
  //         }
  //         break;
  //       case "/about":
  //         if (value !== 3) {
  //           setValue(3);
  //         }
  //         break;
  //       case "/contact":
  //         if (value !== 4) {
  //           setValue(4);
  //         }
  //         break;
  //       case "/estimate":
  //         if (value !== 5) {
  //           setValue(5);
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   }, [value]);

  //this is the refactored version of the hook
  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
            if (
              route.selectedIndex &&
              RouterRounded.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        case "/logout":
          props.setValue(12);
          break;
        default:
          break;
      }
    });
  }, [props.value, menuOptions, props.selectedIndex, routes, props]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            // aria-owns={route.ariaOwns}
            // aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <Button
        variant="contained"
        // component={Link}
        // to="/logout"
        color="inherit"
        className={classes.buttonSignOut}
        onClick={() => [setOpenLogOut(true), history.push("/")]}
      >
        Sign Out
      </Button>
    </React.Fragment>
  );

  const renderLogOutForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openLogOut}
        onClose={() => [setOpenLogOut(false), history.push("/")]}
      >
        <DialogContent>
          <UserLogOut
            setToken={props.setToken}
            setUserId={props.setUserId}
            initiateIsSignedOut={props.initiateIsSignedOut}
            handleLogOutDialogOpenStatus={handleLogOutDialogOpenStatus}
            token={props.token}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              //   className={
              //     value === route.activeIndex
              //       ? [classes.drawerItem, classes.drawerItemSelected]
              //       : classes.drawerItem
              //   }
              className={classes.drawerItem}
              divider
              key={`${route}${route.activeIndex}`}
              button
              component={Link}
              to={route.link}
              selected={props.value === route.activeIndex}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex);
              }}
            >
              <ListItemText disableTypography>{route.name}</ListItemText>
            </ListItem>
          ))}

          <ListItem
            className={classes.drawerItemEstimate}
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(5);
            }}
            divider
            button
            component={Link}
            to="/estimate"
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
            selected={props.value === 5}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              onClick={() => props.setValue(0)}
              disableRipple
              component={Link}
              to="/"
              className={classes.logoContainer}
            >
              {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            </Button>
            {/* {matches ? drawer : tabs} */}
            {tabs}
            {renderLogOutForm()}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </React.Fragment>
  );
};

export default Header;
