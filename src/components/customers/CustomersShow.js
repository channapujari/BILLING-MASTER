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
  startRemoveCustomer,
  startGetCustomers,
} from "../../redux/actions/customerActions";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "name", label: "Name", minWidth: 220 },
  { id: "email", label: "Email", minWidth: 220 },
  { id: "mobile", label: "Mobile", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170 },
];

const CustomersShow = (props) => {
  const classes = useStyles();
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(startGetCustomers());
  }, [dispatch]);

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
        dispatch(startRemoveCustomer(id));
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
          Customers - {customers.length}
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
            {customers.length ? (
              <TableBody>
                {customers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={customer._id}
                      >
                        <TableCell align="center">{customer.name}</TableCell>
                        <TableCell align="center">{customer.email}</TableCell>
                        <TableCell align="center">{customer.mobile}</TableCell>
                        <TableCell align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              props.history.push(
                                `/customers/edit/${customer._id}`
                              );
                            }}
                          >
                            edit
                          </Button>
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => {
                              return handleRemove(customer._id);
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
        <Button
          onClick={() => {
            props.history.push(`/customers/new`);
          }}
          style={{ margin: "2vh" }}
          color="primary"
          variant="contained"
        >
          ADD CUSTOMER
        </Button>
      </Paper>
    </>
  );
};

export default CustomersShow;
