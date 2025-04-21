import { BaseResponse } from "@/types";
import { api } from "../libs/axios/axios.config"; // Import instance đã cấu hình
import { Gateway } from "@/libs/axios";
import { Auth } from "@/types/implement";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/libs/async-storage";
import axios from "axios";

export const loginApi = async (username: string, password: string) => {
	try {
		const response = await api.post<BaseResponse<Auth>>(`${Gateway.USER}/auth/token`, { username, password });

		const { data, statusCode } = response.data;
		if (statusCode === 200) {
			AsyncStorage.setItem(AsyncStorageKey.TOKEN, data?.token || "");
		}
		return response.data;
	} catch (e) {
		throw e as BaseResponse<null>;
	}
};



export const registerApi = async (
	fullName: string,
	email: string,
	phone: string,
	username: string,
	password: string,
) => {
	try {

		const response = await api.post<BaseResponse<null>>(`${Gateway.USER}/users/register`, {
			fullName,
			email,
			phone,
			username,
			password,
			role: "USER"
		});

		return response.data;
	} catch (e) {
		console.log(JSON.stringify(e));
		throw e as BaseResponse<null>;

	}
};