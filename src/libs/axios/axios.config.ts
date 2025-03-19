import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
	timeout: 5000,
	headers: { "Content-Type": "application/json" },
	maxRedirects: 5,
});

// Biến lưu token trong bộ nhớ để tránh gọi SecureStore nhiều lần
let accessToken: string | null = null;

// Hàm này sẽ được gọi khi app mở lại để load token vào axios
export const loadAccessToken = async () => {
	accessToken = await SecureStore.getItemAsync("accessToken");
	if (accessToken) {
		api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
		console.log("🔑 Token Loaded:", accessToken);
	}
};

// Hàm này để cập nhật token khi login hoặc logout
export const setAccessToken = async (token: string | null) => {
	if (token) {
		accessToken = token;
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		await SecureStore.setItemAsync("accessToken", token); // Lưu token
	} else {
		accessToken = null;
		delete api.defaults.headers.common["Authorization"];
		await SecureStore.deleteItemAsync("accessToken"); // Xóa token khi logout
	}
};

// Interceptor đảm bảo mọi request có token
api.interceptors.request.use(
	(config) => {
		if (accessToken) {
			config.headers["Authorization"] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error)) {
			console.error("🚨 Axios Error:", error.config?.url, error.response?.status);
		} else {
			console.error("Unknown Error:", error);
		}
		return Promise.reject(error);
	},
);