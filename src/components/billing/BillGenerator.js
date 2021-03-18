import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { startGenerateBill } from "../../redux/actions/billActions";
import ShowInvoice from "./ShowInvoice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: "20px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const BillGenerator = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);

  //Getting today's date
  const day = new Date();
  const dd = String(day.getDate()).padStart(2, "0");
  const mm = String(day.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = day.getFullYear();
  const today = `${yyyy}-${mm}-${dd}`;

  const [selectedDate, setSelectedDate] = useState(today);
  const [customerID, setCustomerID] = useState("");
  const [productID, setProductID] = useState("");
  const [qty, setQty] = useState(1);
  const [showBill, setShowBill] = useState(false);

  const handleChangeDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleProductID = (e) => {
    setProductID(e.target.value);
  };

  const handleCustomerID = (e) => {
    setCustomerID(e.target.value);
  };

  const handleBillGenerate = () => {
    if (
      selectedDate.length > 0 &&
      customerID.length > 0 &&
      productID.length > 0
    ) {
      const billData = {
        date: selectedDate,
        customer: customerID,
        lineItems: [{ product: productID, quantity: qty }],
      };
      console.log(billData);
      dispatch(startGenerateBill(billData));
      setShowBill(true);
      swal("Your Bill has been generated","success");
    } else {
      swal("Ohh..", "You are missing some fields", "error");
    }
  };
  return (
    <div>
      <Container>
        <Typography variant="h4" align="center">
          BILL GENERATOR
        </Typography>
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <form className={classes.container} noValidate>
              <TextField
                id="date"
                label="Select a Date"
                type="date"
                required
                value={selectedDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChangeDate}
              />
            </form>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Customer
              </InputLabel>
              <Select
                native
                value={customerID}
                onChange={handleCustomerID}
                label="Customer"
                required
                inputProps={{
                  name: "customer",
                  id: "outlined-customer-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {customers.map((customer) => {
                  return (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <Typography style={{ marginTop: "20px" }} variant="h5">
              Line Items
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Product
              </InputLabel>
              <Select
                native
                value={productID}
                required
                onChange={handleProductID}
                label="Product"
                inputProps={{
                  name: "product",
                  id: "outlined-product-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {products.map((product) => {
                  return (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              style={{ marginTop: "30px" }}
              variant="contained"
              onClick={() => {
                setQty(qty === 1 ? 1 : qty - 1);
              }}
            >
              {" "}
              -{" "}
            </Button>
            <Typography
              style={{
                display: "inline",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              {qty}
            </Typography>
            <Button
              style={{ marginTop: "30px" }}
              variant="contained"
              onClick={() => {
                setQty(qty + 1);
              }}
            >
              {" "}
              +{" "}
            </Button>
            <Button
              style={{ marginTop: "30px", marginLeft: "10px" }}
              variant="contained"
              color="primary"
              onClick={handleBillGenerate}
            >
              {" "}
              GENERATE BILL{" "}
            </Button>
          </Grid>
          <Grid item sm={6}>
            {
              showBill && <ShowInvoice />
            }
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BillGenerator;
