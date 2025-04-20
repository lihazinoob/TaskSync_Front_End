import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpOnBoardingScreen from "../OnBoardingScreen/SignUpOnBoardingScreen";
import AuthLayout from "@/Layout/Auth/AuthLayout";
export default function AuthWrapper() {
  // State for showing the OnBoardingScreen
  const [showOnBoarding, setShowOnBoarding] = useState<boolean>(false);

  const navigate = useNavigate();

  function triggerOnBoardingScreen() {
    setShowOnBoarding(true);
    setTimeout(() => {
      setShowOnBoarding(false);
      navigate("/");
    }, 5000);
  }
  return (
    <>
      {showOnBoarding ? (
        <SignUpOnBoardingScreen />
      ) : (
        <AuthLayout triggerOnBoarding={triggerOnBoardingScreen} />
      )}
    </>
  );
}
