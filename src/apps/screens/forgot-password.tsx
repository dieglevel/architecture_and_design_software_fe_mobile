import { Press, SafeAreaView } from "@/apps/components";
import { Button, InputForm } from "@/apps/components/ui";
import { Close } from "@/assets/svgs";
import { Colors, Texts } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, ScrollView, Text, View, Alert, ActivityIndicator } from "react-native";
import { forgotPassword } from "@/services/user-service";
import axios from "axios";
import { Gateway } from "@/libs/axios";
import Toast from "react-native-toast-message";

export const ForgotPasswordScreen = () => {
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const navigation = useNavigation();

	const { height } = Dimensions.get("window");

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleForgotPassword = async () => {
		// Reset error
		setError("");

		// Validate email
		if (!email.trim()) {
			setError("Vui lòng nhập địa chỉ email");
			return;
		}

		if (!validateEmail(email)) {
			setError("Email không hợp lệ");
			return;
		}

		// Call API
		setLoading(true);
		try {
			const response = await forgotPassword(email);

			console.log("email:", email);

			console.log("Response:", response);

			if (response.success) {
				Toast.show({
					type: "success",
					text1: "Thành công",
					text2: "Mã OTP đã được gửi đến email của bạn!",
				});
				setTimeout(() => {
					navigation.navigate("OtpInputScreen", { email });
				}, 1000);
			} else {
				setError(response.message || "Không thể gửi yêu cầu lấy lại mật khẩu");
			}
		} catch (error) {
			setError("Đã xảy ra lỗi. Vui lòng thử lại sau");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView>
			<ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 10, gap: 10 }}>
				<View style={{ flex: 1, justifyContent: "center", height: height }}>
					<View style={{ marginVertical: 20 }}>
						<Text
							style={[
								Texts.bold24,
								{ color: Colors.colorBrand.midnightBlue[950], textAlign: "center" },
							]}
						>
							Quên mật khẩu?
						</Text>
						<Text style={[Texts.regular16, { color: Colors.gray[500], textAlign: "center" }]}>
							Đừng lo chúng tôi sẽ giúp bạn khôi phục tài khoản.
						</Text>
					</View>
					<InputForm
						label="Địa chỉ email"
						value={email}
						onChangeText={setEmail}
						placeholder="Nhập địa chỉ email của bạn"
						required
						error={error}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					<Button
						style={{ marginTop: 8 }}
						onPress={handleForgotPassword}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator
								color="#fff"
								size="small"
							/>
						) : (
							"Gửi mã OTP"
						)}
					</Button>

					<View style={{ flexDirection: "row", justifyContent: "center", gap: 4, marginTop: 16 }}>
						<Text style={[Texts.regular16, { color: Colors.gray[500] }]}>Hoặc</Text>
						<Press onPress={() => navigation.navigate("RegisterScreen")}>
							<Text style={[Texts.regular16, { color: Colors.colorBrand.burntSienna[500] }]}>
								Tạo tài khoản mới
							</Text>
						</Press>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
