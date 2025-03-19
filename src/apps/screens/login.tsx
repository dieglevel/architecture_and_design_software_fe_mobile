import { Press, SafeAreaView } from "@/apps/components";
import { Button, InputForm } from "@/apps/components/ui";
import { Close, Eye, EyeOff } from "@/assets/svgs";
import { Colors, Texts } from "@/constants";
import { setAccessToken } from "@/libs/axios/axios.config";
import { navigate } from "@/libs/navigation/navigationService";
import { login } from "@/services/authService";
import { AxiosError } from "axios";
import { useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

export const LoginScreen = () => {
	const navigate = useNavigation();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

	const { height } = Dimensions.get("window");

	const handleLogin = async () => {
		try {
			const result = await login({ password, username });
			console.log("Login result:", result.data);

			if (result.statusCode === 200 && result.data) {
				await SecureStore.setItemAsync("accessToken", result.data.token); // Lưu token
				setAccessToken(result.data.token); // Set vào axios

				Toast.show({
					type: "success",
					text1: "✅ Thành công",
					text2: "Đăng nhập vào ứng dụng thành công!",
				});
				navigate("BottomTabScreenApp");
			} else {
				Toast.show({
					type: "error",
					text1: "❌ Thất bại",
					text2: result.message,
				});
			}
		} catch (error: unknown) {
			const err = error as AxiosError<{ message: string }>;
			Toast.show({
				type: "error",
				text1: "❌ Thất bại",
				text2: err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.",
			});
		}
	};

	return (
		<SafeAreaView>
			<Press style={{ position: "absolute", backgroundColor: "transpert", padding: 4, top: 40, right: 20 }}>
				<Close size={25} />
			</Press>
			<ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 10, gap: 10 }}>
				<View style={{ flex: 1, justifyContent: "center", height: height }}>
					<View style={{ marginVertical: 20 }}>
						<Text
							style={[
								Texts.bold24,
								{ color: Colors.colorBrand.midnightBlue[950], textAlign: "center" },
							]}
						>
							Đăng nhập
						</Text>
						<Text style={[Texts.regular16, { color: Colors.gray[500], textAlign: "center" }]}>
							Cùng V-Travel đồng hành với bạn trong các chuyến đi.
						</Text>
					</View>
					<InputForm
						label="Tên đăng nhập"
						value={username}
						onChangeText={setUsername}
						placeholder="Nhập tên đăng nhập"
						required
					/>
					<InputForm
						label="Mật khẩu"
						placeholder="Nhập mật khẩu"
						value={password}
						onChangeText={setPassword}
						secureTextEntry={!isShowPassword}
						right={isShowPassword ? <Eye /> : <EyeOff />}
						onRightPress={() => {
							setIsShowPassword(!isShowPassword);
						}}
						style={{ marginTop: 10 }}
						required
					/>
					<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
						<Press onPress={() => navigate.navigate("ForgotPasswordScreen")}>
							<Text
								style={[
									Texts.regular16,
									{
										color: Colors.colorBrand.burntSienna[500],
										textAlign: "right",
										marginTop: 8,
									},
								]}
							>
								Quên mật khẩu?
							</Text>
						</Press>
					</View>

					<Button
						style={{ marginTop: 8 }}
						onPress={() => {
							handleLogin();
						}}
					>
						Đăng nhập
					</Button>

					<View style={{ flexDirection: "row", justifyContent: "center", gap: 4, marginTop: 16 }}>
						<Text style={[Texts.regular16, { color: Colors.gray[500] }]}>Bạn chưa có tài khoản?</Text>
						<Press onPress={() => navigate.navigate("RegisterScreen")}>
							<Text style={[Texts.regular16, { color: Colors.colorBrand.burntSienna[500] }]}>
								Đăng ký
							</Text>
						</Press>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
