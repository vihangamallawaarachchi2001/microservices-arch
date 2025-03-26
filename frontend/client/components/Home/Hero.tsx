import { MapPin, Search } from "lucide-react";
import React from "react";
import { Image } from "react-native";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const HeroImage = require("../../assets/images/hero.png");

const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <div className="relative h-[600px] w-full">
        <Image
          source={HeroImage}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </div>
      <div className="container absolute inset-0 z-20 flex flex-col items-start justify-center gap-6 text-white px-5">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Delicious Food <span className="text-primary">Delivered</span> To Your
          Doorstep
        </h1>
        <p className="max-w-md text-lg text-gray-200">
          Order from your favorite restaurants and track your delivery in
          real-time.
        </p>
        <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Enter your address"
              className="pl-10 py-3 bg-white/90 text-black rounded-md border border-gray-200 focus:border-primary focus:ring-primary"
            />
          </div>
          <Button className="bg-primary text-white hover:bg-primary-dark flex items-center gap-2 py-3 px-5 rounded-md">
            Find Food <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
