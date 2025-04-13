import GoogleIcon from "../../assets/GoogleIcon.svg";

export default function SignUpForm() {
  return (
    <>
      <div className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email ID
          </label>
          <input
            type="email"
            placeholder="Enter Email ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Password */}
        <div className="">
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
            placeholder="Enter Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Create Account Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer mt-4">
          Create Account
        </button>

        <div className="items-center justify-center flex text-gray-400">OR</div>

        {/* Google Icon */}

        <div className="flex flex-row items-center justify-center">
          <div className="border-2 border-slate-200 px-4 py-1 rounded-lg cursor-pointer">
            <img src={GoogleIcon} alt="icon-google" />
          </div>
        </div>
      </div>
    </>
  );
}
