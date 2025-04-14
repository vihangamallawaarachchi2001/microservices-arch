"use dom";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2, Utensils } from "lucide-react";
import { Image, Platform } from "react-native";
import "../../global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { getLoggedInStatus } from "@/utils/storage";

const board1 = require("@/assets/images/onboard/board1.png");
const board2 = require("@/assets/images/onboard/board2.png");
const board3 = require("@/assets/images/onboard/board3.png");

const Onboarding = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState<"web" | "mobile">("web");
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const onboardingData = [
    {
      id: 1,
      image: board1,
      title: "Welcome to QuickBite",
      description:
        "Your go-to app for discovering delicious meals delivered straight to your doorstep. Enjoy a seamless ordering experience with just a few taps.",
    },
    {
      id: 2,
      image: board2,
      title: "Customize Your Orders",
      description:
        "Tailor every order to your preferences. From dietary restrictions to flavor choices, we make it easy for you to create the perfect meal.",
    },
    {
      id: 3,
      image: board3,
      title: "Fast and Reliable Delivery",
      description:
        "Experience lightning-fast delivery with real-time tracking. Whether you're craving breakfast or dinner, we've got you covered!",
    },
  ];

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      if (isNavigationReady) {
        router.push("/auth/login");
      }
    }
  };

  const checkOnboardingStatus = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsNavigationReady(true);

      const detectedPlatform = Constants.platform?.android
        ? "mobile"
        : Constants.platform?.ios
        ? "mobile"
        : "web";
      setPlatform(detectedPlatform);

      if (detectedPlatform === "web") {
        router.push("/");
        return;
      }

      const status = await getLoggedInStatus();
      if (status) {
        router.push("/mobile/home");
        return;
      }

      const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
      if (hasSeenOnboarding === "true") {
        router.push("/auth/login");
        return;
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
        <p className="text-gray-600 mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative p-4 bg-gray-100">
      <div className="absolute inset-0 z-0">
        <Image
          source={require("../../assets/images/signup-bg.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </div>
      <div className="bg-white flex flex-col p-6 rounded-lg sm:min-w-[500px] shadow-md z-10 max-w-[500px] w-full">
        <div className="flex justify-between items-center mb-6">
          <Button
            className="text-black hover:bg-transparent hover:text-black rounded-lg hover:border hover:border-black bg-white text-base font-medium"
            onClick={() => router.push("/auth/login")}
          >
            Skip
          </Button>
          <div className="flex items-center justify-center space-x-2">
            <Utensils size={32} className="text-orange-500" />
            <h1 className="text-xl font-bold text-orange-500">QuickBite</h1>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <Image
            source={onboardingData[currentIndex].image}
            alt="Onboarding"
            style={{
              width: 200,
              height: 200,
            }}
            resizeMode="contain"
            className="object-contain"
          />
          <h2 className="text-2xl font-bold text-orange-500 text-center">
            {onboardingData[currentIndex].title}
          </h2>
          <p className="text-gray-700 text-center text-sm px-4">
            {onboardingData[currentIndex].description}
          </p>
        </div>
        <div className="flex justify-center my-6 space-x-2">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-orange-500" : "bg-gray-300"
              } transition-all duration-300`}
            />
          ))}
        </div>
        <button
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition duration-300"
          onClick={handleNext}
        >
          {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;