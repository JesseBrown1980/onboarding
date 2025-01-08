import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import TextInput from "../common/inputs/TextInput";
import { Button } from "../common/ui/button";
import { ROUTES } from "../../lib/constants";

const Signup = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-[#F7F9FD] mt-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Create an account</h1>
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="text-primary hover:text-primary/90 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          required
        />
        <TextInput
          label="E-mail address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <TextInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        <TextInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
        <Button type="submit" className="w-full">
          Create
        </Button>
      </form>
    </div>
  );
};

export default Signup;
