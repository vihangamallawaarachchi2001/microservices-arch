"use dom";
import { Link } from "expo-router";
import { Utensils } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-gray-800">QuickBite</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-primary"
          >
            Restaurants
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-primary"
          >
            How it Works
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-primary"
          >
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:inline-flex text-sm font-medium text-gray-600 hover:text-primary"
          >
            Sign In
          </Link>
          <Button className="bg-primary text-white hover:bg-primary-dark">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
