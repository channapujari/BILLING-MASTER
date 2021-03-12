import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import BillingImage from "../components/images/billing.svg";

function Home(props) {
  return (
    <>
      <Paper style={{ width: "90%", margin: "2vh auto" }}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item style={{ width: "100%" }}>
            <Typography variant="h2" align="center">
              BILLING MASTER
            </Typography>
          </Grid>

          <Grid item style={{ width: "100%" }}>
            <img src={BillingImage} style={{ width: "100%" }} alt="billing" />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Home;
