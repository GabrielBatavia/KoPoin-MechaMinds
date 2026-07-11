import { Platform } from "react-native";

const localApiBaseUrl = Platform.select({
  android: "http://10.0.2.2:8080",
  ios: "http://localhost:8080",
  default: "http://localhost:8080",
});

export const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || localApiBaseUrl || "http://localhost:8080").replace(
  /\/$/,
  "",
);

export const API_ROOT_URL = `${API_BASE_URL}/api/v1`;
export const MOBILE_API_BASE_URL = `${API_ROOT_URL}/mobile`;
