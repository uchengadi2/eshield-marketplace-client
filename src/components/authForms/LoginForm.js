import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { TextField } from "@material-ui/core";
import background from "./../../assets/images/covers/footage_image.png";

const useStyles = makeStyles((theme) => ({
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 200,
    marginBottom: 10,
    fontSize: "1.25rem",
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
  },
}));

const SignInForm = (props) => {
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

  // const handleFormChange = (event) => {
  //   let loginParamsNew = { ...loginParams };
  //   let val = event.target.value;
  //   loginParamsNew[event.target.name] = val;
  //   this.setState({
  //     loginParams: loginParamsNew,
  //   });
  // };

  // const login = (event) => {
  //   let email = loginParams.email;
  //   let user_password = loginParams.password;
  //   if (email === "admin" && password === "123") {
  //     localStorage.setItem("token", "T");
  //     this.setState({
  //       islogged: true,
  //     });
  //   }
  //   event.preventDefault();
  // };

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
        fullWidth
        type={type}
        {...custom}
        {...input}
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
        //placeholder={label}
        //value={"password1234"}
        label={label}
        id={input.name}
        fullWidth
        type={type}
        style={{ marginTop: "1em" }}
        {...custom}
      />
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
    //console.log("login form values are:", formValues);
  };

  return (
    <form id="loginForm" className={classes.background}>
      <Grid item>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item lg={5}>
            <Card className={classes.root}>
              <CardContent>
                <Grid container direction="column">
                  <Grid item style={{ marginTop: 10 }}>
                    <Field
                      name="email"
                      component={renderTextField}
                      //component="input"
                      label="Email"
                      type="email"
                      //ref="email"
                      //hintText="Email"
                      //floatingLabelText="Email"
                      //withRef
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 20 }}>
                    <Field
                      name="password"
                      component={renderTextField}
                      //component="input"
                      label="Password"
                      type="password"
                      //hintText="Password"
                      //floatingLabelText="Password"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Grid item style={{ marginTop: "2em" }}>
                <Button
                  //   disabled={
                  //     email.length === 0 ||
                  //     password.length === 0 ||
                  //     emailHelper.length !== 0 ||
                  //     passwordHelper.length !== 0
                  //   }
                  variant="contained"
                  className={classes.sendButton}
                  onClick={props.handleSubmit(onSubmit)}
                >
                  Login
                </Button>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
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
})(SignInForm);
