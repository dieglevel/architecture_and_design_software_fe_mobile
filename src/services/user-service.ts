import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config";
import { Gateway } from "@/libs/axios";
import { User } from "@/types/implement/user";
import { AxiosError } from "axios";

export const getProfile = async (): Promise<BaseResponse<User | null>> => {
	try {
		const response = await api.get<BaseResponse<User>>(`${Gateway.USER}/users/my-info`);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<BaseResponse<null>>;

		// Trường hợp có response từ server
		if (axiosError.response) {
			return axiosError.response.data;
		}

		// Trường hợp lỗi do network hoặc không có response
		return {
			message: "Không thể kết nối đến server",
			data: null,
			statusCode: 500,
			success: false,
		};
	}
};

export const updateAvatar = async (avatar: string): Promise<BaseResponse<User | null>> => {
	try {
		const response = await api.post<BaseResponse<User>>(`${Gateway.USER}/users/update-avatar`, { avatar });
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<BaseResponse<null>>;

		// Trường hợp có response từ server
		if (axiosError.response) {
			return axiosError.response.data;
		}

		// Trường hợp lỗi do network hoặc không có response
		return {
			message: "Không thể kết nối đến server",
			data: null,
			statusCode: 500,
			success: false,
		};
	}
};
