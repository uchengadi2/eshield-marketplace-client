import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
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

import api from "./../../../../apis/local";
import { EDIT_USER } from "../../../../actions/types";

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
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
        },
      }}

      //onChange={handleInput}
    />
  );
};

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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      disabled
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
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
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      style={{ marginTop: 15 }}
      InputProps={{
        style: {
          height: 38,
        },
      }}

      //onChange={handleInput}
    />
  );
};

const renderMemoField = ({
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
      helperText="Memo"
      label={label}
      id={input.name}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={6}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderStaffNumberField = ({
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
      helperText="Enter Staff Number"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
        },
      }}

      //onChange={handleInput}
    />
  );
};

const renderNextOfKinNameField = ({
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
      helperText="Enter Next of Kin Name"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
        },
      }}

      //onChange={handleInput}
    />
  );
};

const renderGuarantorNameField = ({
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
      helperText="Enter Guarantor Name"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
        },
      }}

      //onChange={handleInput}
    />
  );
};

const renderCourseOfStudyField = ({
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
      helperText="Enter Course of Study"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
        },
      }}

      //onChange={handleInput}
    />
  );
};

const renderDateOfBirthField = ({
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
      helperText="Date of Birth"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
        },
      }}

      //onChange={handleInput}
    />
  );
};

const renderReferencesField = ({
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
      helperText="References"
      label={label}
      id={input.name}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={6}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderHomeAddressField = ({
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
      helperText="Staff Home Address"
      label={label}
      id={input.name}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={6}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderNextOfKinAddressField = ({
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
      helperText="Next of Kin Address"
      label={label}
      id={input.name}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={6}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderGuarantorAddressField = ({
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
      helperText="Guarantor Address"
      label={label}
      id={input.name}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={6}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderPhoneNumbersField = ({
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
      helperText="Enter Phone Numbers"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
        },
      }}

      //onChange={handleInput}
    />
  );
};

const renderNextOfKinPhoneNumbersField = ({
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
      helperText="Enter Next of Kin Phone Numbers"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
        },
      }}

      //onChange={handleInput}
    />
  );
};

const renderGuarantorPhoneNumbersField = ({
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
      helperText="Enter Guarantor Phone Numbers"
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      style={{ marginTop: 15 }}
      onChange={input.onChange}
      InputProps={{
        style: {
          height: 38,
        },
      }}

      //onChange={handleInput}
    />
  );
};

function StaffEditForm(props) {
  const { params } = props;
  const classes = useStyles();
  const [role, setRole] = useState(params.role);
  const [serviceOutlet, setServiceOutlet] = useState(params.serviceOutlet);
  const [gender, setGender] = useState(params.gender);
  const [guarantorGender, setGuarantorGender] = useState(
    params.guarantorGender
  );
  const [maritalStatus, setMaritalStatus] = useState(params.maritalStatus);
  const [highestLevelOfEducationAttained, setHighestLevelOfEducationAttained] =
    useState(params.highestLevelOfEducationAttained);
  const [nextOfKinRelationship, setNextOfKinRelationship] = useState(
    params.nextOfKinRelationship
  );
  const [guarantorRelationship, setGuarantorRelationship] = useState(
    params.guarantorRelationship
  );
  const [userType, setUserType] = useState(params.userType);
  const [serviceOutletList, setServiceOutletList] = useState([]);
  const [loading, setLoading] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/serviceoutlets`);
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setServiceOutletList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const handleUserRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleServiceOutletChange = (event) => {
    setServiceOutlet(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleGuarantorGenderChange = (event) => {
    setGuarantorGender(event.target.value);
  };
  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  const handleGuarantorRelationshipChange = (event) => {
    setGuarantorRelationship(event.target.value);
  };

  const handleNextOfKinRelationshipChange = (event) => {
    setNextOfKinRelationship(event.target.value);
  };

  const handleHighestLevelOfEducationAttainedChange = (event) => {
    setHighestLevelOfEducationAttained(event.target.value);
  };

  //get the state list
  const renderServiceOutletList = () => {
    return serviceOutletList.map((item) => {
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
            style={{ marginTop: 15, width: 240, height: 38 }}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"user"}>User</MenuItem>
            {/* <MenuItem value={"partner_user"}>Partner User</MenuItem>
            <MenuItem value={"partner_admin"}>Partner Admin</MenuItem>
            <MenuItem value={"customer"}>Customer</MenuItem> */}
          </Select>
          <FormHelperText>Select User Role</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderServiceOutletField = ({
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
            labelId="currentServiceOutlet"
            id="currentServiceOutlet"
            value={serviceOutlet}
            onChange={handleServiceOutletChange}
            label="Service Outlet"
            style={{ marginTop: 15, width: 500, height: 38 }}
          >
            {renderServiceOutletList()}
          </Select>
          <FormHelperText>Select User Service Outlet</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderGenderField = ({
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
            labelId="gender"
            id="gender"
            value={gender}
            onChange={handleGenderChange}
            label="Gender"
            style={{ marginTop: 15, width: 240, height: 38 }}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            {/* <MenuItem value={"partner_user"}>Partner User</MenuItem>
            <MenuItem value={"partner_admin"}>Partner Admin</MenuItem>
            <MenuItem value={"customer"}>Customer</MenuItem> */}
          </Select>
          <FormHelperText>Select Gender</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderGuarantorgenderField = ({
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
            labelId="guarantorGender"
            id="guarantorGender"
            value={guarantorGender}
            onChange={handleGuarantorGenderChange}
            label="Guarantor Gender"
            style={{ marginTop: 15, width: 240, height: 38 }}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            {/* <MenuItem value={"partner_user"}>Partner User</MenuItem>
            <MenuItem value={"partner_admin"}>Partner Admin</MenuItem>
            <MenuItem value={"customer"}>Customer</MenuItem> */}
          </Select>
          <FormHelperText>Select Guarantor Gender</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderMaritalStatusField = ({
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
            labelId="maritalStatus"
            id="maritalStatus"
            value={maritalStatus}
            onChange={handleMaritalStatusChange}
            label="Marital Status"
            style={{ marginTop: 15, width: 240, height: 38 }}
          >
            <MenuItem value={"married"}>Married</MenuItem>
            <MenuItem value={"divorced"}>Divorced</MenuItem>
            <MenuItem value={"single"}>Single</MenuItem>
            <MenuItem value={"custom-union"}>Custom Union</MenuItem>
            <MenuItem value={"widowed"}>Widowed</MenuItem>
          </Select>
          <FormHelperText>Select Marital Status</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderHighestLevelOfEducationAttainedField = ({
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
            labelId="highestLevelOfEducationAttained"
            id="highestLevelOfEducationAttained"
            value={highestLevelOfEducationAttained}
            onChange={handleHighestLevelOfEducationAttainedChange}
            label="Highest Education Level Attained"
            style={{ marginTop: 15, width: 240, height: 38 }}
          >
            <MenuItem value={"phd"}>PhD</MenuItem>
            <MenuItem value={"masters"}>Masters</MenuItem>
            <MenuItem value={"bachelors"}>Bachelors</MenuItem>
            <MenuItem value={"higher-diploma"}>Higher Diploma</MenuItem>
            <MenuItem value={"diploma"}>Diploma</MenuItem>
            <MenuItem value={"oLevel"}>OLevel</MenuItem>
            <MenuItem value={"others"}>Others</MenuItem>
          </Select>
          <FormHelperText>Select Highest Education Attained</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderGuarantorRelationshipField = ({
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
            labelId="guarantorRelationship"
            id="guarantorRelationship"
            value={guarantorRelationship}
            onChange={handleGuarantorRelationshipChange}
            label="Guarantor Relationship"
            style={{ marginTop: 15, width: 240, height: 38 }}
          >
            <MenuItem value={"sibling"}>Sibling</MenuItem>
            <MenuItem value={"uncle"}>Uncle</MenuItem>
            <MenuItem value={"aunt"}>Aunt</MenuItem>
            <MenuItem value={"spouse"}>Spouse</MenuItem>
            <MenuItem value={"friend"}>Friend</MenuItem>
            <MenuItem value={"parent"}>Parent</MenuItem>
            <MenuItem value={"others"}>Others</MenuItem>
          </Select>
          <FormHelperText>Relationship to Guarantor</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderNextOfKinRelationshipField = ({
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
            labelId="nextOfKinRelationship"
            id="nextOfKinRelationship"
            value={nextOfKinRelationship}
            onChange={handleNextOfKinRelationshipChange}
            label="Next of Kin Relationship"
            style={{ marginTop: 15, width: 240, height: 38 }}
          >
            <MenuItem value={"sibling"}>Sibling</MenuItem>
            <MenuItem value={"uncle"}>Uncle</MenuItem>
            <MenuItem value={"aunt"}>Aunt</MenuItem>
            <MenuItem value={"spouse"}>Spouse</MenuItem>
            <MenuItem value={"friend"}>Friend</MenuItem>
            <MenuItem value={"parent"}>Parent</MenuItem>
            <MenuItem value={"others"}>Others</MenuItem>
          </Select>
          <FormHelperText>Relationship to Next of Kin</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment>Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    const Str = require("@supercharge/strings");
    // formValues["code"] = Str(formValues.code).limit(4).get();
    formValues["createdBy"] = props.userId;
    formValues["serviceOutlet"] = serviceOutlet;
    formValues["role"] = role;
    formValues["gender"] = gender;
    formValues["guarantorGender"] = guarantorGender;
    formValues["maritalStatus"] = maritalStatus;
    formValues["highestLevelOfEducationAttained"] =
      highestLevelOfEducationAttained;
    formValues["nextOfKinRelationship"] = nextOfKinRelationship;
    formValues["guarantorRelationship"] = guarantorRelationship;
    formValues["userType"] = userType;

    if (!formValues["staffNumber"]) {
      formValues["staffNumber"] =
        "BR" + "-" + Math.floor(Math.random() * 1000000) + "-" + "AG";
    }

    if (formValues) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/users/${params.id}`, formValues);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_USER,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `${response.data.data.data.staffNumber}-${response.data.data.data.name} User is updated successfully!!!`
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

  const dateOfBirth = params.dateOfBirth
    ? new Date(params.dateOfBirth).toISOString().slice(0, 10)
    : "";

  return (
    <div className={classes.root}>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          <Typography
            variant="subtitle1"
            style={{ fontSize: "1.0em", marginTop: 20 }}
          >
            Update User
          </Typography>
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="staffEditForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          //height: 420,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 20 }}
      >
        <Field
          label=""
          id="email"
          name="email"
          defaultValue={params.email}
          type="email"
          component={renderEmailField}
        />

        <Grid container direction="row">
          <Grid item style={{ width: "50%", marginTop: 10 }}>
            <Field
              label=""
              id="name"
              name="name"
              defaultValue={params.name}
              type="text"
              component={renderNameField}
            />
          </Grid>
          <Grid item style={{ width: "48%", marginLeft: 10, marginTop: 10 }}>
            <Field
              label=""
              id="role"
              name="role"
              type="text"
              component={renderUserRoleField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="serviceOutlet"
          name="serviceOutlet"
          type="text"
          component={renderServiceOutletField}
        />
        <Grid container style={{ marginTop: 20 }}>
          <FormLabel style={{ color: "blue" }} component="legend">
            Enter Staff Details
          </FormLabel>
        </Grid>
        <Grid container direction="row">
          <Grid item style={{ width: "49%", marginTop: 10 }}>
            <Field
              label=""
              id="staffNumber"
              name="staffNumber"
              defaultValue={params.staffNumber}
              type="text"
              component={renderStaffNumberField}
            />
          </Grid>
          <Grid item style={{ width: "48%", marginTop: 10, marginLeft: 10 }}>
            <Field
              label=""
              id="dateOfBirth"
              name="dateOfBirth"
              defaultValue={dateOfBirth}
              type="date"
              component={renderDateOfBirthField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item style={{ width: "49%", marginTop: 10 }}>
            <Field
              label=""
              id="gender"
              name="gender"
              type="text"
              component={renderGenderField}
            />
          </Grid>
          <Grid item style={{ width: "48%", marginTop: 10, marginLeft: 10 }}>
            <Field
              label=""
              id="maritalStatus"
              name="maritalStatus"
              type="text"
              component={renderMaritalStatusField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item style={{ width: "49%", marginTop: 10 }}>
            <Field
              label=""
              id="highestLevelOfEducationAttained"
              name="highestLevelOfEducationAttained"
              type="text"
              component={renderHighestLevelOfEducationAttainedField}
            />
          </Grid>
          <Grid item style={{ width: "48%", marginTop: 10, marginLeft: 10 }}>
            <Field
              label=""
              id="courseOfStudy"
              name="courseOfStudy"
              defaultValue={params.courseOfStudy}
              type="text"
              component={renderCourseOfStudyField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="phoneNumbers"
          name="phoneNumbers"
          defaultValue={params.phoneNumbers}
          type="text"
          component={renderPhoneNumbersField}
        />
        <Field
          label=""
          id="references"
          name="references"
          defaultValue={params.references}
          type="text"
          component={renderReferencesField}
        />
        <Field
          label=""
          id="houseAddress"
          name="houseAddress"
          defaultValue={params.houseAddress}
          type="text"
          component={renderHomeAddressField}
        />
        <Grid container style={{ marginTop: 20 }}>
          <FormLabel style={{ color: "blue" }} component="legend">
            Enter Next of Kin Details
          </FormLabel>
        </Grid>
        <Grid container direction="row">
          <Grid item style={{ width: "49%", marginTop: 10 }}>
            <Field
              label=""
              id="nextOfKinName"
              name="nextOfKinName"
              defaultValue={params.nextOfKinName}
              type="text"
              component={renderNextOfKinNameField}
            />
          </Grid>
          <Grid item style={{ width: "48%", marginTop: 10, marginLeft: 10 }}>
            <Field
              label=""
              id="nextOfKinRelationship"
              name="nextOfKinRelationship"
              type="text"
              component={renderNextOfKinRelationshipField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="nextOfKinPhoneNumbers"
          name="nextOfKinPhoneNumbers"
          defaultValue={params.nextOfKinPhoneNumbers}
          type="text"
          component={renderNextOfKinPhoneNumbersField}
        />
        <Field
          label=""
          id="nextOfKinAddress"
          name="nextOfKinAddress"
          defaultValue={params.nextOfKinAddress}
          type="text"
          component={renderNextOfKinAddressField}
        />
        <Grid container style={{ marginTop: 20 }}>
          <FormLabel style={{ color: "blue" }} component="legend">
            Enter Guarantor Details
          </FormLabel>
        </Grid>
        <Field
          label=""
          id="guarantorName"
          name="guarantorName"
          defaultValue={params.guarantorName}
          type="text"
          component={renderGuarantorNameField}
        />
        <Grid container direction="row">
          <Grid item style={{ width: "49%", marginTop: 10 }}>
            <Field
              label=""
              id="guarantorRelationship"
              name="guarantorRelationship"
              type="text"
              component={renderGuarantorRelationshipField}
            />
          </Grid>
          <Grid item style={{ width: "48%", marginTop: 10, marginLeft: 10 }}>
            <Field
              label=""
              id="guarantorGender"
              name="guarantorGender"
              type="text"
              component={renderGuarantorgenderField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="guarantorPhoneNumbers"
          name="guarantorPhoneNumbers"
          defaultValue={params.guarantorPhoneNumbers}
          type="text"
          component={renderGuarantorPhoneNumbersField}
        />
        <Field
          label=""
          id="guarantorAddress"
          name="guarantorAddress"
          defaultValue={params.guarantorAddress}
          type="text"
          component={renderGuarantorAddressField}
        />

        <Grid container style={{ marginTop: 20 }}>
          <FormLabel style={{ color: "blue" }} component="legend">
            Enter a Memo
          </FormLabel>
        </Grid>
        <Field
          label=""
          id="memo"
          name="memo"
          defaultValue={params.memo}
          type="text"
          component={renderMemoField}
        />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {/* Update Vendor */}
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
  form: "staffEditForm",
})(StaffEditForm);
