"use dom";
import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import {
  Utensils,
  User,
  ShoppingCart,
  Loader2,
  Star,
  Edit,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getCartItems,
  getLoggedInStatus,
  removeFromCart,
} from "@/utils/storage";
import { addReview, deleteProfile, getOrders, getUserDetails } from "@/lib/api";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const UserProfile = () => {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>({});
  const [pastOrders, setPastOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onMountFunc = async () => {
    try {
      const stat = await getLoggedInStatus();
      setIsLoggedIn(stat);
      if (!stat) {
        router.push("/auth/login");
        return;
      }

      const res = await getUserDetails();
      if (res.status === 200) {
        setUser(res.data);
      }

      const cartItems = await getCartItems();
      setCart(cartItems || []);

      // TODO: Uncomment after implementing backend
      // const ordersRes = await getOrders();
      // if (ordersRes.status === 200) {
      //   setPastOrders(ordersRes.data);
      // } else if (ordersRes.status === 404) {
      setPastOrders([
        {
          orderDate: "2023-10-05T08:30:00Z",
          foodItems: [
            {
              name: "Pepperoni Pizza",
              image: "https://picsum.photos/id/1/200/300",
              quantity: 1,
            },
            {
              name: "Garlic Bread Sticks",
              image: "https://picsum.photos/id/2/200/300",
              quantity: 2,
            },
          ],
          orderPrice: 20.99,
          status: "Delivered",
        },
        {
          orderDate: "2023-09-20T12:15:00Z",
          foodItems: [
            {
              name: "Classic Burger",
              image: "https://picsum.photos/id/3/200/300",
              quantity: 2,
            },
            {
              name: "French Fries",
              image: "https://picsum.photos/id/4/200/300",
              quantity: 1,
            },
          ],
          orderPrice: 18.5,
          status: "Processing",
        },
        {
          orderDate: "2023-11-01T19:45:00Z",
          foodItems: [
            {
              name: "Sushi Platter",
              image: "https://picsum.photos/id/5/200/300",
              quantity: 1,
            },
            {
              name: "Miso Soup",
              image: "https://picsum.photos/id/6/200/300g",
              quantity: 2,
            },
          ],
          orderPrice: 34.75,
          status: "Delivered",
        },
        {
          orderDate: "2023-08-12T14:00:00Z",
          foodItems: [
            {
              name: "Margherita Pizza",
              image: "https://picsum.photos/id/7/200/300",
              quantity: 1,
            },
            {
              name: "Caesar Salad",
              image: "https://picsum.photos/id/8/200/300",
              quantity: 1,
            },
          ],
          orderPrice: 22.0,
          status: "Cancelled",
        },
        {
          orderDate: "2023-10-30T09:00:00Z",
          foodItems: [
            {
              name: "Blueberry Pancakes",
              image: "https://picsum.photos/id/1/200/300",
              quantity: 3,
            },
            {
              name: "Black Coffee",
              image: "https://picsum.photos/id/2/200/300",
              quantity: 2,
            },
          ],
          orderPrice: 15.25,
          status: "Out for Delivery",
        },
        {
          orderDate: "2023-07-15T13:20:00Z",
          foodItems: [
            {
              name: "Chicken Tacos",
              image: "https://picsum.photos/id/1/200/300",
              quantity: 4,
            },
            {
              name: "Guacamole",
              image: "https://picsum.photos/id/4/200/300",
              quantity: 1,
            },
          ],
          orderPrice: 28.5,
          status: "Delivered",
        },
        {
          orderDate: "2023-11-05T18:30:00Z",
          foodItems: [
            {
              name: "Pad Thai",
              image: "https://picsum.photos/id/6/200/300",
              quantity: 2,
            },
            {
              name: "Spring Rolls",
              image: "https://picsum.photos/id/4/200/300",
              quantity: 3,
            },
          ],
          orderPrice: 27.0,
          status: "Processing",
        },
        {
          orderDate: "2023-09-10T20:00:00Z",
          foodItems: [
            {
              name: "Chocolate Cake",
              image: "https://picsum.photos/id/1/200/300",
              quantity: 1,
            },
            {
              name: "Vanilla Ice Cream",
              image: "https://picsum.photos/id/9/200/300",
              quantity: 2,
            },
          ],
          orderPrice: 14.99,
          status: "Delivered",
        },
        {
          orderDate: "2023-10-22T11:45:00Z",
          foodItems: [
            {
              name: "Grilled Cheese Sandwich",
              image: "https://picsum.photos/id/1/200/300",
              quantity: 1,
            },
            {
              name: "Tomato Soup",
              image: "https://picsum.photos/id/5/200/300",
              quantity: 1,
            },
          ],
          orderPrice: 12.75,
          status: "Delivered",
        },
        {
          orderDate: "2023-11-04T17:10:00Z",
          foodItems: [
            {
              name: "Vegetable Stir-Fry",
              image: "https://picsum.photos/id/1/200/300",
              quantity: 1,
            },
            {
              name: "Fried Rice",
              image: "https://picsum.photos/id/1/200/3007",
              quantity: 2,
            },
          ],
          orderPrice: 21.5,
          status: "Processing",
        },
      ]);

      // }
    } catch (err: any) {
      console.error("Error fetching user data:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onMountFunc();
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
        <p className="text-gray-600 mt-4">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-auto overflow-scroll">
      <Navbar />
      <div className="flex flex-col min-h-screen mx-auto w-full">
        {/* Main Container */}
        <div className="flex flex-wrap gap-6 max-w-[1366px] mx-auto w-full  p-6 rounded-lg ">
          {/* Orders Section - Top Left */}
          <div className="w-full md:w-[48%] lg:w-[48%] p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-orange-500 mb-4">
              Order History
            </h2>
            {pastOrders.length === 0 ? (
              <p className="text-gray-500">No past orders found.</p>
            ) : (
              <div className="space-y-4">
                {pastOrders.map((order: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg flex flex-col"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">Order #{index + 1}</p>
                        <p className="text-sm text-gray-600">
                          Date: {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Total: ${order.orderPrice.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Status:{" "}
                          <span
                            className={`${
                              order.status === "Completed"
                                ? "text-green-500"
                                : "text-yellow-500"
                            }`}
                          >
                            {order.status}
                          </span>
                        </p>
                      </div>
                      <div>
                        {order.foodItems.map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center flex-row-reverse gap-2 mt-2"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 rounded-md object-cover"
                            />
                            <div>
                              <p className="text-sm">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {order.status === "Delivered" && (
                      <Button
                        variant="link"
                        className="text-orange-500 hover:text-orange-600 mt-2"
                        onClick={() => addReview(order)}
                      >
                        Add a Review
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="min-w-[400px] w-full md:w-[48%] lg:w-[48%] p-4 border rounded-lg">
            {/* Profile Section - Top Right */}
            <div className="w-full  p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-orange-500 mb-4">
                Profile
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar || "http://localhost:3000/dummy.png"}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.username}
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>

                {/* Addresses */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Addresses
                  </h3>
                  {user.address && user.address.length > 0 ? (
                    <ul className="space-y-2">
                      {user.address.map((addr: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <span>{addr}</span>
                          <button className="text-red-500 text-sm hover:underline">
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No addresses added yet.</p>
                  )}
                  <Button
                    variant="link"
                    className="text-orange-500 hover:text-orange-600"
                    onClick={() => router.push("/user/editProfile")}
                  >
                    Add New Address
                  </Button>
                </div>

                {/* Phone Number */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Contact Information
                  </h3>
                  <p className="text-gray-600">
                    Phone: {user.phoneNo || "Not provided"}
                  </p>
                </div>

                {/* Allergies */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Allergies
                  </h3>
                  {user.alergy && user.alergy.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {user.alergy.map((allergy: string, index: number) => (
                        <li
                          key={index}
                          className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                        >
                          {allergy}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No allergies listed.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Cart Section - Bottom Right */}
            <div className="w-full mt-4 p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-orange-500 mb-4">
                Your Cart
              </h2>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} | ${item.price}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-transparent"
                        onClick={() => removeFromCart(index)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/user/cart")}
                  >
                    Manage Cart
                  </Button>
                </div>
              )}
            </div>
            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <Button
                onClick={() => router.push(`/user/editProfile?user=${JSON.stringify(user)}`)}
                className="flex items-center gap-2"
              >
                <Edit size={16} /> Edit Profile
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/user/cart")}
              >
                <ShoppingCart size={16} /> View Cart
              </Button>
              <Button
              variant={"destructive"}
                onClick={() => deleteProfile()}
                className="flex items-center gap-2"
              >
                <Edit size={16} /> Delete Profile
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
