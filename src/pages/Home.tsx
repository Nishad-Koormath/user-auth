import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    await signOut(auth);

    // ✅ IMPORTANT: clear Firebase reCAPTCHA
    if ((window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier.clear();
      delete (window as any).recaptchaVerifier;
    }

    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Logo - Top Right */}
      <div className="absolute top-8 right-8">
        <img
          src="/b8b315bbf379bfbed97ff5856eb4c658a6a5b15f.png"
          alt="Company Logo"
          className="w-14 h-14 object-contain"
        />
      </div>

      {/* CENTER CONTENT */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Phone Number */}
        <p className="text-lg font-semibold text-gray-900 mb-6 text-center">
          {user?.phoneNumber}
        </p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="
            w-80 bg-indigo-600 text-white py-3 rounded font-medium
            hover:bg-indigo-700 transition-colors
            disabled:opacity-70 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {loading ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </div>
  );
}
