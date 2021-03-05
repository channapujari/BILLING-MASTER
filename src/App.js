import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Login from "./components/authentication/Login/Login";
import Register from "./components/authentication/Register/Register";
import Header from "./layout/Header";
import Profile from "./components/admin/Profile";
import Dashboard from "./components/admin/Dashboard";
import PrivateRoute from "./config/PrivateRoute";
import CustomerForm from "./components/customers/CustomerForm";
import CustomersShow from "./components/customers/CustomersShow";
import CustomerEdit from "./components/customers/CustomerEdit";
import { toggleStatus } from "./redux/actions/userActions";

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(toggleStatus());
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <Switch>
          <Route path="/register" component={Register} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <PrivateRoute path="/profile" component={Profile} exact={true} />
          <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
          <PrivateRoute
            path="/customers"
            component={CustomersShow}
            exact={true}
          />
          <PrivateRoute
            path="/customers/new"
            component={CustomerForm}
            exact={true}
          />
          <PrivateRoute
            path="/customers/edit/:id"
            component={CustomerEdit}
            exact={true}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
