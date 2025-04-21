import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config";
import { Gateway } from "@/libs/axios";
import { AxiosError } from "axios";
import { Tour } from "@/types/implement/tour";
import { TourHistoryItem } from "@/types/implement/tour-history";
import { FavoriteTourItem } from "@/types/implement/tour-favorite";
import { safeApiCall } from "@/libs/axios/safe-api-call";

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

export const searchFullText = async (keyword: string) => {
	return safeApiCall(() => api.get<BaseResponse<Tour[]>>(`${Gateway.BOOKING}/tours/search/${keyword}`), []);
};

export const getHistoryTours = async (userId: string) => {
	return safeApiCall(() => api.get<BaseResponse<TourHistoryItem[]>>(`${Gateway.BOOKING}/history/${userId}`), []);
};

export const addHistoryTour = async (userId: string, tourId: string) => {
	return safeApiCall(
		() => api.post<BaseResponse<TourHistoryItem[]>>(`${Gateway.BOOKING}/history`, { userId, tourId }),
		[],
	);
};

export const getFavoriteTours = async (userId: string) => {
	return safeApiCall(() => api.get<BaseResponse<FavoriteTourItem[]>>(`${Gateway.BOOKING}/favorites/${userId}`), []);
};

export const addFavoriteTour = async (userId: string, tourId: string) => {
	return safeApiCall(
		() => api.post<BaseResponse<FavoriteTourItem[]>>(`${Gateway.BOOKING}/favorites`, { userId, tourId }),
		[],
	);
};

export const deleteFavoriteTour = async (userId: string, tourId: string) => {
	return safeApiCall(
		() => api.delete<BaseResponse<FavoriteTourItem[]>>(`${Gateway.BOOKING}/favorites/${userId}/${tourId}`),
		[],
	);
};
