import axios from "axios";

export const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
	timeout: 5000,
	headers: { "Content-Type": "application/json" },
});

export const setAccessToken = (token: string | null) => {
	api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

api.interceptors.request.use(
	(config) => {
		const token = api.defaults.headers.common["Authorization"];
		if (token) {
			config.headers["Authorization"] = token;
		}
		return config;
	},
	(error) => {
		if (error.response?.status === 401) {
			console.log("\x1b[41m Axios\x1b[0m \x1b[31m \x1b[0m");
		}
		if (axios.isAxiosError(error)) {
		}
		console.log("Error in request interceptor", error);
		console.error("Error URL:", error.config?.url);
		console.log("Request Method:", error.config?.method);
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => response, // Trả về response nếu thành công
	(error) => {
		if (axios.isAxiosError(error)) {
			console.log("\x1b[41m Axios \x1b[0m \x1b[31m \x1b[0m", error.config?.url);
		} else {
			console.log("Unknown Error:", error);
		}
		return Promise.reject(error); // Trả về lỗi để xử lý thêm nếu cần
	},
);

// axios.interceptors.response.use(
// 	(response) => response, // Trả về response nếu thành công
// 	(error) => {
// 		if (axios.isAxiosError(error)) {
// 			console.log("\x1b[41m Axios \x1b[0m \x1b[31m \x1b[0m", error.config?.url);
// 		} else {
// 			console.log("Unknown Error:", error);
// 		}
// 		return Promise.reject(error); // Trả về lỗi để xử lý thêm nếu cần
// 	},
// );
