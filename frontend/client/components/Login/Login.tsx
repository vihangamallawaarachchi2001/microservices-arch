"use dom";

import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Utensils,
} from "lucide-react";
import { Image } from "react-native";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/api";
import { setLoggedInStatus } from "@/utils/storage";
const bg = require("../../assets/images/signup-bg.png");
import '../../global.css'

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/; 



  const validateForm = () => {
    const newError: any = {};

    if (!formData.emailOrUsername.trim()) {
      newError.emailOrUsername = "Email or username is required.";
    } else if (
      !emailRegex.test(formData.emailOrUsername) &&
      formData.emailOrUsername.length < 3
    ) {
      newError.emailOrUsername =
        "Invalid email format or username must be at least 3 characters.";
    }

    if (!formData.password.trim()) {
      newError.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      newError.password =
        "Password must be at least 6 characters and contain letters and numbers.";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleLogin = async () => {
    setLoading(true);
    setError({}); 

    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const res = await login(formData);
      if (res.status === 200) {
        setLoggedInStatus(true)
        router.push("/"); 
      } else if (res.status === 401) {
        setError({
          auth: "Invalid email/username or password. Please try again.",
        });
      } else if (res.status === 403) {
        setError({
          auth: "Account not activated. Check your email for the activation link.",
        });
      } else {
        setError({
          auth: "An error occurred. Please try again later.",
        });
      }
    } catch (err) {
      setError({
        auth: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-gray-100">

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

      <div className="bg-white flex flex-col p-6 rounded-lg sm:min-w-[500px] shadow-md z-10">
    
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

        <div className="w-full max-w-md rounded-lg">
         
          <div className="flex flex-col">
            <label htmlFor="emailOrUsername" className="font-semibold ml-1 mb-2">
              Email 
            </label>
            <input
              type="text"
              placeholder="vihanganethusara00@gmail.com"
              className="w-full p-3 border border-gray-300 outline-none rounded-lg mb-3"
              value={formData.emailOrUsername}
              onChange={(e) =>
                setFormData({ ...formData, emailOrUsername: e.target.value })
              }
            />
            {error.emailOrUsername && (
              <p className="text-red-500 text-sm">{error.emailOrUsername}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold ml-1 mb-2">
              Password
            </label>
            <div className="w-full p-3 border border-gray-300 rounded-lg mb-4 flex items-center">
              <input
                id="password"
                type={displayPassword ? "text" : "password"}
                placeholder="* * * * * * *"
                className="w-full outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="ml-2"
                onClick={() => setDisplayPassword(!displayPassword)}
              >
                {displayPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>

          {error.auth && (
            <p className="text-red-500 text-sm mb-4">{error.auth}</p>
          )}

          <button
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Forgot Password Link */}
          <div className="flex justify-center mt-4">
            <Link href="/auth/forgot-password" className="text-orange-500 font-bold underline">
              Forgot Password?
            </Link>
          </div>

          {/* Signup Link */}
          <div className="flex justify-center items-center mt-6">
            <p className="text-gray-600">Don’t have an account? </p>
            <Link href="/auth/signup" className="ml-1 text-orange-500 font-bold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;