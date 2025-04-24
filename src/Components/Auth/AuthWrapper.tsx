import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignUpOnBoardingScreen from "../OnBoardingScreen/SignUpOnBoardingScreen";
import AuthLayout from "@/Layout/Auth/AuthLayout";

export default function AuthWrapper() {
  const [showOnBoarding, setShowOnBoarding] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('AuthWrapper - Route Changed:', location.pathname);
    console.log('AuthWrapper - Location Search:', location.search);
    const params = new URLSearchParams(location.search);
    const shouldTriggerOnboarding = params.get('onboarding') === 'true';

    if (shouldTriggerOnboarding && !showOnBoarding) {
      console.log('Triggering onboarding screen...');
      triggerOnBoardingScreen();
      // Clear the query parameter to prevent re-triggering
      navigate(location.pathname, { replace: true });
    }
  }, [location, showOnBoarding, navigate]);

  function triggerOnBoardingScreen() {
    console.log('Showing onboarding screen...');
    setShowOnBoarding(true);
    setTimeout(() => {
      console.log('Hiding onboarding screen and navigating to /...');
      setShowOnBoarding(false);
      navigate("/", { replace: true });
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