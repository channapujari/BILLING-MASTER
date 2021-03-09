import React from "react";
import { useDispatch } from "react-redux";

import { startAddProducts } from "../../redux/actions/productsActions";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string("Name must be a String").required("Name is Required"),
  price: Yup.string("Enter valid price")
    .matches(/^[0-9\s]+$/, "Price must be number")
    .required("Price is Required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    marginTop: theme.spacing(2),
  },
  top: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

const initialValues = {
  name: "",
  price: "",
};

const ProductForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const formData = {
      name: values.name,
      price: values.price,
    };
    const handleRedirect = () => props.history.push("/products");
    dispatch(startAddProducts(formData, handleRedirect));
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Container maxWidth="sm" className={classes.container}>
          <Typography
            style={{ textAlign: "center", marginTop: "5vh" }}
            variant="h6"
            gutterBottom
          >
            ADD NEW PRODUCT
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={schema}
          >
            {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      id="name"
                      name="name"
                      label="Name"
                      fullWidth
                      helperText={<ErrorMessage name="name"></ErrorMessage>}
                      error={touched.name && Boolean(errors.name)}
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      id="price"
                      name="price"
                      label="Price"
                      fullWidth
                      helperText={<ErrorMessage name="price"></ErrorMessage>}
                      error={touched.price && Boolean(errors.price)}
                      as={TextField}
                    />
                  </Grid>
                  <Grid className={classes.button} item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      ADD PRODUCT
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </>
  );
};

export default ProductForm;
