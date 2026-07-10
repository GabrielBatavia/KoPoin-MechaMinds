import axios from "axios";

const API_BASE_URL = process.env.NSERVER_API || "http://localhost:8080";

const getLocal = (key: string) =>
  typeof window !== "undefined" ? localStorage.getItem(key) : null;
const setLocal = (key: string, val: string) =>
  typeof window !== "undefined" && localStorage.setItem(key, val);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getLocal("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) =>
    res.data?.success
      ? res.data.data !== undefined
        ? res.data.data
        : res.data
      : res,
  async (err) => {
    const req = err.config;
    const isLogin = req.url?.includes("/auth/login");

    if (err.response?.status === 401 && !req._retry && !isLogin) {
      req._retry = true;
      const refreshToken = getLocal("refreshToken");
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, {
            refresh_token: refreshToken,
          });
          if (res.data?.success && res.data?.data) {
            const { access_token, refresh_token } = res.data.data;
            setLocal("token", access_token);
            if (refresh_token) setLocal("refreshToken", refresh_token);
            req.headers.Authorization = `Bearer ${access_token}`;
            return axios(req);
          }
        } catch {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }
        }
      }
    }
    return Promise.reject(
      new Error(err.response?.data?.error?.message || err.message),
    );
  },
);
