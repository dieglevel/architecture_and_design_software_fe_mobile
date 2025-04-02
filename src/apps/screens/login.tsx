import { Press, SafeAreaView } from "@/apps/components";
import { Button, InputForm } from "@/apps/components/ui";
import { Close, Eye, EyeOff } from "@/assets/svgs";
import { Colors, Texts } from "@/constants";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { loginApi } from "@/services/auth-service";
import { BaseResponse } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/libs/async-storage";
import { navigate } from "@/libs/navigation/navigationService";
import { StackRouterOptions, useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {

	const [username, setUsername] = useState<string>("admin");
	const [password, setPassword] = useState<string>("admin");

	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

	const { height } = Dimensions.get("window");

	const handleLogin = async () => {
		try {
			const result = await loginApi(username, password);
			// handle success
			if (result.statusCode === 200) {
				Toast.show({
					type: "success",
					text1: "Đăng nhập thành công",
					visibilityTime: 2000,
					autoHide: true,
				});
				navigate("BottomTabScreenApp");
			}
		} catch (error) {
			const err = error as BaseResponse<any>;
			if (err.statusCode === 401) {
				Toast.show({
					type: "error",
					text1: "Đăng nhập thất bại",
					text2: "Tên đăng nhập hoặc mật khẩu không đúng",
					visibilityTime: 2000,
					autoHide: true,
				});
			} else if (err.statusCode === 500) {
				Toast.show({
					type: "error",
					text1: "Đăng nhập thất bại",
					text2: "Lỗi hệ thống, vui lòng thử lại sau",
					visibilityTime: 2000,
					autoHide: true,
				});
			}
			//Another Handle error
		}
	};

	useEffect(() => {
		const checkLogin = async () => {
			const token = await AsyncStorage.getItem(AsyncStorageKey.TOKEN);
			if (token) {
				navigate("BottomTabScreenApp");
			}
		};
		checkLogin();
	}, []);

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
						<Press onPress={() => navigate("ForgotPasswordScreen")}>
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
						<Press onPress={() => navigate("RegisterScreen")}>
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
