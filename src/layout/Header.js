import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import useStyles from "./useStyles";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const Header = () => {
  const classes = useStyles();
  const isUserLoggedIn = useSelector((state) => state.userLoggedInstatus);

  return (
    <div>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Link to="/" className={classes.link}>
            <Typography className={classes.title} variant="h6" noWrap>
              {"BILLING MASTER"}
            </Typography>
          </Link>
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
              <Button className={classes.btn} component={Link} to="/profile">
                Profile
              </Button>
              <Button className={classes.btn} component={Link} to="/">
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
