"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { resetPassword } from "@/api";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const title = "Reset Your Password";
  const description = "Enter the OTP sent to your email and choose a new password.";

  const handleSubmit = async () => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    if (!email) {
      alert("Email not found in the URL. Please try again.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword({ email, otp, password: newPassword });

      if (response?.success) {
        alert("Password reset successfully!");
        router.push("/signin");
      } else {
        throw new Error(response?.message || "Password reset failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Password reset failed:", error);
      alert(error.message || "An error occurred while resetting the password.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 dark:from-dark-900 dark:via-dark-900 dark:to-dark-800">
        <div className="w-full max-w-md space-y-8 p-6 bg-white dark:bg-dark-800 rounded-2xl shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400">{title}</h1>
            {description && <p className="text-muted-foreground mt-2">{description}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                if (e.target.value.length === 6) {
                  setShowPasswordFields(true);
                } else {
                  setShowPasswordFields(false);
                }
              }}
              placeholder="Enter your OTP"
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-gray-200"
            />
          </div>
          {showPasswordFields && (
            <>
              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-dark-700 dark:text-gray-200"
                />
              </div>
            </>
          )}
          <button
            onClick={handleSubmit}
            disabled={!showPasswordFields || !otp || !newPassword || !confirmPassword}
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-full font-medium transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          >
            Reset Password
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
