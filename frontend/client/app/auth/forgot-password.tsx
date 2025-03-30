"use dom";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { ChevronLeft, Utensils } from "lucide-react";
const bg = require("../../assets/images/signup-bg.png");
import { Image } from "react-native";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/lib/api";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!formData.email.trim()) {
      setError("Email is required.");
      setLoading(false);
      return;
    } else if (!emailRegex.test(formData.email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    try {
      const res = await forgotPassword(formData.email);
      if (res.status === 200) {
        router.push(
          `/auth/otp-validation?email=${formData.email}&process=resetPassword`
        );
      } else {
        setError("Email not found. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-gray-100">
      {/* Background Image */}
      <div className="absolute h-[100vh] w-full">
        <Image
          source={bg}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </div>

      {/* Main Content */}
      <div className="bg-white flex flex-col p-6 rounded-lg sm:min-w-[500px] shadow-md z-10">
        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <Button
            className="text-black hover:bg-transparent hover:text-black rounded-lg hover:border hover:border-black bg-white text-lg flex items-center justify-center"
            onClick={() => router.back()}
          >
            <ChevronLeft className="text-lg" />
            Back
          </Button>
          <div className="flex items-center justify-center">
            <Utensils size={40} className="text-orange-500" />
            <h1 className="text-2xl font-bold text-orange-500 mt-2">
              QuickBite
            </h1>
          </div>
        </div>

        {/* Form Fields */}
        <div className="w-full max-w-md rounded-lg">
          <p className="text-gray-700 text-center mb-6">
            Enter your email to receive a password reset OTP.
          </p>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold ml-1 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="vihanganethusara00@gmail.com"
              className="w-full p-3 border border-gray-300 outline-none rounded-lg mb-3"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Reset Password"}
          </button>

          {/* Back to Login Link */}
          <div className="flex justify-center mt-6">
            <p className="text-gray-600">Remember your password? </p>
            <Link href="/auth/login" className="ml-1 text-orange-500 font-bold">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;