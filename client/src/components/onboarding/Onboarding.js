import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { onboardingAPI } from "../../services/api";
import { Button } from "../common/ui/button";
import Toggle from "../common/inputs/Toggle";
import TextInput from "../common/inputs/TextInput";
import { ROUTES } from "../../lib/constants";
import { useAuth } from "../../contexts/AuthContext";

const Onboarding = () => {
  const history = useHistory();
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await onboardingAPI.getSteps();
        setSteps(response.data.steps);
        setLoading(false);
      } catch (err) {
        setError("Failed to load onboarding steps");
        setLoading(false);
      }
    };
    fetchSteps();
  }, []);

  const handleInputChange = (event, type = "text") => {
    const { name, value } = event.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: event.target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep];
    return currentFields.every((field) => {
      if (field.required && (field.type === "text" || field.type === "multiline-text")) {
        return formData[field.name]?.trim();
      }
      return true;
    });
  };
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Save to localStorage and redirect
      localStorage.setItem("onboardingData", JSON.stringify(formData));
      setUser({ ...user, completedOnboarding: true });
      history.push(ROUTES.HOMEPAGE);
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  if (loading)
    return <div className="flex justify-center items-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  const currentFields = steps[currentStep] || [];
  const isLastStep = currentStep === steps.length - 1;
  return (
    <div className="max-w-xl mx-auto p-8 bg-[#F7F9FD] mt-6">
      <div className="space-y-6">
        {currentFields.map((field) => (
          <div key={field.name} className="space-y-2">
            {field.type === "yes-no" ? (
              <Toggle
                label={field.label}
                name={field.name}
                required={field.required}
                onChange={handleInputChange}
                onboardingData={formData}
              />
            ) : (
              <TextInput
                label={field.label}
                name={field.name}
                required={field.required}
                textarea={field.type === "multiline-text"}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        {currentStep > 0 && <Button onClick={handleBack}>Back</Button>}
        <Button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="ml-auto"
        >
          {isLastStep ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};
export default Onboarding;
