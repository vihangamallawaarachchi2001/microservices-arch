import React from "react";
import { Image } from "react-native";

const PopularCategory = () => {
  return (
    <section className="bg-muted py-16">
      <div className="container">
        <div className="flex flex-col gap-2 mb-10 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-800">
            Popular Categories
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md">
            Explore our most ordered food categories
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            {
              name: "Pizza",
              image: require("../../assets/images/hero-categories/pizza.jpg"),
            },
            {
              name: "Burgers",
              image: require("../../assets/images/hero-categories/burger.jpg"),
            },
            {
              name: "Sushi",
              image: require("../../assets/images/hero-categories/shushi.png"),
            },
            {
              name: "Chinese",
              image: require("../../assets/images/hero-categories/chineese.jpg"),
            },
            {
              name: "Mexican",
              image: require("../../assets/images/hero-categories/mexican.jpg"),
            },
            {
              name: "Desserts",
              image: require("../../assets/images/hero-categories/desset.jpg"),
            },
          ].map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Image Background */}
              <Image
                source={category.image}
                style={{
                  width: "100%",
                  height: 200,
                }}
                resizeMode="cover"
                className="aspect-square object-cover transition-transform group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/90 transition-colors z-10" />
              {/* Category Name */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-lg font-bold text-white">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategory;
