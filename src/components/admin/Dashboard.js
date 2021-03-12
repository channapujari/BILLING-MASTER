import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    //backgroundColor: theme.palette.grey[200],
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h3">1</Typography>
              <Typography variant="subtitle1">Total Customers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h4">Total Products</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h4">Total Bills</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h4">Total Sales</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
