import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import { EDIT_USER } from "../../actions/types";

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
    width: 100,
    marginLeft: 200,
    marginTop: 30,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

const renderEmailField = ({
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
      helperText="Enter user email address"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
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
      //error={touched && invalid}
      helperText="Enter user password"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
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

const renderConfirmPasswordField = ({
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
      helperText="Re-enter password for confirmation"
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
      style={{ marginTop: 15 }}

      //onChange={handleInput}
    />
  );
};

const renderNameField = ({
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
      helperText="Enter the name of the user"
      variant="outlined"
      label={label}
      id={input.name}
      // value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
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

function UserEditForm(props) {
  const { params } = props;
  const classes = useStyles();
  const [role, setRole] = useState(params.role);
  const [type, setType] = useState(params.type);
  const [userType, setUserType] = useState(params.type);
  const [loading, setLoading] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const [vendor, setVendor] = useState(params.vendor);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVendorData = async () => {
      let allData = [{ id: "all", name: "All" }];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get("/vendors");
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({
          id: vendor._id,
          name: `${vendor.vendorNumber} - ${vendor.name}`,
        });
      });
      setVendorList(allData);
    };

    //call the function

    fetchVendorData().catch(console.error);
  }, []);

  const handleUserRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  //get the country list
  const renderVendorList = () => {
    return vendorList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderUserRoleField = ({
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
            labelId="role"
            id="role"
            value={role}
            onChange={handleUserRoleChange}
            label="Role"
            style={{ marginTop: 15, width: 500, height: 38 }}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"user"}>User</MenuItem>
            {/* <MenuItem value={"partner_user"}>Partner User</MenuItem>
            <MenuItem value={"partner_admin"}>Partner Admin</MenuItem> */}
            <MenuItem value={"staff"}>Staff</MenuItem>
          </Select>
          <FormHelperText>Select User Role</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderTypeRadioField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box style={{ marginTop: 15 }}>
        <FormControl component="fieldset">
          <FormLabel style={{ color: "blue" }} component="legend">
            User Type
          </FormLabel>
          <RadioGroup
            aria-label="type"
            name="type"
            value={type}
            onChange={handleTypeChange}
          >
            <Grid item container direction="row">
              <Grid item>
                <FormControlLabel
                  value="staff"
                  control={<Radio />}
                  label="Staff"
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  value="partner"
                  control={<Radio />}
                  label="Partner"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value="customer"
                  control={<Radio />}
                  label="Customer"
                />
              </Grid>
            </Grid>
          </RadioGroup>
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
            style={{ height: 38, width: 500 }}
          >
            {renderVendorList()}
          </Select>
          <FormHelperText>Select Vendor</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderUserTypeField = ({
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
            labelId="userType"
            id="userType"
            value={userType}
            onChange={handleUserTypeChange}
            label="user Type"
            style={{ width: 500, height: 38, marginTop: 15 }}
          >
            <MenuItem value={"staff"}>Staff</MenuItem>
            <MenuItem value={"customer"}>Customer</MenuItem>
            <MenuItem value={"partner"}>Partner</MenuItem>
          </Select>
          <FormHelperText>User Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);
    const data = {
      name: formValues.name ? formValues.name : params.name,
      email: formValues.email ? formValues.email : params.email,
      role: role,
      // password: formValues.password,
      // passwordConfirm: formValues.passwordConfirm,
      type: userType,
      //vendor: vendor,
    };

    if (data) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/users/${params.id}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_USER,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `${response.data.data.data.name} User is updated successfully!!!`
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
          User Details
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="userEditForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          height: 400,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Field
          label=""
          id="email"
          name="email"
          type="email"
          defaultValue={params.email}
          component={renderEmailField}
        />
        {/* <Field
          label=""
          id="password"
          name="password"
          type="password"
          component={renderPasswordField}
        />
        <Field
          label=""
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          component={renderConfirmPasswordField}
        /> */}

        <Grid container direction="row">
          <Grid item style={{ width: "100%" }}>
            <Field
              label=""
              id="name"
              name="name"
              defaultValue={params.name}
              type="text"
              component={renderNameField}
            />
          </Grid>
        </Grid>

        <Field
          label=""
          id="role"
          name="role"
          type="text"
          component={renderUserRoleField}
        />

        {/* <Field
          label=""
          id="type"
          name="type"
          type="text"
          component={renderTypeRadioField}
        /> */}
        <Field
          label=""
          id="userType"
          name="userType"
          type="text"
          component={renderUserTypeField}
          style={{ marginTop: 10 }}
        />
        {/* <Field
          label=""
          id="vendor"
          name="vendor"
          type="text"
          component={renderVendorField}
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
  form: "userEditForm",
})(UserEditForm);
