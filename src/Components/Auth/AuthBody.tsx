import CompanyLogo from "../../assets/CompanyLogo.svg";
import { useState } from "react";
export default function AuthBody() {
  // State to track which button is active
  const [activeTab, setActiveTab] = useState<"signup" | "signin">("signup");

  return (
    <>
      <div className="w-full max-w-md px-8 py-16">
        {/* Logo */}
        <div className="flex items-center justify-start mb-4 gap-2">
          <img src={CompanyLogo} alt="" />
          <div className="text-2xl font-semibold">TaskSync</div>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-start mt-6 ">
          <button
            onClick={() => setActiveTab("signup")}
            className={`px-4 py-2 rounded-full font-semibold text-sm tracking-wider cursor-pointer ${
              activeTab === "signup"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            SIGN UP
          </button>
          <button
          onClick={() => setActiveTab("signin")}
          className={`px-4 py-2 rounded-full font-semibold text-sm tracking-wider cusrpor-pointer${
            activeTab === "signin"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          SIGN IN
        </button>
        </div>
      </div>
    </>
  );
}
