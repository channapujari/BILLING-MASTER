import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

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
import loginSchema from "./loginSchema";
import {
  startLoginUser,
  toggleStatue,
} from "../../../redux/actions/userActions";

const LoginInitialValues = {
  email: "",
  password: "",
};

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRedirect = () => {
    dispatch(toggleStatue());
    props.history.push("/dashboard");
    swal("Good job!", "Loggedin Successfully!", "success");
  };

  const handleSubmit = (values, formikProps) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    //console.log(formData);
    dispatch(startLoginUser(formData, handleRedirect));
    formikProps.resetForm();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={LoginInitialValues}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <div className={classes.linkDiv}>
                <Link style={{ textDecoration: "none" }} to="/register">
                  <Typography color="primary" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
