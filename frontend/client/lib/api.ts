import axios from "axios";
import { Platform } from "react-native";
import Cookies from "js-cookie";

const CookieManager =
  Platform.OS !== "web"
    ? require("@react-native-cookies/cookies").default
    : null;

export const api = axios.create({
  baseURL:
    Platform.OS === "ios" || Platform.OS === "android"
      ? "http://192.168.8.115:3000/api"
      : "http://localhost:3000/api",
  withCredentials: true,
});

export const getCookies = async () => {
  if (Platform.OS === "web") {
    const sessionCookie = Cookies.get("session");
    return sessionCookie ? `session=${sessionCookie}` : "";
  } else {
    const cookies = await CookieManager.get("http://192.168.8.115:3000");
    return cookies.session ? `session=${cookies.session.value}` : "";
  }
};

const setCookies = async (cookieValue: string) => {
  if (Platform.OS === "web") {
    Cookies.set("session", cookieValue, { expires: 1 });
  } else {
    await CookieManager.set("http://192.168.8.115:3000", {
      name: "session",
      value: cookieValue,
      domain: "192.168.8.115", 
      path: "/",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      secure: false,
    });
  }
};

api.interceptors.response.use(
  async (response) => {
    if (response.headers["set-cookie"]) {
      const sessionCookie = response.headers["set-cookie"][0]
        .split(";")[0]
        .replace("session=", "");
      await setCookies(sessionCookie);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  async (config) => {
    const cookies = await getCookies();
    if (cookies) {
      config.headers.Cookie = cookies;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (formData: any) => {
  return api.post("/auth/login", formData);
};

export const register = async (formData: any) => {
  return api.post("/auth/register", formData);
};

export const activateAccount = async (email: string, otp: string) => {
  return api.post("/auth/activate-account", { email, otp });
};

export const resendOTP = async (email: string) => {
  return api.post("/auth/resend-otp", { email });
};

export const forgotPassword = async (email: string) => {
  return api.post("/auth/forgot-password", { email }); 
};

export const resetPassword = async (email: string, otp: string, password: string) => {
  return api.post("/auth/reset-password", { email, otp, password });
};

export const validateSession = async () => {
  try {
    const res = await api.get("/auth/validate-session");
    return res.status === 200; 
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log(error); 
    }
    return false;
  }
};