"use dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "expo-router";
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
} from "lucide-react";
import "../global.css";
import { Image } from "react-native";
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

const HeroImage = require("../assets/images/hero.png");

export default function Index() {
  return (
    <div className="overflow-scroll bg-white">
      <div className="flex min-h-screen flex-col mx-auto  w-full ">
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
