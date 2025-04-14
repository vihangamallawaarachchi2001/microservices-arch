"use dom";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ShoppingCart, ChevronLeft, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCartItems, clearCart, removeFromCart } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";
import '../../global.css'

const CartPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  // State for cart items, loading, and selected items
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // Tracks selected item indices

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }

    const loadCart = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items || []);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isLoggedIn]);

  // Handle checkbox toggle
  const handleToggleItem = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((itemIndex) => itemIndex !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  // Calculate total price of selected items
  const calculateTotal = () => {
    return selectedItems.reduce((sum, index) => sum + cartItems[index].price, 0);
  };

  // Handle checkout
  const handleCheckout = () => {
    const selectedCartItems = selectedItems.map((index) => cartItems[index]);
    const encodedItems = encodeURIComponent(JSON.stringify(selectedCartItems));
    // router.push(`/checkout?items=${encodedItems}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center min-h-screen bg-gray-100 p-4">
      {/* Main Container */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[1366px] mx-auto">
        {/* Back Button */}
        <Button onClick={() => router.back()} className="mb-4">
          <ChevronLeft /> Back
        </Button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Your Cart</h2>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedItems.includes(index)}
                  onChange={() => handleToggleItem(index)}
                  className="mr-4 h-5 w-5 accent-orange-500"
                />

                {/* Item Details */}
                <div className="flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                </div>

                {/* Remove Button */}
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

            {/* Total Price */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-800">Total:</p>
              <p className="text-xl font-bold text-orange-500">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
          disabled={selectedItems.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;