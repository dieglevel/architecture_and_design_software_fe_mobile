import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config";
import { Gateway } from "@/libs/axios";
import { AxiosError } from "axios";
import { Tour } from "@/types/implement/tour";
import { TourHistoryItem } from "@/types/implement/tour-history";
import { FavoriteTourItem } from "@/types/implement/tour-favorite";
import { safeApiCall } from "@/libs/axios/safe-api-call";
import { Category } from "@/types/implement/category";
import { Booking, BookingRequest } from "@/types/implement/booking";

export const getCategory = async (): Promise<BaseResponse<Category[] | null>> => {
	// return safeApiCall(() => api.get<BaseResponse<Category[] | null>>(`${Gateway.BOOKING}/category-tours`), []);
	const a = await safeApiCall(() => api.get<BaseResponse<any>>(`${Gateway.BOOKING}/category-tours`), []);
	const b = await api.get<BaseResponse<any>>(`${Gateway.BOOKING}/category-tours`);
	return a

};

export const getToursByCategory = async (categoryId: string) => {
	return safeApiCall(() => api.get<BaseResponse<Tour[]>>(`${Gateway.BOOKING}/tours/${categoryId}/tours`), []);
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

export const createBooking = async (data: BookingRequest) => {
	try {
		const response = await api.post<BaseResponse<Booking>>(`${Gateway.BOOKING}/books/create-booking`, data)
		if (response.data.statusCode === 200) {
			return response.data.data;
		}
	} catch (e) {
		throw e as BaseResponse<null>;
	}
}

export const paymentUrlAmount = async (amount: number, bookingId: string) => {
	try {
		const response = await api.post<BaseResponse<string>>(`${Gateway.BOOKING}/vnpay/create-payment-url?amount=${amount}&bankCode=NCB&bookingId=${bookingId}`)
		if (response.data.success) {
			return response.data.data;
		}
	} catch (e) {
		throw e as BaseResponse<null>;
	}
}

export const getMyBooking = async () => {
	try {
		const response = await api.get<BaseResponse<Booking[]>>(`${Gateway.BOOKING}/books/my-bookings`)
		if (response.data.statusCode === 200) {
			return response.data.data;
		}
	} catch (e) {
		throw e as BaseResponse<null>;
	}
}
