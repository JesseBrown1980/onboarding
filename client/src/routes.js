import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Onboarding from "./components/onboarding/Onboarding";
import SnackbarError from "./components/layout/SnackbarError";
import { ROUTES } from "./lib/constants";

const Routes = () => {
  const { error, clearError } = useAuth();

  return (
    <>
      {error && <SnackbarError errorMessage={error} onClose={clearError} />}
      <Switch>
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.REGISTER} component={Signup} />
        <Route path={ROUTES.ONBOARDING} component={Onboarding} />
        <Route path={ROUTES.HOMEPAGE} component={Home} />
        <Route exact path={ROUTES.HOME}>
          <Redirect to={ROUTES.LOGIN} />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
