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
import { Button, InputForm } from "@/apps/components/ui";
import { Colors, Texts } from "@/constants";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { resetPassword } from "@/services/user-service";
import { RootStackParamList } from "@/libs/navigation";
import Toast from "react-native-toast-message";

type ResetPasswordScreenRouteProp = RouteProp<RootStackParamList, "ResetPasswordScreen">;

export const ResetPasswordScreen = () => {
	const [newPassword, setNewPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [newPasswordError, setNewPasswordError] = useState<string>("");
	const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

	const navigation = useNavigation();
	const route = useRoute<ResetPasswordScreenRouteProp>();
	const { email, otp } = route.params;
	const { height } = Dimensions.get("window");

	// Kiểm tra mật khẩu mới
	const validateNewPassword = (password: string) => {
		if (!password) {
			setNewPasswordError("Vui lòng nhập mật khẩu mới");
			return false;
		}

		if (password.length < 8) {
			setNewPasswordError("Mật khẩu phải có ít nhất 8 ký tự");
			return false;
		}

		if (!/[A-Z]/.test(password)) {
			setNewPasswordError("Mật khẩu phải có ít nhất 1 ký tự viết hoa");
			return false;
		}

		if (!/[a-z]/.test(password)) {
			setNewPasswordError("Mật khẩu phải có ít nhất 1 ký tự viết thường");
			return false;
		}

		if (!/[0-9]/.test(password)) {
			setNewPasswordError("Mật khẩu phải có ít nhất 1 chữ số");
			return false;
		}

		if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			setNewPasswordError("Mật khẩu phải có ít nhất 1 ký tự đặc biệt");
			return false;
		}

		setNewPasswordError("");
		return true;
	};

	// Kiểm tra xác nhận mật khẩu
	const validateConfirmPassword = (password: string) => {
		if (!password) {
			setConfirmPasswordError("Vui lòng xác nhận mật khẩu");
			return false;
		}

		if (password !== newPassword) {
			setConfirmPasswordError("Xác nhận mật khẩu không khớp");
			return false;
		}

		setConfirmPasswordError("");
		return true;
	};

	// Xử lý đặt lại mật khẩu
	const handleResetPassword = async () => {
		// Kiểm tra dữ liệu
		const isNewPasswordValid = validateNewPassword(newPassword);
		const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

		if (!isNewPasswordValid || !isConfirmPasswordValid) {
			return;
		}

		// Gọi API đặt lại mật khẩu
		setLoading(true);
		try {
			const response = await resetPassword(email, otp, newPassword);

			if (response.success) {
				Toast.show({
					type: "success",
					text1: "Thành công",
					text2: "Mật khẩu đã được đặt lại thành công. Bạn có thể đăng nhập bằng mật khẩu mới.",
				});
				setTimeout(() => {
					navigation.navigate("LoginScreen");
				}, 1000);
			} else {
				Toast.show({
					type: "error",
					text1: "Lỗi",
					text2: response.message || "Không thể đặt lại mật khẩu",
				});
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Lỗi",
				text2: "Đã xảy ra lỗi khi đặt lại mật khẩu",
			});
			console.error(error);
		} finally {
			setLoading(false);
		}
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
							Đặt lại mật khẩu
						</Text>
						<Text
							style={[
								Texts.regular16,
								{ color: Colors.gray[500], textAlign: "center", marginTop: 8 },
							]}
						>
							Tạo mật khẩu mới cho tài khoản của bạn
						</Text>
					</View>

					<InputForm
						label="Mật khẩu mới"
						value={newPassword}
						onChangeText={(text) => {
							setNewPassword(text);
							validateNewPassword(text);
						}}
						placeholder="Nhập mật khẩu mới"
						required
						error={newPasswordError}
						secureTextEntry={!showPassword}
						right={
							<Ionicons
								name={showPassword ? "eye-off-outline" : "eye-outline"}
								size={20}
								color={Colors.gray[500]}
							/>
						}
						onRightPress={() => setShowPassword(!showPassword)}
					/>

					<InputForm
						label="Xác nhận mật khẩu"
						value={confirmPassword}
						onChangeText={(text) => {
							setConfirmPassword(text);
							validateConfirmPassword(text);
						}}
						placeholder="Nhập lại mật khẩu mới"
						required
						error={confirmPasswordError}
						secureTextEntry={!showConfirmPassword}
						right={
							<Ionicons
								name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
								size={20}
								color={Colors.gray[500]}
							/>
						}
						onRightPress={() => setShowConfirmPassword(!showConfirmPassword)}
						style={{ marginTop: 16 }}
					/>

					<View style={styles.passwordRequirements}>
						<Text style={[Texts.regular14, { color: Colors.gray[600], marginBottom: 8 }]}>
							Mật khẩu phải có:
						</Text>
						<View style={styles.requirementItem}>
							<Ionicons
								name={newPassword.length >= 8 ? "checkmark-circle" : "ellipse-outline"}
								size={16}
								color={
									newPassword.length >= 8
										? Colors.colorBrand.burntSienna[500]
										: Colors.gray[400]
								}
							/>
							<Text
								style={[
									Texts.regular14,
									{
										color:
											newPassword.length >= 8
												? Colors.colorBrand.burntSienna[500]
												: Colors.gray[400],
										marginLeft: 8,
									},
								]}
							>
								Ít nhất 8 ký tự
							</Text>
						</View>
						<View style={styles.requirementItem}>
							<Ionicons
								name={/[A-Z]/.test(newPassword) ? "checkmark-circle" : "ellipse-outline"}
								size={16}
								color={
									/[A-Z]/.test(newPassword)
										? Colors.colorBrand.burntSienna[500]
										: Colors.gray[400]
								}
							/>
							<Text
								style={[
									Texts.regular14,
									{
										color: /[A-Z]/.test(newPassword)
											? Colors.colorBrand.burntSienna[500]
											: Colors.gray[400],
										marginLeft: 8,
									},
								]}
							>
								Ít nhất 1 ký tự viết hoa
							</Text>
						</View>
						<View style={styles.requirementItem}>
							<Ionicons
								name={/[a-z]/.test(newPassword) ? "checkmark-circle" : "ellipse-outline"}
								size={16}
								color={
									/[a-z]/.test(newPassword)
										? Colors.colorBrand.burntSienna[500]
										: Colors.gray[400]
								}
							/>
							<Text
								style={[
									Texts.regular14,
									{
										color: /[a-z]/.test(newPassword)
											? Colors.colorBrand.burntSienna[500]
											: Colors.gray[400],
										marginLeft: 8,
									},
								]}
							>
								Ít nhất 1 ký tự viết thường
							</Text>
						</View>
						<View style={styles.requirementItem}>
							<Ionicons
								name={/[0-9]/.test(newPassword) ? "checkmark-circle" : "ellipse-outline"}
								size={16}
								color={
									/[0-9]/.test(newPassword)
										? Colors.colorBrand.burntSienna[500]
										: Colors.gray[400]
								}
							/>
							<Text
								style={[
									Texts.regular14,
									{
										color: /[0-9]/.test(newPassword)
											? Colors.colorBrand.burntSienna[500]
											: Colors.gray[400],
										marginLeft: 8,
									},
								]}
							>
								Ít nhất 1 chữ số
							</Text>
						</View>
						<View style={styles.requirementItem}>
							<Ionicons
								name={
									/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
										? "checkmark-circle"
										: "ellipse-outline"
								}
								size={16}
								color={
									/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
										? Colors.colorBrand.burntSienna[500]
										: Colors.gray[400]
								}
							/>
							<Text
								style={[
									Texts.regular14,
									{
										color: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
											? Colors.colorBrand.burntSienna[500]
											: Colors.gray[400],
										marginLeft: 8,
									},
								]}
							>
								Ít nhất 1 ký tự đặc biệt
							</Text>
						</View>
					</View>

					<Button
						style={{ marginTop: 30 }}
						onPress={handleResetPassword}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator
								color="#fff"
								size="small"
							/>
						) : (
							"Đặt lại mật khẩu"
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
	passwordRequirements: {
		marginTop: 24,
		padding: 16,
		backgroundColor: Colors.gray[50],
		borderRadius: 12,
	},
	requirementItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
});
