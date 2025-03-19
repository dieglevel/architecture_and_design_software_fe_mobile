import { api } from "../libs/axios/axios.config"; // Import instance đã cấu hình
import { AxiosResponse } from "../types/axios/Response";

export interface Tour {
	tourId: string;
	name: string;
	description: string;
	price: number;
	thumbnail: string;
	duration: string;
	tourDestinationResponses: { name: string | null; description: string | null; image: string; active: boolean }[];
	tourImageResponses: any[];
	active: boolean;
}

export interface GetToursResponse {
	statusCode: number;
	message: string;
	success: boolean;
	data: Tour[];
}

export const getTours = async (): Promise<AxiosResponse<GetToursResponse>> => {
	try {
		const response = await api.get<AxiosResponse<GetToursResponse>>("/booking-service/tours", {
			validateStatus: (status) => status < 400, // Chấp nhận tất cả mã < 400 vì server trả về 302 có data
		});
		return response.data;
	} catch (error: any) {
		return {
			data: null,
			statusCode: error.response?.status || 500,
			message: error.response?.data?.message || "Đã xảy ra lỗi khi tải danh sách tour",
		};
	}
};
