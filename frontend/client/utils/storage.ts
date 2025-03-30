
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "isLoggedIn";

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