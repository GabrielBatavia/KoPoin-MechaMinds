import { Platform } from "react-native";

const localApiBaseUrl = Platform.select({
  android: "https://kopoin-server.vercel.app",
  ios: "https://kopoin-server.vercel.app",
  default: "https://kopoin-server.vercel.app",
});

export const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || localApiBaseUrl || "https://kopoin-server.vercel.app").replace(
  /\/$/,
  "",
);

export const API_ROOT_URL = `${API_BASE_URL}/api/v1`;
export const MOBILE_API_BASE_URL = `${API_ROOT_URL}/mobile`;
