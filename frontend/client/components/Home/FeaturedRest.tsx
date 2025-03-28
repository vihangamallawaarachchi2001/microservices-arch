import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { Image } from "react-native";
import { Link } from "expo-router";

const FeaturedRest = () => {
  return (
    <section className="bg-muted py-8 md:py-16 lg:py-20">
      <div className="container max-w-[1366px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8 lg:mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-orange-500">
              Featured Restaurants
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Our users' most loved places to order from
            </p>
          </div>
          {/* View All Button (Visible on Larger Screens) */}
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 text-primary hover:underline transition-colors"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-2 md:px-0">
          {[
            {
              name: "Burger Palace",
              rating: 4.8,
              time: "15-25",
              tags: ["Burgers", "American"],
              image: require("@/assets/images/hero-categories/burger king.png"),
            },
            {
              name: "Sushi Master",
              rating: 4.7,
              time: "25-35",
              tags: ["Japanese", "Sushi"],
              image: require("@/assets/images/hero-categories/tacos.jpg"),
            },
            {
              name: "Pizza Heaven",
              rating: 4.9,
              time: "20-30",
              tags: ["Pizza", "Italian"],
              image: require("@/assets/images/hero-categories/pizzahut.jpg"),
            },
            {
              name: "Taco Fiesta",
              rating: 4.6,
              time: "15-25",
              tags: ["Mexican", "Tacos"],
              image: require("@/assets/images/hero-categories/dominoz.jpg"),
            },
          ].map((restaurant) => (
            <div
              key={restaurant.name}
              className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
            >
              {/* Image Section */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  source={restaurant.image}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  resizeMode="cover"
                />
                {/* Delivery Time Badge */}
                <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                  {restaurant.time} min
                </div>
              </div>
              {/* Content Section */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-bold line-clamp-1">
                    {restaurant.name}
                  </h3>
                  {/* Rating Section */}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>
                {/* Tags Section */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {restaurant.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-1 text-xs md:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button (Visible on Smaller Screens) */}
        <div className="mt-6 md:mt-8 lg:mt-10 text-center sm:hidden">
          <Button variant="outline" className="gap-2">
            View All Restaurants <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRest;
