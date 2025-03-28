import React from "react";
import { Image } from "react-native";
import { Button } from "../ui/button";
import { Apple, Smartphone } from "lucide-react";

const AppDown = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/80 to-primary/60 text-primary-foreground py-8 md:py-16 lg:py-20 overflow-hidden">
      <div className="container relative z-10 pl-5 max-w-[1366px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Get The QuickBite App
            </h2>
            <p className="text-primary-foreground/90 max-w-md text-sm md:text-base lg:text-lg">
              Download our mobile app for a better experience. Order food, track
              delivery, and get exclusive deals.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                className="gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Apple className="h-5 w-5" /> App Store
              </Button>
              <Button
                variant="secondary"
                className="gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Smartphone className="h-5 w-5" /> Google Play
              </Button>
            </div>

            {/* QR Codes */}
            <div className="flex flex-row gap-10 mt-4">
              <div className="flex flex-col items-start gap-2 group">
                <h4 className="text-base md:text-lg font-medium text-white group-hover:text-primary-foreground transition-colors">
                  QuickBite mobile <br /> app
                </h4>
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all">
                  <Image
                    source={require("@/assets/images/hero-categories/qr.png")}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    resizeMode="contain"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 group">
                <h4 className="text-base md:text-lg font-medium text-white group-hover:text-primary-foreground transition-colors">
                  QuickBite Business <br /> Studio
                </h4>
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all">
                  <Image
                    source={require("@/assets/images/hero-categories/qr.png")}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    resizeMode="contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative h-full hidden md:block">
            <Image
              source={require("@/assets/images/hero-categories/download.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              resizeMode="cover"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[url('@/assets/images/hero-categories/decoration.svg')] bg-no-repeat bg-center bg-cover opacity-20"></div>
    </section>
  );
};

export default AppDown;
