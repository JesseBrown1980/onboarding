import React, { createContext, useContext, useState, useCallback } from "react";
import { authAPI } from "../services/api";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../lib/constants";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleAuthError = useCallback((error) => {
    setError(error);
    setIsLoading(false);
    setUser(null);
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const { data } = await authAPI.login(credentials);
      await localStorage.setItem("messenger-token", data.token);
      setUser(data);
      history.push(ROUTES.HOMEPAGE);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials) => {
    try {
      const { data } = await authAPI.register(credentials);
      await localStorage.setItem("messenger-token", data.token);
      setUser(data);
      history.push(ROUTES.ONBOARDING);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      await localStorage.removeItem("messenger-token");
      setUser({});
      history.push(ROUTES.LOGIN);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        error,
        clearError,
        isLoading,
        isAuthenticated: !!user?.id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
