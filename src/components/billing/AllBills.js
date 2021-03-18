import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, Typography } from "@material-ui/core";

import {
    startGetAllBills,
    startDeleteBill,
} from "../../redux/actions/billActions";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "customer", label:"Customer", minWidth: 50},
  { id: "product", label: "Product", minWidth: 50 },
  { id: "quantity", label: "Quantity", minWidth: 10 },
  { id: "price", label: "Price", minWidth: 50 },
  { id: "subTotal", label: "SubTotal", minWidth: 50 },
  {id: "total", label: "Total",minWidth: 50},
  {id:"actions",label:"Action",minWidth:50}
];

const AllBills = (props) => {
  const classes = useStyles();
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const allBills = useSelector((state)=> state.allBills);

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(startGetAllBills());
  }, [dispatch]);


  const customerName = (id) =>{
      const customer = customers.find((cust) => cust._id === id)
      return customer?.name;
  }

  const productName = (id) =>{
      const product = products.find((prod)=> prod._id === id)
      return product?.name;
  }

  const handleRemove = (id) => {
    swal({
      title: "Confirm Deletion",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Successfully Deleted", {
          icon: "success",
        });
        dispatch(startDeleteBill(id));
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper
        style={{ maxWidth: "80vw", margin: "5vh auto" }}
        className={classes.root}
      >
        <Typography style={{ margin: "2vh" }} variant="h5" align="center">
          ALL BILL - {allBills.length}
        </Typography>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {allBills.length ? (
              <TableBody>
                {allBills
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((bill, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={bill._id}
                      >
                        <TableCell align="center">{customerName(bill.customer)}</TableCell>
                        <TableCell align="center">{productName(bill.lineItems[0].product)}</TableCell>
                        <TableCell align="center">{bill.lineItems[0].quantity}</TableCell>
                        <TableCell align="center">{bill.lineItems[0].price}</TableCell>
                        <TableCell align="center">{bill.lineItems[0].subTotal}</TableCell>
                        <TableCell align="center">{bill?.total}</TableCell>
                        <TableCell align="center">
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => {
                              return handleRemove(bill._id);
                            }}
                          >
                            remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan="6">
                    <Typography align="center" style={{ margin: "2vh auto" }}>
                      NO DATA TO DISPLAY
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default AllBills;

