import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";

import useStyles from "./useStyles";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import { toggleStatus } from "../redux/actions/userActions";

const Header = (props) => {
  const classes = useStyles();
  const isUserLoggedIn = useSelector((state) => state.userLoggedInstatus);
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(toggleStatus());
    swal("Successfully LoggedOut!");
    props.history.push("/");
  };

  return (
    <div>
      <AppBar position="fixed" color="default">
        <Toolbar>
            <Typography className={classes.grow} variant="h6" noWrap>
              {"BILLING MASTER"}
            </Typography>
          <Button className={classes.btn} component={Link} to="/">
            Home
          </Button>
          {isUserLoggedIn ? (
            <>
              <Button className={classes.btn} component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button className={classes.btn} component={Link} to="/customers">
                Customers
              </Button>
              <Button className={classes.btn} component={Link} to="/products">
                Products
              </Button>
              <Button className={classes.btn} component={Link} to="/profile">
                Profile
              </Button>
              <Button
                className={classes.btn}
                component={Link}
                to="/"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className={classes.btn} component={Link} to="/register">
                Register
              </Button>
              <Button className={classes.btn} component={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
