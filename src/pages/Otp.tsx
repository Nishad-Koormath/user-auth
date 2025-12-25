import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { authFailure, authSuccess } from "../features/auth/authSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useState } from "react";

export default function Otp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [otp, setOtp] = useState("");
  const [localError, setLocalError] = useState("");

  const onSubmit = async () => {
    if (!/^[0-9]{6}$/.test(otp)) {
      setLocalError("Enter valid 6-digit OTP");
      return;
    }

    try {
      const confirmationResult = (window as any).confirmationResult;

      if (!confirmationResult) {
        throw new Error("OTP session expired. Try again.");
      }

      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      dispatch(authSuccess(user));

      if (userSnap.exists()) {
        navigate("/home");
      } else {
        navigate("/register");
      }
    } catch (err: any) {
      dispatch(authFailure(err.message || "Invalid OTP"));
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT SECTION */}
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

          {/* Back */}
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-800 mb-6 flex items-center gap-1 hover:text-gray-950 font-medium"
          >
            <span className="text-lg leading-none">&lt;</span>
            <span>Back to login</span>
          </button>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Verify code
            </h1>
            <p className="text-gray-600 text-base">
              An authentication code has been sent to your mobile number.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="relative w-full mb-3">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-900 font-medium z-10">
                Enter Code
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!/^[0-9]*$/.test(value)) return;

                  setOtp(value);

                  if (value.length === 6) {
                    setLocalError("");
                  } else if (value.length > 6) {
                    setLocalError("Enter valid 6-digit OTP");
                  }
                }}
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

            <div className="text-sm text-gray-900 font-medium mb-6">
              Didn’t receive a code?{" "}
              <span className="text-red-500 cursor-pointer font-medium">
                Resend
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded font-medium
                         hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <img
          src="/f031e5b1caa0632b7cb3d2dc29294fc91b0a771f.png"
          alt="OTP illustration"
          className="max-w-md w-full object-contain rounded-2xl"
        />
      </div>
    </div>
  );
}
