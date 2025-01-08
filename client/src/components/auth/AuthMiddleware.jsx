import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useHistory } from "react-router-dom";
import { ROUTES } from "../../lib/constants";
import SnackbarError from "../layout/SnackbarError";

export const AuthMiddleware = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Skip middleware check for public routes
    const publicRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];
    if (publicRoutes.includes(location.pathname)) {
      return;
    }

    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      history.replace({
        pathname: ROUTES.LOGIN,
        state: { from: location.pathname },
      });
    }

    // Redirect to onboarding if needed
    if (
      isAuthenticated &&
      !user?.completedOnboarding &&
      location.pathname !== ROUTES.ONBOARDING
    ) {
      history.replace(ROUTES.ONBOARDING);
    }
  }, [user, isAuthenticated, isLoading, location, history]);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  return children;
};
