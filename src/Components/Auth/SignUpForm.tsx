import api from "@/Context/axios";
import { useRef, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { AuthLayoutProps } from "@/Layout/Auth/AuthLayout";
import { Puff } from "react-loader-spinner";

interface RegistrationUserDataType {
  username: string;
  email: string;
  password: string;
  profile_picture?: string;
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

  // State for storing the image URL from cloudinary
  const [imageURL, setImageURL] = useState<string | null>(null);

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
      profile_picture: imageURL || "",
    };

    try {
      console.log("FormData that is sent to the laravel backend", formData);
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

  async function handleImageUpload(event: any) {
    const imageFile = event.target.files[0];
    // Error handling
    if (!imageFile) {
      return;
    }

    // To send the image we need to create a FormData, because images are considered as binary
    const data = new FormData();
    // appending the data according to the kew value pair where "profile_picture" is the key
    data.append("file", imageFile);
    data.append("upload_preset", "Task_Sync");
    data.append("cloud_name", "ddukqnbjm");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddukqnbjm/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImageUrl = await response.json();
      setImageURL(uploadedImageUrl.url);
      // console.log(uploadedImageUrl);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Image Upload Section*/}
          <div className="items-center justify-center flex flex-col gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              {imageURL ? (
                <img
                  src={imageURL}
                  alt="Profile_Picture"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  {/* Image Holder Section */}
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-slate-200 px-2 py-1 rounded-lg text-blue-500 ">
              <span className="text-sm">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </span>
            </label>
          </div>

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
          {loading ? (
            <div className="items-center justify-center flex t-4">
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
              Create Account
            </button>
          )}
        </form>
      </div>
    </>
  );
}
