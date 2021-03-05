import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import swal from "sweetalert";
import { useDispatch } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import useStyles from "./useStyles";
import resisterSchema from "./resiterSchema";
import { startRegisterUser } from "../../../redux/actions/userActions";

const registerInitialValues = {
  username: "",
  email: "",
  password: "",
  businessName: "",
  address: "",
};

const Register = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleRedirect = () => {
    props.history.push("/login");
    swal("Good job!", "Registered Successfully!", "success");
  };

  const handleSubmit = (values, formikProps) => {
    const formData = {
      username: values.username,
      email: values.email,
      password: values.password,
      businessName: values.businessName,
      address: values.address,
    };
    //console.log(formData)
    dispatch(startRegisterUser(formData, handleRedirect));
    formikProps.resetForm();
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Formik
            initialValues={registerInitialValues}
            onSubmit={handleSubmit}
            validationSchema={resisterSchema}
          >
            {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      name="username"
                      label="Username"
                      type="username"
                      id="username"
                      helperText={<ErrorMessage name="username"></ErrorMessage>}
                      error={touched.username && Boolean(errors.username)}
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      helperText={<ErrorMessage name="email"></ErrorMessage>}
                      error={touched.email && Boolean(errors.email)}
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        ),
                      }}
                      helperText={<ErrorMessage name="password"></ErrorMessage>}
                      error={touched.password && Boolean(errors.password)}
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      id="businessName"
                      label="Business Name"
                      name="businessName"
                      helperText={
                        <ErrorMessage name="businessName"></ErrorMessage>
                      }
                      error={
                        touched.businessName && Boolean(errors.businessName)
                      }
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      multiline
                      rows={3}
                      id="outlined-multiline-static"
                      label="Address"
                      name="address"
                      helperText={<ErrorMessage name="address"></ErrorMessage>}
                      error={touched.address && Boolean(errors.address)}
                      as={TextField}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link style={{ textDecoration: "none" }} to="/login">
                      <Typography color="primary" variant="body2">
                        {"Already have an account? Sign in"}
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default Register;
