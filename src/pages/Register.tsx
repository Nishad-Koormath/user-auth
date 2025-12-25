import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAppSelector } from "../hooks/reduxHooks";
import { useState } from "react";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const [agree, setAgree] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    if (!user) return;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      phone: user.phoneNumber,
      name: `${data.firstName} ${data.lastName}`, // ✅ combined
      email: data.email,
      createdAt: new Date(),
    });

    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT SECTION – Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <img
          src="/5774b1d8a66bd464021e86eb52c3b8dc230da000.png"
          alt="Sign up illustration"
          className="max-w-md w-full object-contain rounded-2xl"
        />
      </div>

      {/* RIGHT SECTION – Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Sign up</h1>
            <p className="text-gray-600 text-base">
              Let’s get you all set up so you can access your personal account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* First Name */}
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-900 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full h-12 p-3 border border-gray-500 rounded text-sm outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-900 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full h-12 p-3 border border-gray-500 rounded text-sm outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative mb-4">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-900 font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full h-12 p-3 border border-gray-500 rounded text-sm outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 mb-6">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1"
              />
              <p className="text-sm text-gray-800 font-medium">
                I agree to all the <span className="text-red-500">Terms</span>{" "}
                and <span className="text-red-500">Privacy Policies</span>
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={!agree}
              className="w-full py-3 rounded font-medium transition-colors
                         bg-indigo-600 text-white
                         disabled:bg-indigo-300
                         disabled:cursor-not-allowed"
            >
              Create account
            </button>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600 mt-3 font-medium">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-red-500 cursor-pointer font-medium"
              >
                Login
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
