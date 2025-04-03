import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config"; // Import instance đã cấu hình
import { Gateway } from "@/libs/axios";
import { Tour } from "@/types/implement";
import { User } from "@/types/implement/user";

export const getProfile = async (): Promise<BaseResponse<User>> => {
	try {
		const response = await api.get<BaseResponse<User>>(`${Gateway.USER}/users/my-info`);
		return response.data;
	} catch (e) {
		throw e as BaseResponse<null>;
	}
};
