"use dom";
import "../../global.css";
import React from "react";
import { Link } from "expo-router";
import {
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  // Mock data for top deals, categories, outlets, and restaurants
  const topDeals = [
    { id: 1, title: "50% Off on Burgers", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Buy 1 Get 1 Free", image: "https://via.placeholder.com/150" },
  ];

  const topCategories = [
    { id: 1, name: "Burgers", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Pizza", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Sushi", image: "https://via.placeholder.com/150" },
  ];

  const outletsNearYou = [
    { id: 1, name: "QuickBite Diner", distance: "2.5 km", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Food Haven", distance: "3.8 km", image: "https://via.placeholder.com/150" },
  ];

  const topRestaurants = [
    { id: 1, name: "Gourmet Delight", rating: 4.7, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Tasty Treats", rating: 4.5, image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <User size={24} className="text-gray-600" />
          <p className="font-semibold text-gray-800">Hi, John</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/user/cart">
            <ShoppingCart size={24} className="text-gray-600" />
          </Link>
          <Link href="/user/profile">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for hotels, restaurants..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {/* Top Deals Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Deals</h2>
          <div className="flex overflow-x-auto space-x-4">
            {topDeals.map((deal) => (
              <div key={deal.id} className="flex-shrink-0 w-40 bg-white rounded-lg shadow-md p-4">
                <img src={deal.image} alt={deal.title} className="w-full h-24 object-cover rounded-md" />
                <p className="mt-2 text-sm text-gray-700">{deal.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top Categories Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Categories</h2>
          <div className="grid grid-cols-3 gap-4">
            {topCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-md p-4 text-center">
                <img src={category.image} alt={category.name} className="w-20 h-20 mx-auto object-cover rounded-md" />
                <p className="mt-2 text-sm text-gray-700">{category.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Outlets Near You Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Outlets Near You</h2>
          <div className="space-y-4">
            {outletsNearYou.map((outlet) => (
              <div key={outlet.id} className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4">
                <img src={outlet.image} alt={outlet.name} className="w-16 h-16 rounded-md object-cover" />
                <div>
                  <p className="font-semibold text-gray-800">{outlet.name}</p>
                  <p className="text-sm text-gray-500">{outlet.distance} away</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Restaurants Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Restaurants</h2>
          <div className="space-y-4">
            {topRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4">
                <img src={restaurant.image} alt={restaurant.name} className="w-16 h-16 rounded-md object-cover" />
                <div>
                  <p className="font-semibold text-gray-800">{restaurant.name}</p>
                  <p className="text-sm text-gray-500">Rating: {restaurant.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;