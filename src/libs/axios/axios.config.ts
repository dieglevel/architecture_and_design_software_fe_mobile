import { BaseResponse } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AsyncStorageKey } from "../async-storage";
import { useNavigation } from "@react-navigation/native";
import { eventEmitter } from "../eventemitter3";
import { navigate, push, reset } from "../navigation/navigationService";

export const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
	timeout: 5000,
	headers: { "Content-Type": "application/json" },
});

// Interceptor trước khi gửi request
api.interceptors.request.use(
	async (config) => {
		// Lấy token từ AsyncStorage
		const token = await AsyncStorage.getItem(AsyncStorageKey.TOKEN);
		if (token) {
			// Thêm token vào header của request
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

// Interceptor xử lý lỗi
api.interceptors.response.use(
	(response) => response,
	(error) => {
		const errorResponse = error.response.data as BaseResponse<null>;
		if ((errorResponse.statusCode === 401 &&  error.config?.url !== "user-service/auth/token")) {
			Toast.show({
				type: "error",
				text1: errorResponse.message || "Đã xảy ra lỗi",
			});

			AsyncStorage.removeItem(AsyncStorageKey.TOKEN);
			eventEmitter.emit("logout"); // Gửi sự kiện logout
		} else if (errorResponse.statusCode === 401 &&  error.config?.url === "user-service/auth/token"){
			Toast.show({
				type: "error",
				text1: errorResponse.message || "Đã xảy ra lỗi",
			});
		}
		else{
			console.error("⛔ Axios: ", error.status + " - " + error.config?.url);

		}
		return Promise.reject(error);
	},
);
