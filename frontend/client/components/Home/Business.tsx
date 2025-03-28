import React from "react";
import { Image } from "react-native";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const Business = () => {
  return (
    <section className="container py-16 md:py-24 max-w-[1366px] mx-auto px-2 md:px-0">
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-orange-500">
          Expand Your Business with QuickBite
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Whether you're a driver looking to earn or a restaurant owner wanting
          to reach more customers, QuickBite has the tools you need to succeed.
        </p>
      </div>

      <div className="grid gap-8 mt-12 sm:grid-cols-2">
        {/* Join as a Driver Card */}
        <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90 z-10" />
          <Image
            source={require("../../assets/images/hero-categories/driver.jpg")}
            style={{
              width: "100%",
              height: 300,
            }}
            resizeMode="cover"
            className="aspect-video object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6">
            <h3 className="text-2xl font-bold mb-4">Join as a Driver</h3>
            <p className="text-sm sm:text-base mb-6">
              Earn money on your schedule by delivering food to hungry customers
              in your area.
            </p>
            <Button
              rel="noopener noreferrer"
              className="bg-white text-primary hover:bg-primary-dark hover:text-black transition-all duration-300 px-6 py-3 rounded-md font-medium"
            >
              Become a Driver <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-10" />
          <Image
            source={require("../../assets/images/hero-categories/restaurant.jpg")}
            style={{
              width: "100%",
              height: 300,
            }}
            resizeMode="cover"
            className="aspect-video object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6">
            <h3 className="text-2xl font-bold mb-4">Add Your Restaurant</h3>
            <p className="text-sm sm:text-base mb-6">
              Partner with us to grow your business and reach thousands of new
              customers online.
            </p>
            <Button
              rel="noopener noreferrer"
              className="bg-white text-black hover:bg-secondary-dark hover:text-black transition-all duration-300 px-6 py-3 rounded-md font-medium"
            >
              Partner with Us <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Business;
