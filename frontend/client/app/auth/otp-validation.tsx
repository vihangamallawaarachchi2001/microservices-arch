"use dom";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ChevronLeft, Utensils, Eye, EyeOff } from "lucide-react";
const bg = require("../../assets/images/signup-bg.png");
import { Image } from "react-native";
import { Button } from "@/components/ui/button";
import { activateAccount, resendOTP, resetPassword } from "@/lib/api";
import { useLocalSearchParams } from "expo-router";
import '../../global.css'

const OTPValidation = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const process = params.process as string;
  const email = params.email as string;

  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [otpResendStatus, setOtpResendStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [description, setDescription] = useState<string | React.ReactNode>(false);

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    if (process === "resetPassword") {
      setDescription(
        <>
          Enter the OTP sent to your email <span className="font-bold">{email}</span> to reset your password.
        </>
      );
    } else if (process === "activateAccount") {
      setDescription(
        <>
          We have sent you an OTP to your email <span className="font-bold">{email}</span>. Verify your email to activate your account and enjoy delicious food.
        </>
      );
    }
  }, [process, email]);

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError(null);

    // Validate OTP
    if (!otp.trim()) {
      setError("OTP is required.");
      setLoading(false);
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError("Invalid OTP. It must be exactly 6 digits.");
      setLoading(false);
      return;
    }

    try {
      let res;

      if (process === "activateAccount") {
        res = await activateAccount(email, otp);
      } else if (process === "resetPassword") {
        if (!newPassword.trim()) {
          setError("New password is required.");
          return;
        }
        if (newPassword !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
        if (!passwordRegex.test(newPassword)) {
          setError("Password must be at least 8 characters with uppercase, lowercase, number, and special character.");
          return;
        }
        res = await resetPassword(email, otp, newPassword);
      } else {
        throw new Error("Invalid process type.");
      }

      if (res.status === 200) {
       if (process === 'activateAccount')  router.push("/"); 
       else if ( process === 'resetPassword')  router.push("/auth/login"); 

      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoadingTwo(true);
    setError(null);
    try {
      const res = await resendOTP(email);
      if (res.status === 200) {
        setOtpResendStatus("New OTP has been resent to your email.");
      } else {
        setError("Error resending OTP. Please try again later.");
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoadingTwo(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-gray-100">
    
      <div className="absolute h-[100vh] w-full">
        <Image
          source={bg}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </div>

      <div className="bg-white flex flex-col sm:max-w-[400px] p-6 rounded-lg sm:min-w-[400px] shadow-md z-10">
   
        <div className="flex justify-between items-end mb-6">
          <Button
            className="text-black hover:bg-transparent hover:text-black rounded-lg hover:border hover:border-black bg-white text-lg flex items-center justify-center"
            onClick={() => router.back()}
          >
            <ChevronLeft />
            Back
          </Button>
          <div className="flex items-center justify-center">
            <Utensils size={40} className="text-orange-500" />
            <h1 className="text-2xl font-bold text-orange-500 mt-2">QuickBite</h1>
          </div>
        </div>

        <p className="text-gray-700 text-center text-md mb-6">{description}</p>

        <div className="flex flex-col">
          <label htmlFor="otp" className="font-semibold ml-1 mb-2">
            Enter OTP
          </label>
          <input
            type="text"
            placeholder="123456"
            className="w-full p-3 border border-gray-300 outline-none rounded-lg mb-3"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {process === "resetPassword" && otp.length === 6 && (
          <>
            <div className="flex flex-col">
              <label htmlFor="newPassword" className="font-semibold ml-1 mb-2">
                New Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full p-3 outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="p-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="font-semibold ml-1 mb-2">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full p-3 outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="p-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
          </>
        )}

        <button
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
          onClick={handleVerifyOTP}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="flex justify-center mt-4 items-center gap-2">
          <button
            className="text-orange-500 font-bold underline"
            onClick={handleResendOTP}
            disabled={loadingTwo}
          >
            {loadingTwo ? "Resending..." : "Resend OTP"}
          </button>
          {otpResendStatus && (
            <p className="text-green-500 text-sm">{otpResendStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPValidation;