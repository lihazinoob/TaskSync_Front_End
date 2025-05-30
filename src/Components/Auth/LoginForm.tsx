import api from "@/Context/axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { Puff } from "react-loader-spinner";
interface LoginUserDataType {
  email: string;
  password: string;
}

// Interface for form errors
interface FormErrors {
  email?: string;
  password?: string;
  github?: string;
}
export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //State for storing the errors
  const [errors, setErrors] = useState<FormErrors>({});
  // State for storing the loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle the form validation
  function validateForm() {
    const newErrors: FormErrors = {};
    const email = emailRef.current?.value.trim();
    if (!email) {
      newErrors.email = "A valid email is required";
    }
    const password = passwordRef.current?.value.trim();
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Function to handle the login form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    } else {
      setLoading(true);
      setErrors({});
    }

    const formData: LoginUserDataType = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };

    try {
      const { data } = await api.post("/login", formData);
      login(data.access_token);
      navigate("/");
      // Emotying the user field after succesfull login process
      if (emailRef.current) {
        emailRef.current.value = "";
      }
      if (passwordRef.current) {
        passwordRef.current.value = "";
      }
    } catch (err: any) {
      setErrors({ email: err.response?.data?.error || "Failed to register" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email ID */}
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
              <label className="block text-sm font-medium text-gray-400">
                <u>Forgot Password?</u>
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

          {/* Sign In Button */}
          {loading ? (
            <div className="items-center justify-center flex pt-4">
              <Puff
                height="50"
                width="50"
                color="#3B82F6"
                ariaLabel="puff-loading"
              />
            </div>
          ) : (
            <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer mt-4"
            type="submit"
            disabled={loading}
          >
            Sign In
          </button>
          )}
        </form>
      </div>
    </>
  );
}
