import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "./common/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "../lib/constants";

const Home = () => {
  const history = useHistory();
  const [onboardingData, setOnboardingData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const data = localStorage.getItem("onboardingData");
    if (data) {
      setOnboardingData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      setIsLoggedIn(true);
    } else {
      // If we were previously logged in, redirect to login instead of register
      if (isLoggedIn) history.push(ROUTES.LOGIN);
      else history.push(ROUTES.REGISTER);
    }
  }, [user, history, isLoggedIn]);

  const handleLogout = async () => {
    if (user && user.id) {
      await logout(user.id);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {onboardingData && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          {Object.entries(onboardingData).map(([key, value]) => (
            <div key={key} className="flex border-b pb-2">
              <span className="font-medium w-1/3 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </span>
              <span className="w-2/3">
                {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
