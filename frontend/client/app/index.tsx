"use dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "expo-router";
import {
  Search,
  MapPin,
  Utensils,
  Clock,
  Star,
  ArrowRight,
  ChevronRight,
  Smartphone,
  Apple,
  Twitter,
  Facebook,
  Instagram,
  Loader2,
} from "lucide-react";
import "../global.css";
import { Image, Platform } from "react-native";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/Home/Hero";
import Feature from "@/components/Home/Feature";
import PopularCategory from "@/components/Home/PopularCategory";
import HowItWorks from "@/components/Home/HowItWorks";
import Business from "@/components/Home/Business";
import FeaturedRest from "@/components/Home/FeaturedRest";
import Testmonial from "@/components/Home/Testmonial";
import AppDown from "@/components/Home/AppDown";
import NewsLetter from "@/components/Home/NewsLetter";
import Footer from "@/components/common/Footer";
import { ENV } from "@/utils/constants";
import { useEffect, useState } from "react";
import '../global.css'

const HeroImage = require("../assets/images/hero.png");

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const platformChecker = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsNavigationReady(true);

      if (Platform.OS !== "web") {
        // if (isNavigationReady) {
          router.push("/onboards/screen");
        // }
      }
    } catch (error) {
      console.error("Error during platform detection:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    platformChecker();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
        <p className="text-gray-600 mt-4">Initializing...</p>
      </div>
    );
  }

  return (
    <div className="overflow-scroll bg-white">
      <div className="flex min-h-screen flex-col mx-auto w-full">
        <Navbar />
        <main>
          <Hero />
          <Feature />
          <PopularCategory />
          <HowItWorks />
          <Business />
          <FeaturedRest />
          <Testmonial />
          <AppDown />
          <NewsLetter />
          <Footer />
        </main>
      </div>
    </div>
  );
}