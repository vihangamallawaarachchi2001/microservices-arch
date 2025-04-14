import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { Platform } from "react-native";

const STORAGE_KEY = "isLoggedIn";
const CART_STORAGE_KEY = "cartItems";

export const getLoggedInStatus = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } else {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return value === "true";
  }
};

export const setLoggedInStatus = async (status: boolean) => {
  const value = status.toString();
  if (Platform.OS === "web") {
    localStorage.setItem(STORAGE_KEY, value);
  } else {
    await AsyncStorage.setItem(STORAGE_KEY, value);
  }
};

export const getCartItems = async () => {
  try {
    if (Platform.OS === "web") {
      const cart = localStorage.getItem(CART_STORAGE_KEY);
      return cart ? JSON.parse(cart) : [];
    } else {
      const cart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      return cart ? JSON.parse(cart) : [];
    }
  } catch (error) {
    console.error("Failed to get cart items:", error);
    return [];
  }
};

export const addToCart = async (item: any) => {
  try {
    const currentItems = await getCartItems();
    const newItems = [...currentItems, item];
    if (Platform.OS === "web") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    } else {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    }
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
};

export const removeFromCart = async (index: number) => {
  try {
    const currentItems = await getCartItems();
    currentItems.splice(index, 1);
    if (Platform.OS === "web") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentItems));
    } else {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentItems));
    }
  } catch (error) {
    console.error("Failed to remove from cart:", error);
  }
};

export const clearCart = async () => {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem(CART_STORAGE_KEY);
    } else {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
    }
  } catch (error) {
    console.error("Failed to clear cart:", error);
  }
};