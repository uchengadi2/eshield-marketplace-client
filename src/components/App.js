import React, { useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import history from "./../history";
import theme from "./ui/Theme";
import Dashboard from "./Dashboard/Dashboard";
import Preferences from "./Preferences/Preferences";
import useToken from "../custom-hooks/useToken";
import useUserId from "../custom-hooks/useUserId";
import UserLogin from "./users/UserLogin";
import Snackbar from "@material-ui/core/Snackbar";
import Header from "./ui/Header";
import IndexDashboard from "./IndexDashboard";
import CategoryLayout from "./ui/CategoryLayout";
import VendorLayout from "./ui/VendorLayout";
import ProductLayout from "./ui/ProductLayout";
import CityLayout from "./ui/CityLayout";
import UsersLayout from "./ui/UsersLayout";
import OrdersLayout from "./ui/OrdersLayout";
import PaymentLayout from "./ui/PaymentLayout";
import RemittanceLayout from "./ui/RemittanceLayout";
import PoliciesLayout from "./ui/PoliciesLayout";
import UtilitiesLayout from "./ui/UtilitiesLayout";
import TripsLayout from "./ui/TripLayout";
import DeliveryLayout from "./ui/DeliveryLayout";
import ReportsLayout from "./ui/ReportsLayout";
import LoginForm from "./authForms/LoginForm";

function App() {
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  const handleLogoutProcess = () => {
    setToken({});
    sessionStorage.removeItem("token");
  };

  const handleSuccessfulLoginInSnackbar = (message) => {
    // setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedLoginInSnackbar = (message) => {
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    //setBecomePartnerOpen(true);
  };

  if (!token) {
    return (
      <LoginForm
        setToken={setToken}
        setUserId={setUserId}
        handleSuccessfulLoginInSnackbar={handleSuccessfulLoginInSnackbar}
        handleFailedLoginInSnackbar={handleFailedLoginInSnackbar}
      />
    );
  }

  return (
    <div className="wrapper">
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Header
            value={value}
            setValue={setValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            token={token}
            userId={userId}
            // setToken={setToken}
            // setUserId={setUserId}
            setToken={setToken ? setToken : null}
            setUserId={setUserId ? setUserId : null}
            handleLogoutProcess={handleLogoutProcess}
          />
          ;
          <Switch>
            <Route exact path="/">
              <CategoryLayout token={token} userId={userId} />
            </Route>
            <Route path="/categories">
              <CategoryLayout token={token} userId={userId} />
            </Route>
            <Route path="/partners">
              <VendorLayout token={token} userId={userId} />
            </Route>
            <Route path="/products">
              <ProductLayout token={token} userId={userId} />
            </Route>
            {/* <Route path="/cities">
              <CityLayout token={token} userId={userId} />
            </Route> */}
            <Route path="/users">
              <UsersLayout token={token} userId={userId} />
            </Route>
            <Route path="/orders">
              <OrdersLayout token={token} userId={userId} />
            </Route>
            <Route path="/deliveries">
              <DeliveryLayout token={token} userId={userId} />
            </Route>
            <Route path="/payments">
              <PaymentLayout token={token} userId={userId} />
            </Route>
            <Route path="/remittances">
              <RemittanceLayout token={token} userId={userId} />
            </Route>
            <Route path="/utilities">
              <UtilitiesLayout token={token} userId={userId} />
            </Route>
            <Route path="/policies">
              <PoliciesLayout token={token} userId={userId} />
            </Route>
            <Route path="/reports">
              <ReportsLayout token={token} userId={userId} />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route>
          </Switch>
          <Snackbar
            open={alert.open}
            message={alert.message}
            ContentProps={{
              style: { backgroundColor: alert.backgroundColor },
            }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setAlert({ ...alert, open: false })}
            autoHideDuration={4000}
          />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
