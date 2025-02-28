import { api } from "../libs/axios/axios.config"; // Import instance đã cấu hình
import { AxiosResponse } from "../types/axios/Response";

export interface LoginPayload {
	username: string;
	password: string;
}

export interface LoginResponse {
	accessToken: string;
	// refreshToken: string;
	// user: {
	// 	id: string;
	// 	name: string;
	// 	phone: string;
	// 	email?: string;
	// };
}

export const login = async (payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> => {
	try {
		console.log("🔍 EXPO_PUBLIC_BACKEND_URL:", process.env.EXPO_PUBLIC_BACKEND_URL);

		const response = await api.post<AxiosResponse<LoginResponse>>(
			"/user-service/auth/token", // Không cần URL đầy đủ
			payload,
		);
		return response.data;
	} catch (error: any) {
		return {
			data: null,
			statusCode: error.response?.status || 500,
			message: error.response?.data?.message || "Đã xảy ra lỗi",
		};
	}
};
