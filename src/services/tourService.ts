import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config"; // Import instance đã cấu hình
import { Gateway } from "@/libs/axios";
import { Auth, Tour } from "@/types/implement";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/libs/async-storage";

export const getTours = async (): Promise<BaseResponse<Tour>> => {
	try {
		const response = await api.get<BaseResponse<Tour>>(`${Gateway.BOOKING}/tours`, {
			validateStatus: (status) => status < 400, // Chấp nhận tất cả mã < 400 vì server trả về 302 có data
		});
		return response.data;
	} catch (e) {
		throw e as BaseResponse<null>;
	}
};
