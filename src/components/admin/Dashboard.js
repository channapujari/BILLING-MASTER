import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { startGetAllBills } from "../../redux/actions/billActions";
import { startGetCustomers } from "../../redux/actions/customerActions";
import { startGetProducts } from "../../redux/actions/productsActions";
import { Paper } from "@material-ui/core";



const Dashboard = (props) => {
  
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const allBills = useSelector((state) => state.allBills);

  let TotalAmount = 0;

  allBills.forEach((bill) => (TotalAmount += bill.total));

  const lastFiveProducts = _.takeRight(products, 5);
  const lastFiveCustomers = _.takeRight(customers, 5);
  const lastFiveBills = _.takeRight(allBills, 5);

  const customerName = (id) => {
    const customer = customers.find((cust) => cust._id === id);
    return customer?.name;
  };

  const productName = (id) => {
    const product = products.find((prod) => prod._id === id);
    return product?.name;
  };
  useEffect(() => {
    dispatch(startGetCustomers());
    dispatch(startGetAllBills());
    dispatch(startGetProducts());
  }, [dispatch]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography align="center" variant="h2">
                {customers.length}
              </Typography>
              <Typography align="center" variant="h6">
                Total Customers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography align="center" variant="h2">
                {products.length}
              </Typography>
              <Typography align="center" variant="h6">
                Total Products
              </Typography>{" "}
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography align="center" variant="h2">
                {allBills.length}
              </Typography>
              <Typography align="center" variant="h6">
                Total Bills
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography align="center" variant="h2">
                {TotalAmount}
              </Typography>
              <Typography align="center" variant="h6">
                Total Sales
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6}>
          <Paper elevation={2}>
            <Typography align="center" variant="subtitle1">
              RECENT 5 CUSTOMERS
            </Typography>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">E-mail</TableCell>
                    <TableCell align="center">Mobile</TableCell>
                  </TableRow>
                </TableHead>
                {lastFiveCustomers.length ? (
                  <TableBody>
                    {lastFiveCustomers.map((customer, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={customer._id}
                        >
                          <TableCell align="center">{customer.name}</TableCell>
                          <TableCell align="center">{customer.email}</TableCell>
                          <TableCell align="center">
                            {customer.mobile}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan="6">
                        <Typography
                          align="center"
                          style={{ margin: "2vh auto" }}
                        >
                          NO DATA TO DISPLAY
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item sm={6}>
          <Paper elevation={2}>
            <Typography align="center" variant="subtitle1">
              RECENT 5 PRODUCTS
            </Typography>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                {lastFiveProducts.length ? (
                  <TableBody>
                    {lastFiveProducts.map((product, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={product._id}
                        >
                          <TableCell align="center">{product.name}</TableCell>
                          <TableCell align="center">{product.price}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan="6">
                        <Typography
                          align="center"
                          style={{ margin: "2vh auto" }}
                        >
                          NO DATA TO DISPLAY
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item sm={12}>
          <Paper elevation={2}>
            <Typography align="center" variant="subtitle1">
              RECENT 5 BILLS
            </Typography>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Customer</TableCell>
                    <TableCell align="center">Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">SubTotal</TableCell>
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                {lastFiveBills.length ? (
                  <TableBody>
                    {lastFiveBills.map((bill, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={bill._id}
                        >
                          <TableCell align="center">
                            {customerName(bill.customer)}
                          </TableCell>
                          <TableCell align="center">
                            {productName(bill.lineItems[0].product)}
                          </TableCell>
                          <TableCell align="center">
                            {bill.lineItems[0].quantity}
                          </TableCell>
                          <TableCell align="center">
                            {bill.lineItems[0].price}
                          </TableCell>
                          <TableCell align="center">
                            {bill.lineItems[0].subTotal}
                          </TableCell>
                          <TableCell align="center">{bill.total}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan="6">
                        <Typography
                          align="center"
                          style={{ margin: "2vh auto" }}
                        >
                          NO DATA TO DISPLAY
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
