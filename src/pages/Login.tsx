import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { sendOtp } from "../features/auth/authThunk";
import { useState } from "react";

interface LoginForm {
  phone: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [phone, setPhone] = useState("");
  const [localError, setLocalError] = useState("");

  const { handleSubmit } = useForm<LoginForm>();

  const onSubmit = async () => {
    if (!/^[0-9]{10}$/.test(phone)) {
      setLocalError("Enter a valid 10-digit mobile number");
      return;
    }

    setLocalError("");
    await dispatch(sendOtp(phone));
    navigate("/otp");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-start justify-center pt-8 px-8 lg:px-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-16">
            <img
              src="/b8b315bbf379bfbed97ff5856eb4c658a6a5b15f.png"
              alt="Company Logo"
              className="w-20 h-20 object-contain"
            />
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Login</h1>
            <p className="text-gray-600 text-base">
              Login to access your travelwise account
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="relative w-full">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-900 font-medium z-10">
                Enter mobile number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;

                  // allow only digits
                  if (!/^[0-9]*$/.test(value)) return;

                  setPhone(value);

                  // ✅ clear error ONLY when exactly 10 digits
                  if (value.length === 10) {
                    setLocalError("");
                  } else if (value.length > 10) {
                    setLocalError("Enter a valid 10-digit mobile number");
                  }
                }}
                onKeyPress={handleKeyPress}
                className="w-full h-13 p-4 border border-gray-500 rounded text-sm text-gray-900 
                          outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              {localError && (
                <p className="text-red-500 text-xs mt-2">{localError}</p>
              )}

              {error && (
                <p className="text-red-500 text-xs mt-2">{error}</p>
              )}
            </div>

            <div>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 mb-3 rounded font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>

              <div className="text-center text-sm text-gray-600 font-medium">
                Don't have an account?{" "}
                <a href="#" className="text-red-500 hover:underline font-medium">
                  Sign up
                </a>
              </div>
            </div>
          </div>

          <div id="recaptcha-container" className="mt-4"></div>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <img
          src="/f031e5b1caa0632b7cb3d2dc29294fc91b0a771f.png"
          alt="Login illustration"
          className="max-w-md w-full object-contain rounded-2xl"
        />
      </div>
    </div>
  );
}
