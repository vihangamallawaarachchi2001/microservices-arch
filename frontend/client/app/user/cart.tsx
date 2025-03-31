"use dom";
import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCartItems, clearCart, removeFromCart } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";

const CartPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleCheckout = async () => {
    // Implement checkout logic here
    await clearCart();
    //router.push("/checkout/success");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <Button onClick={() => router.back()} className="mb-4">
          <ChevronLeft /> Back
        </Button>
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Your Cart</h2>
        
        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between p-4 border rounded-lg">
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
                <Button onClick={() => removeFromCart(index)}>Remove</Button>
              </div>
            ))}
            <div className="flex justify-end">
              <p className="font-semibold">
                Total: ${cartItems.reduce((sum, item) => sum + item.price, 0)}
              </p>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          className="w-full mt-4 bg-primary text-white"
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;