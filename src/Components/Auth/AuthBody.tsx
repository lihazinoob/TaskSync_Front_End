import CompanyLogo from "../../assets/CompanyLogo.svg";
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { AuthLayoutProps } from "@/Layout/Auth/AuthLayout";
export default function AuthBody({triggerOnBoarding}:AuthLayoutProps) {
  // State to track which button is active
  const [activeTab, setActiveTab] = useState<"signup" | "signin">("signup");

  return (
    <>
      
      <div className="w-full max-w-md px-8 py-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4 gap-2">
          <img src={CompanyLogo} alt="" />
          <div className="text-2xl font-semibold">TaskSync</div>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setActiveTab("signup")}
            className={`px-8 py-2 rounded-sm font-semibold text-sm tracking-wider cursor-pointer ${
              activeTab === "signup"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            SIGN UP
          </button>
          <button
            onClick={() => setActiveTab("signin")}
            className={`px-8 py-2  font-semibold text-sm tracking-wider cursor-pointer ${
              activeTab === "signin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            SIGN IN
          </button>
        </div>

        <div className="py-8">
          {activeTab === "signup" ? <SignUpForm triggerOnBoarding = {triggerOnBoarding}/> : <LoginForm/>}

        </div>
      </div>
    </>
  );
}
