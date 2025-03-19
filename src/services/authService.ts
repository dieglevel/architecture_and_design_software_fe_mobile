import { api } from "../libs/axios/axios.config"; // Import instance đã cấu hình
import { AxiosResponse } from "../types/axios/Response";

export interface LoginPayload {
	username: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	// refreshToken: string;
	// user: {
	// 	id: string;
	// 	name: string;
	// 	phone: string;
	// 	email?: string;
	// };
}

export interface RegisterPayload {
	fullName: string;
	email: string;
	phone: string;
	username: string;
	password: string;
	role?: "USER";
}

export interface RegisterResponse {
	statusCode: number;
	message: string;
	success: boolean;
	data: {
		email: string;
		phone: string;
		username: string;
		fullName: string;
		role: string;
		userId: string;
	};
}

export const login = async (payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> => {
	try {
		console.log("🔍 EXPO_PUBLIC_BACKEND_URL:", process.env.EXPO_PUBLIC_BACKEND_URL);

		const response = await api.post<AxiosResponse<LoginResponse>>("/user-service/auth/token", payload);
		return response.data;
	} catch (error: any) {
		return {
			data: null,
			statusCode: error.response?.status || 500,
			message: error.response?.data?.message || "Đã xảy ra lỗi",
		};
	}
};

export const register = async (payload: RegisterPayload): Promise<AxiosResponse<RegisterResponse>> => {
	try {
		const response = await api.post<AxiosResponse<RegisterResponse>>("/user-service/users/register", {
			...payload,
			role: payload.role ?? "USER", // Set mặc định "USER" nếu không có role
		});
		return response.data;
	} catch (error: any) {
		return {
			data: null,
			statusCode: error.response?.status || 500,
			message: error.response?.data?.message || "Đã xảy ra lỗi",
		};
	}
};
