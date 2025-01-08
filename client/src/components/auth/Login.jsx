import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import TextInput from "../common/inputs/TextInput";
import { Button } from "../common/ui/button";
import { ROUTES } from "../../lib/constants";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formData);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-[#F7F9FD] mt-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
        <p className="text-gray-600">
          Need to register?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="text-primary hover:text-primary/90 font-semibold"
          >
            Create an account
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          aria-label="username"
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextInput
          aria-label="password"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
