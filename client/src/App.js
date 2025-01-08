import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./routes";
import { AuthMiddleware } from "./components/auth/AuthMiddleware";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthMiddleware>
          <Routes />
        </AuthMiddleware>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
