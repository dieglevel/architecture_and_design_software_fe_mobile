import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config";
import { Gateway } from "@/libs/axios";
import { AxiosError } from "axios";
import { Tour } from "@/types/implement/tour";

export const getCategory = async (): Promise<BaseResponse<any[] | null>> => {
	try {
		const response = await api.get<BaseResponse<any[]>>(`${Gateway.BOOKING}/category-tours`);
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

export const searchFullText = async (keyword: string): Promise<BaseResponse<Tour[]>> => {
	try {
		const response = await api.get<BaseResponse<Tour[]>>(`${Gateway.BOOKING}/tours/search/${keyword}`);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<BaseResponse<null>>;
		// Nếu lỗi là "không tìm thấy kết quả" (thường là 404), xử lý như là tìm kiếm thành công nhưng không có kết quả
		if (axiosError.response && axiosError.response.status === 404) {
			return {
				message: "Không tìm thấy kết quả",
				data: [], // Trả về mảng rỗng thay vì null
				statusCode: 200, // Đổi status code thành 200
				success: true, // Đánh dấu thành công để không hiển thị lỗi
			};
		}

		// Các lỗi khác
		if (axiosError.response) {
			// Chuyển data từ null thành mảng rỗng để tránh lỗi
			return {
				...axiosError.response.data,
				data: [],
				success: true,
			};
		}

		// Lỗi mạng hoặc không có response
		return {
			message: "Không thể kết nối đến server",
			data: [], // Trả về mảng rỗng thay vì null
			statusCode: 500,
			success: true,
		};
	}
};
  