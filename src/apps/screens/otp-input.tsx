import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	Alert,
} from "react-native";
import { SafeAreaView } from "@/apps/components";
import { Button } from "@/apps/components/ui";
import { OtpInput } from "@/apps/components/ui/otp-input";
import { Colors, Texts } from "@/constants";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { forgotPassword } from "@/services/user-service";
import { RootStackParamList } from "@/libs/navigation";

type OtpInputScreenRouteProp = RouteProp<RootStackParamList, "OtpInputScreen">;

export const OtpInputScreen = () => {
	const [otp, setOtp] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigation = useNavigation();
	const route = useRoute<OtpInputScreenRouteProp>();
	const { email } = route.params;
	const { height } = Dimensions.get("window");

	// Xử lý khi gửi lại OTP
	const handleResendOtp = async () => {
		setLoading(true);
		try {
			const response = await forgotPassword(email);
			if (response.success) {
				Alert.alert("Thành công", "Mã OTP mới đã được gửi đến email của bạn");
			} else {
				Alert.alert("Lỗi", response.message || "Không thể gửi lại mã OTP");
			}
		} catch (error) {
			Alert.alert("Lỗi", "Đã xảy ra lỗi khi gửi lại mã OTP");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	// Xử lý khi xác nhận OTP
	const handleVerifyOtp = () => {
		// Reset error
		setError("");

		// Kiểm tra OTP
		if (!otp || otp.length !== 6) {
			setError("Vui lòng nhập đủ 6 chữ số OTP");
			return;
		}

		// Chuyển đến màn hình đặt lại mật khẩu với email và OTP
		navigation.navigate("ResetPasswordScreen", {
			email,
			otp,
		});
	};

	return (
		<SafeAreaView>
			<ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 20 }}>
				<View style={{ flex: 1, justifyContent: "center", height: height, paddingVertical: 20 }}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.backButton}
					>
						<Ionicons
							name="arrow-back"
							size={24}
							color={Colors.colorBrand.midnightBlue[800]}
						/>
					</TouchableOpacity>

					<View style={styles.header}>
						<Text
							style={[
								Texts.bold24,
								{ color: Colors.colorBrand.midnightBlue[950], textAlign: "center" },
							]}
						>
							Xác minh tài khoản
						</Text>
						<Text
							style={[
								Texts.regular16,
								{ color: Colors.gray[500], textAlign: "center", marginTop: 8 },
							]}
						>
							Chúng tôi đã gửi mã xác minh đến email:
						</Text>
						<Text
							style={[
								Texts.regular16,
								{
									color: Colors.colorBrand.midnightBlue[800],
									fontWeight: "bold",
									textAlign: "center",
									marginTop: 4,
								},
							]}
						>
							{email}
						</Text>
					</View>

					<View style={styles.otpContainer}>
						<Text
							style={[
								Texts.bold16,
								{ color: Colors.colorBrand.midnightBlue[800], marginBottom: 10 },
							]}
						>
							Nhập mã OTP gồm 6 chữ số
						</Text>
						<OtpInput
							value={otp}
							onChange={setOtp}
							error={error}
							resendOtp={handleResendOtp}
							otpResendTime={60}
						/>
					</View>

					<Button
						style={{ marginTop: 30 }}
						onPress={handleVerifyOtp}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator
								color="#fff"
								size="small"
							/>
						) : (
							"Xác nhận"
						)}
					</Button>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	backButton: {
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		position: "absolute",
		left: 0,
		top: 50,
	},
	header: {
		marginBottom: 40,
	},
	otpContainer: {
		width: "100%",
	},
});
