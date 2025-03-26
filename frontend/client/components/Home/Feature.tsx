import { ArrowRight, Clock, Search, Utensils } from "lucide-react";
import React from "react";

const Feature = () => {
  return (
    <section className="container py-5 md:py-12">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Discover Card */}
        <div className="relative flex flex-col items-center text-center gap-4 p-6 rounded-lg border bg-card shadow-md hover:shadow-lg transition-all duration-300">
          <div className="rounded-full bg-primary/10 p-4 animate-pulse-once">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Discover</h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Browse through thousands of restaurants and cuisines near you.
          </p>
          <div className="absolute bottom-4 right-4 opacity-50">
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Order Card */}
        <div className="relative flex flex-col items-center text-center gap-4 p-6 rounded-lg border bg-card shadow-md hover:shadow-lg transition-all duration-300">
          <div className="rounded-full bg-primary/10 p-4 animate-pulse-once">
            <Utensils className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Order</h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Easily place your order with just a few taps and customize as
            needed.
          </p>
          <div className="absolute bottom-4 right-4 opacity-50">
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Track Card */}
        <div className="relative flex flex-col items-center text-center gap-4 p-6 rounded-lg border bg-card shadow-md hover:shadow-lg transition-all duration-300">
          <div className="rounded-full bg-primary/10 p-4 animate-pulse-once">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Track</h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Follow your order in real-time and know exactly when it will arrive.
          </p>
          <div className="absolute bottom-4 right-4 opacity-50">
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
