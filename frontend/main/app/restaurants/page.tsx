"use client";
import Link from "next/link";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Star,
  Clock,
  MapPin,
  Search,
  ChevronDown,
  Filter,
  Pizza,
  Coffee,
  Beef,
  Salad,
  IceCream,
  Soup,
  Utensils,
} from "lucide-react";
import { fetchRestaurants, Restaurant } from "@/api";

// Icon map for categories
const categoryIcons: Record<string, JSX.Element> = {
  All: <Utensils className="h-5 w-5" />,
  Pizza: <Pizza className="h-5 w-5" />,
  Burgers: <Beef className="h-5 w-5" />,
  Salads: <Salad className="h-5 w-5" />,
  Desserts: <IceCream className="h-5 w-5" />,
  Coffee: <Coffee className="h-5 w-5" />,
  Soups: <Soup className="h-5 w-5" />,
};

const cuisines = ["Italian", "Chinese", "Mexican", "Japanese", "American", "Indian", "Thai"];
const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher"];

export default function RestaurantsPage() {
  const [filters, setFilters] = useState({
    cuisine: [] as string[],
    dietary: [] as string[],
    search: "",
    location: "",
    sort: "a-z",
  });

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleFilter = (type: "cuisine" | "dietary", value: string) => {
    setFilters((prev) => {
      const list = prev[type];
      return {
        ...prev,
        [type]: list.includes(value) ? list.filter((item) => item !== value) : [...list, value],
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchRestaurants(filters);
        setRestaurants(data);
      } catch (err) {
        console.error("Error fetching restaurants", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const handleSortToggle = () => {
    setFilters((prev) => ({
      ...prev,
      sort: prev.sort === "a-z" ? "z-a" : "a-z",
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative py-12 md:py-16 bg-primary-600 dark:bg-primary-300">
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="Food pattern"
          fill
          className="absolute inset-0 object-cover opacity-10"
        />
        <div className="container mx-auto relative z-10 px-4 text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Discover Restaurants Near You</h1>
          <p className="text-white/90 text-lg">Find and order from the best local spots</p>

          {/* Search + Location */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 max-w-3xl mx-auto bg-white p-4 rounded-xl shadow">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-10 py-2 rounded-md focus:ring-primary-500 border"
              />
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for cuisine or restaurant"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-10 py-2 rounded-md focus:ring-primary-500 border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 ">
        <div className="container mx-auto flex flex-wrap justify-center gap-4">
          {Object.keys(categoryIcons).map((category) => (
            <button
              key={category}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  search: category === "All" ? "" : category,
                }))
              }
              className="flex items-center dark:text-primary-500 gap-2 px-4 py-2 rounded-full border hover:bg-primary-50 transition"
            >
              {categoryIcons[category]}
              <span className="text-sm">{category}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full lg:w-1/4 space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between bg-primary-600 text-white px-4 py-2 rounded-t-md">
              <h3 className="text-lg font-medium">Filters</h3>
              <Filter className="h-5 w-5" />
            </div>
            <div className="p-4 space-y-4">
              {/* Cuisine Filter */}
              <div>
                <h4 className="font-semibold mb-2">Cuisine</h4>
                {cuisines.map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.cuisine.includes(cuisine)}
                      onChange={() => toggleFilter("cuisine", cuisine)}
                      className="accent-primary-600"
                    />
                    <label>{cuisine}</label>
                  </div>
                ))}
              </div>
              <hr />
              {/* Dietary Filter */}
              <div>
                <h4 className="font-semibold mb-2">Dietary</h4>
                {dietaryOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.dietary.includes(option)}
                      onChange={() => toggleFilter("dietary", option)}
                      className="accent-primary-600"
                    />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setFilters({ cuisine: [], dietary: [], search: "", location: "", sort: "a-z" })}
                className="btn btn-primary w-full mt-4"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Restaurants */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Restaurants</h2>
            <button onClick={handleSortToggle} className="btn btn-outline rounded-full flex items-center gap-2 text-sm">
              {filters.sort === "a-z" ? "A-Z" : "Z-A"} <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : restaurants.length === 0 ? (
            <p className="text-gray-500">No restaurants found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restaurants.map((restaurant) => (
                <div key={restaurant._id} className="rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={restaurant.banners || "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                      alt={restaurant.hotelName}
                      fill
                      className="object-cover"
                    />
                    {restaurant.isFeatured && (
                      <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    <span className="absolute top-2 right-2 bg-white text-sm px-2 rounded shadow">
                      {restaurant.ordersCount}
                    </span>
                    <span className="absolute bottom-2 right-2 bg-white text-sm px-2 rounded shadow flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {restaurant.opentime}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-bold">{restaurant.hotelName}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        <Star className="h-4 w-4" />
                        {restaurant.rating}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {restaurant.categoriesprovider.map((tag: any, i: number) => (
                        <span key={i} className="text-xs border px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/restaurants/${restaurant._id}`}
                      className="btn btn-outline w-full"
                    >
                      View Menu
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </section>

      <Footer />
    </div>
  );
}


