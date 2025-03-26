import React from "react";

const HowItWorks = () => {
  return (
    <section className="container py-8 md:py-16 lg:py-16">
      <div className="flex flex-col gap-4 mb-8 text-center">
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-primary">
          How It Works
        </h2>
       
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base lg:text-lg">
          Getting your favorite food delivered has never been easier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-5">
       
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-primary text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground">
            1
          </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
            Enter Your Location
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
            Enter your address to find all the restaurants available in your
            area.
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-primary text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground">
            2
          </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
            Choose a Restaurant
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
            Browse menus, read reviews, and select the perfect restaurant for
            your mood.
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-primary text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground">
            3
          </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
            Enjoy Your Food
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
            Track your order in real-time and enjoy your food when it arrives at
            your doorstep.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
