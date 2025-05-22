import { AsyncStorageKey } from "@/libs/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
	sub?: string;
	user_id?: string;
	id?: string;
	exp?: number;
}

const getUserIdFromToken = async (): Promise<string | null> => {
	try {
		const token = await AsyncStorage.getItem(AsyncStorageKey.TOKEN);
		if (!token) return null;

		const { sub, user_id, id, exp } = jwtDecode<TokenPayload>(token);

		// Kiểm tra token hết hạn
		if (exp && exp < Math.floor(Date.now() / 1000)) return null;

		// Ưu tiên sub, user_id, hoặc id
		return sub || user_id || id || null;
	} catch (error) {
		console.error("Lỗi giải mã token:", error);
		return null;
	}
};

export default getUserIdFromToken;
