"use dom";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Utensils,
} from "lucide-react";
const bg = require("../../assets/images/signup-bg.png");
import { Image } from "react-native";
import { Button } from "@/components/ui/button";
import { register } from "@/lib/api";
import '../../global.css'

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNo: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s()+-]+$/;
  const usernameRegex = /^[A-Za-z\s]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateForm = () => {
    const newError: any = {};

    if (!formData.username.trim()) {
      newError.username = "Username is required.";
    } else if (!usernameRegex.test(formData.username)) {
      newError.username = "Username must only contain letters.";
    }

    if (!formData.email.trim()) {
      newError.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newError.email = "Invalid email format.";
    }

    if (!formData.phoneNo.trim()) {
      newError.phoneNo = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phoneNo)) {
      newError.phoneNo = "Invalid phone number.";
    }

    if (!formData.address.trim()) {
      newError.address = "Address is required.";
    }

    if (!formData.password.trim()) {
      newError.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newError.password = "Password must be at least 8 characters long.";
    } else if (!passwordRegex.test(formData.password)) {
      newError.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError({}); 

    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const res = await register(formData);
      if (res.status === 201) {
        router.push(`/auth/otp-validation?email=${formData.email}&process=activateAccount`); 
      } else {
        setError({ axiosErr: "Error signing you up. Please try again later." });
      }
    } catch (err) {
      setError({ axiosErr: "An unexpected error occurred. Please try again." });
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
            onClick={() => {
              router.back();
            }}
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
            <label htmlFor="username" className="font-semibold ml-1 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="vihanga mallawaarachchi"
              className="w-full p-3 border border-gray-300 outline-none rounded-lg mb-3"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            {error.username && (
              <p className="text-red-500 text-sm">{error.username}</p>
            )}
          </div>

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
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="phoneNo" className="font-semibold ml-1 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+94 74 331 8215"
              className="w-full p-3 border border-gray-300 outline-none rounded-lg mb-3"
              value={formData.phoneNo}
              onChange={(e) =>
                setFormData({ ...formData, phoneNo: e.target.value })
              }
            />
            {error.phoneNo && (
              <p className="text-red-500 text-sm">{error.phoneNo}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold ml-1 mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="No 32/E/1, pore, athurugiriya"
              className="w-full p-3 border border-gray-300 outline-none rounded-lg mb-3"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            {error.address && (
              <p className="text-red-500 text-sm">{error.address}</p>
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

          {error.axiosErr && (
            <p className="text-red-500 text-sm mb-4">{error.axiosErr}</p>
          )}

          <button
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="flex justify-center mt-4 items-center">
            <p className="text-gray-600">Already have an account? </p>
            <Link href="/auth/login" className="ml-1 text-orange-500 font-bold">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;