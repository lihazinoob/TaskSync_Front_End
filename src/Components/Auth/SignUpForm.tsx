import api from "@/Context/axios";
import GitHubIcon from "../../assets/GitHubIcon.svg";
import { useRef, useState,useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import { AuthLayoutProps } from "@/Layout/Auth/AuthLayout";

interface RegistrationUserDataType {
  username: string;
  email: string;
  password: string;
}

// Interface for form errors
interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

// Validation function which validates the user data before sending to the backend

export default function SignUpForm({ triggerOnBoarding }: AuthLayoutProps) {
  const { login } = useAuth();

  // Refs for user data field
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // State for error message
  const [errors, setErrors] = useState<FormErrors>({});
  // State for showing the "loading message"
  const [loading, setLoading] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateForm() {
    const newErrors: FormErrors = {};
    // Validate the username
    const username = usernameRef.current?.value.trim();
    if (!username) {
      newErrors.username = "Username is required";
    }

    // validate the email
    const email = emailRef.current?.value.trim();
    if (!email) {
      newErrors.email = "Email is Required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid Email Format";
    }

    // Validate the password
    const password = passwordRef.current?.value.trim();
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    // console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleGitHubAuth() {
    try {
      setLoading(true);
      const { data } = await api.get("/auth/github");
      window.location.href = data.url;
    } catch (error:any) {
      setErrors({
        email:"Failed to initiate GitHub Authentication"
      });
      setLoading(false);
    }
  }


  // Handle GitHub callback
  useEffect(() => {
    console.log('SignUpForm useEffect triggered');
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('OAuth Code:', code);
    if (code) {
      window.history.replaceState({}, document.title, window.location.pathname);
      const handleGitHubCallback = async () => {
        try {
          console.log('Calling /api/auth/github/callback with code:', code);
          setLoading(true);
          const { data } = await api.get("/auth/github/callback", {
            params: { code },
          });
          console.log('GitHub Callback Response:', data);
          login(data.access_token);
          console.log('Triggering onboarding...');
          triggerOnBoarding();
          
        } catch (err: any) {
          console.error('GitHub Callback Error:', err);
          setErrors({ email: err.response?.data?.message || "GitHub authentication failed" });
        } finally {
          setLoading(false);
          console.log('Loading state set to false');
        }
      };
      handleGitHubCallback();
    } else {
      console.log('No OAuth code found in URL');
    }
  }, [login, triggerOnBoarding]);

  // the handler function to handle the submission logic
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    const formData: RegistrationUserDataType = {
      username: usernameRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };

    try {
      const { data } = await api.post("/register", formData);
      login(data.access_token);
      // call the triggerOnBoarding function here to trigger the onboarding screen
      triggerOnBoarding();
      if (usernameRef.current) usernameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
    } catch (err: any) {
      setErrors({ email: err.response?.data?.error || "Failed to register" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* UserName */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UserName
            </label>
            <input
              type="text"
              ref={usernameRef}
              placeholder="Your Username"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email ID
            </label>
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter Email ID"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <div className="flex flex-row justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 ">
                Password
              </label>
            </div>

            <input
              type="password"
              ref={passwordRef}
              placeholder="Enter Password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Create Account Button */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="items-center justify-center flex text-gray-400">OR</div>

        {/* Google Icon */}

        <div className="flex flex-row items-center justify-center">
          <div
            className="border-2 border-slate-200 px-4 py-1 rounded-lg cursor-pointer"
            onClick={handleGitHubAuth}
          >
            <img src={GitHubIcon} alt="icon-google" className="w-10 h-10" />
          </div>
        </div>
      </div>
    </>
  );
}
