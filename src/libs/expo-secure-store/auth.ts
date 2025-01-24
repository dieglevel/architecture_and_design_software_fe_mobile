import * as SecureStore from "expo-secure-store";

const setAccessTokenSecure = async (token: string) => {
	await SecureStore.setItemAsync("accessToken", token);
};

const getAccessTokenSecure = async () => {
	const token: string | null = await SecureStore.getItemAsync("accessToken");
	return token;
};

export { getAccessTokenSecure, setAccessTokenSecure };

