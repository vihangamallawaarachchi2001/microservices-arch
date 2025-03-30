"use dom";
import { Link, useRouter } from "expo-router";
import { Bell, ShoppingCart, User, Utensils } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getLoggedInStatus } from "@/utils/storage";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const authCheck = async () => {
    const status = await getLoggedInStatus();
    setIsLoggedIn(status)
  }
  useEffect(() =>{
    authCheck()
  }, [isLoggedIn])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 shadow-md  backdrop-blur supports-[backdrop-filter]:bg-white/60 ">
      <div className=" flex h-16 max-w-[1366px] mx-auto items-center w-full justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold text-orange-500">QuickBite</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-primary focus:outline-none"
          onClick={() => {
            console.log("clicked the nav icon");
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <nav
          className={`${
            isMenuOpen ? "block top-16 bg-white" : "hidden"
          } absolute  left-0 w-full  transition-all duration-300 ease-in-out md:relative md:flex md:gap-6 md:shadow-none`}
        >
          <div className="flex flex-col space-y-4 p-4 md:flex-row md:space-y-0 md:items-center">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary"
            >
              Restaurants
            </Link>
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary"
            >
              How it Works
            </Link>
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary"
            >
              About Us
            </Link>
            {/* Sign In and Get Started Buttons */}
            {isLoggedIn ? (
              <div className="md:hidden">
              <Link href="/">
                <User className="h-6 w-6 text-gray-600 hover:text-primary" />
                Profile
              </Link>
              <Link href="/">
                <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-primary" />
                Cart
              </Link>
              <Link href="/">
                <Bell className="h-6 w-6 text-gray-600 hover:text-primary" />
                Notifications
              </Link>
            </div>
            ) : (
              
              <div className="mt-4 flex flex-col space-y-2 md:hidden">
              <Link
                href="/"
                className="block w-full rounded-md bg-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-600 hover:bg-gray-200"
              >
                Sign In
              </Link>
              <Button className="w-full bg-primary text-white hover:bg-primary-dark">
                Get Started
              </Button>
            </div>
            )}
          </div>
        </nav>

        {/* Actions Section (Desktop Only) */}
        {isLoggedIn  ? (
          <div className="hidden md:flex justify-center items-center gap-5">
            <Link href="/">
              <User className="h-6 w-6 text-gray-600 hover:text-primary" />
            </Link>
            <Link href="/">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-primary" />
            </Link>
            <Link href="/">
              <Bell className="h-6 w-6 text-gray-600 hover:text-primary" />
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Button
              className="bg-transparent text-primary border border-primary hover:text-white"
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Sign In
            </Button>
            <Button
              className="bg-primary text-white hover:bg-primary-dark hover:border hover:border-black hover:bg-white hover:text-primary"
              onClick={() => {
                router.push("/auth/signup");
              }}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
