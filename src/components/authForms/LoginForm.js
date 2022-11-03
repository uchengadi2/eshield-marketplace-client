import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import { TextField } from "@material-ui/core";
//import background from "./../../logistic_assets/cover_image_1.png";
import background from "./../../assets/images/covers/cover3.png";

import api from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 170,
    marginBottom: 10,
    marginTop: 30,
    fontSize: "1.15rem",
    backgroundColor: "#FFBA60",
    color: "white",
    "&:hover": {
      backgroundColor: "#0B72B9",
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
  root: {
    maxWidth: 500,
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
    inputText: {
      marginLeft: 400,
      width: "100%",
      color: "white",
    },
  },
  boxContainer: {
    backgroundColor: "white",
    marginLeft: 400,
    width: "100%",
    margin: 40,
    padding: 30,
    borderRadius: 80,
  },
}));

const renderTextField = ({
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
      helperText={touched && error}
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      type={type}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderPasswordField = ({
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
      helperText={touched && error}
      variant="outlined"
      defaultValue={input.value}
      label={label}
      id={input.name}
      fullWidth
      type={type}
      style={{ marginTop: "1em" }}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const LoginForm = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [islogged, setIsLogged] = useState(false);
  const [loginParams, setLoginparams] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const [loading, setLoading] = useState(false);

  const buttonContent = () => {
    return <React.Fragment>Login</React.Fragment>;
  };

  const handleSuccessfulLoginInSnackbar = (message) => {
    // setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedLoginInSnackbar = (message) => {
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    //setBecomePartnerOpen(true);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  let count = 0;
  const onSubmit = (formValues) => {
    setLoading(true);

    if (!formValues["email"] || !formValues["password"]) {
      handleFailedLoginInSnackbar(
        "Please enter your email and password login credentials and try again"
      );
      setLoading(false);
      return;
    }

    if (!validateEmail(formValues["email"])) {
      handleFailedLoginInSnackbar(
        "You just entered an invalid email address. Please correct it and try again"
      );
      setLoading(false);

      return;
    }

    if (formValues) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/users/login`, formValues);
        console.log("login response:", response);

        if (response.data.status === "success") {
          //props.onSubmit(formValues);
          ++count;
          console.log("successfully logged in");
          //setLoading(false);
        } else {
          props.handleFailedLoginInSnackbar("Incorrect Username or Password");
        }
      };
      createForm().catch((err) => {
        handleFailedLoginInSnackbar("Incorrect Username or Password");
        setLoading(false);
        console.log("err:", err.message);
      });
    }

    props.onSubmit(formValues);
    setLoading(true);
  };

  return (
    <form id="loginForm" className={classes.background}>
      <Box
        sx={{
          width: 500,
          //height: 420,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          style={{ minHeight: "100vh" }}
        >
          <Box className={classes.boxContainer}>
            <Grid
              item
              className={classes.inputText}
              style={{ width: "100%", marginTop: 20 }}
            >
              <Field
                name="email"
                label="Email"
                type="text"
                component={renderTextField}
              />
            </Grid>
            <Grid
              item
              className={classes.inputText}
              style={{ width: "100%", marginTop: 20 }}
            >
              <Field
                name="password"
                label="Password"
                type="password"
                component={renderPasswordField}
              />
            </Grid>
            <Grid item style={{ marginTop: "2em" }}>
              <Button
                variant="contained"
                className={classes.sendButton}
                onClick={props.handleSubmit(onSubmit)}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonContent()
                )}
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Box>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: { backgroundColor: alert.backgroundColor },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};
  let valid;

  if (!formValues.email) {
    errors.email = "Invalid email";
  } else if (
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)
  ) {
    errors.email = "Invalid email";
  }

  if (!formValues.password) {
    errors.password = "Please enter your password";
  }

  return errors;
};

export default reduxForm({
  form: "loginForm",
  // validate: validate,
})(LoginForm);
