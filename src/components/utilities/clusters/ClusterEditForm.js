import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 170,
    marginLeft: 150,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function ClusterEditForm(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  const [type, setType] = useState();

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const params = props.params;

  const renderClusterNameField = ({
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
        helperText="Enter Cluster Name"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.name}
        fullWidth
        required
        type={type}
        {...custom}
        //onChange={handleInput}
        // style={{ marginTop: 10 }}
      />
    );
  };

  const renderClusterTypeField = ({
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
            labelId="type"
            id="type"
            value={params.type}
            onChange={handleTypeChange}
            label="Country"
            style={{ width: 500 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"city"}>City</MenuItem>
            <MenuItem value={"state"}>State</MenuItem>
            <MenuItem value={"country"}>Country</MenuItem>
          </Select>
          <FormHelperText>Select Location Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderClusterDescriptionField = ({
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
        helperText="Provide a description of this cluster"
        variant="outlined"
        //label={label}
        id={input.name}
        value={params.description}
        fullWidth
        //required
        type={type}
        {...custom}
        multiline={true}
        minRows={7}

        // style={{ marginTop: 10 }}

        //onChange={handleInput}
      />
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  const required = (value) => (value == null ? "Required" : undefined);
  const email = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "Invalid email"
      : undefined;

  return (
    <>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Location Cluster Details
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="clusterForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "100%" }}>
            <Field
              label=""
              id="name"
              name="name"
              type="text"
              component={renderClusterNameField}
              //validate={required}

              //onChange={(e) => setValue(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item>
            <Field
              label=""
              id="type"
              name="type"
              type="text"
              component={renderClusterTypeField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="description"
          name="description"
          type="text"
          component={renderClusterDescriptionField}
          style={{ marginTop: 10 }}
        />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          Update Cluster
        </Button>
      </Box>
      {/* </form> */}
    </>
  );
}

export default reduxForm({
  form: "clusterForm",
})(ClusterEditForm);
