import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ROUTES } from '../../../utils/constants';

export const useRequireAuth = (redirectUrl = ROUTES.LOGIN) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      history.replace({
        pathname: redirectUrl,
        state: { from: location.pathname }
      });
    }
  }, [user, isAuthenticated, isLoading, history, location, redirectUrl]);

  return { user, isAuthenticated, isLoading };
};