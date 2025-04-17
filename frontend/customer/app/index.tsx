import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLoggedInStatus } from "@/utils/storage";
import Constants from "expo-constants";
import { Loader2, Loader2Icon, Utensils } from "lucide-react-native";

// Import Tailwind CSS
import "../global.css";

const board1 = require("@/assets/images/onboard/board1.png");
const board2 = require("@/assets/images/onboard/board2.png");
const board3 = require("@/assets/images/onboard/board3.png");

const Index = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

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
      router.push("/auth/login");
    }
  };

  const checkOnboardingStatus = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (Platform.OS !== "web") {
        router.push("/");
        return;
      }

      const status = await getLoggedInStatus();

      if (status) {
        router.push("/");
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

  if (!loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Loader2Icon size={32} className="animate-spin text-orange-500" />
        <Text className="text-gray-600 mt-4">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center relative p-4 bg-gray-100">
      {/* Background Image */}
      <Image
        source={require("@/assets/images/signup-bg.png")}
        className=" inset-0 w-screen h-full"
        resizeMode="cover"
      />

      {/* Content */}
      <View className="bg-white flex rounded-lg shadow-md z-10 max-w-[500px] w-full p-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.push("/auth/login")}
            className="text-black hover:bg-transparent hover:text-black rounded-lg hover:border hover:border-black bg-white text-base font-medium"
          >
            <Text className="text-black">Skip</Text>
          </TouchableOpacity>
          <View className="flex-row items-center space-x-2">
            <Utensils size={32} className="text-orange-500" />
            <Text className="text-xl font-bold text-orange-500">QuickBite</Text>
          </View>
        </View>

        {/* Onboarding Content */}
        <View className="flex items-center space-y-6">
          <Image
            source={onboardingData[currentIndex].image}
            className="w-[200px] h-[200px] object-contain"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-orange-500 text-center">
            {onboardingData[currentIndex].title}
          </Text>
          <Text className="text-gray-700 text-center text-sm px-4">
            {onboardingData[currentIndex].description}
          </Text>
        </View>

        {/* Dots Indicator */}
        <View className="flex-row justify-center my-6 space-x-2">
          {onboardingData.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-orange-500" : "bg-gray-300"
              } transition-all duration-300`}
            />
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          className="w-full bg-orange-500 py-3 rounded-lg justify-center items-center"
          onPress={handleNext}
        >
          <Text className="text-white font-bold text-base">
            {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;