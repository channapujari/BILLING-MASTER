import React from "react";
import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const ShowInvoice = (props) => {
  const currentBill = useSelector((state) => state.currentBill);
  const products = useSelector((state) => state.products);

  const productName = () => {
    const arr = products.filter(
      (product) => product._id === currentBill[0]?.lineItems[0]?.product
    );
    //console.log(arr)
    return arr[0]?.name;
  };

  return (
    <div>
      <Typography style={{ marginTop: "15px" }} variant="h5">
        INVOICE
      </Typography>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">SubTotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{productName()}</TableCell>
              <TableCell align="center">
                {currentBill[0]?.lineItems[0]?.quantity}
              </TableCell>
              <TableCell align="center">
                {currentBill[0]?.lineItems[0]?.price}
              </TableCell>
              <TableCell align="center">
                {currentBill[0]?.lineItems[0]?.subTotal}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6">TOTAL = {currentBill[0]?.total}</Typography>
    </div>
  );
};

export default ShowInvoice;
