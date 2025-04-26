import { useState} from "react";
import { useNavigate} from "react-router-dom";
import SignUpOnBoardingScreen from "../OnBoardingScreen/SignUpOnBoardingScreen";
import AuthLayout from "@/Layout/Auth/AuthLayout";

export default function AuthWrapper() {
  const [showOnBoarding, setShowOnBoarding] = useState<boolean>(false);
  const navigate = useNavigate();


  

  function triggerOnBoardingScreen() {
    console.log('Showing onboarding screen...');
    setShowOnBoarding(true);
    setTimeout(() => {
      console.log('Hiding onboarding screen and navigating to /...');
      setShowOnBoarding(false);
      navigate("/dashboard", { replace: true });
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