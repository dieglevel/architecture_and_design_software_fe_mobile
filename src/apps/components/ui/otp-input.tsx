import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, Keyboard, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { Colors, Texts } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

interface OtpInputProps {
	length?: number;
	value: string;
	onChange: (value: string) => void;
	error?: string;
	style?: ViewStyle;
	inputStyle?: ViewStyle;
	resendOtp?: () => void;
	otpResendTime?: number; // in seconds
}

export const OtpInput = ({
	length = 6,
	value,
	onChange,
	error,
	style,
	inputStyle,
	resendOtp,
	otpResendTime = 60,
}: OtpInputProps) => {
	const inputRefs = useRef<Array<TextInput | null>>([]);
	const [isFocused, setIsFocused] = useState<boolean[]>(Array(length).fill(false));
	const [countdown, setCountdown] = useState(otpResendTime);
	const [isCountdownActive, setIsCountdownActive] = useState(true);

	// Tạo mảng ô input OTP dựa trên độ dài OTP
	useEffect(() => {
		inputRefs.current = inputRefs.current.slice(0, length);
	}, [length]);

	// Đếm ngược thời gian để gửi lại OTP
	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (isCountdownActive && countdown > 0) {
			timer = setTimeout(() => {
				setCountdown(countdown - 1);
			}, 1000);
		} else if (countdown === 0) {
			setIsCountdownActive(false);
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [countdown, isCountdownActive]);

	// Xử lý khi nhập OTP
	const handleChange = (text: string, index: number) => {
		// Đảm bảo chỉ nhập số
		if (/^\d*$/.test(text)) {
			const newValue = value.split("");
			newValue[index] = text;
			onChange(newValue.join(""));

			// Di chuyển tới ô tiếp theo
			if (text && index < length - 1) {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	// Xử lý khi xóa OTP
	const handleKeyPress = (e: any, index: number) => {
		if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
			// Di chuyển về ô trước đó khi xóa
			const newValue = value.split("");
			newValue[index - 1] = "";
			onChange(newValue.join(""));
			inputRefs.current[index - 1]?.focus();
		}
	};

	// Xử lý gửi lại OTP
	const handleResendOtp = () => {
		if (resendOtp && !isCountdownActive) {
			resendOtp();
			setCountdown(otpResendTime);
			setIsCountdownActive(true);
		}
	};

	return (
		<View style={[styles.container, style]}>
			<View style={styles.inputsContainer}>
				{Array(length)
					.fill(0)
					.map((_, index) => (
						<TextInput
							key={index}
							ref={(ref) => {
								inputRefs.current[index] = ref;
							}}
							style={[
								styles.input,
								isFocused[index] && styles.inputFocused,
								value[index] && styles.inputFilled,
								error && styles.inputError,
								inputStyle,
							]}
							value={value[index] || ""}
							onChangeText={(text) => handleChange(text, index)}
							onKeyPress={(e) => handleKeyPress(e, index)}
							onFocus={() => {
								const newFocusState = [...isFocused];
								newFocusState[index] = true;
								setIsFocused(newFocusState);
							}}
							onBlur={() => {
								const newFocusState = [...isFocused];
								newFocusState[index] = false;
								setIsFocused(newFocusState);
							}}
							keyboardType="number-pad"
							maxLength={1}
							textContentType="oneTimeCode"
							selectionColor={Colors.colorBrand.burntSienna[500]}
							textAlign="center"
						/>
					))}
			</View>

			{error && (
				<View style={styles.errorContainer}>
					<Ionicons
						name="alert-circle-outline"
						size={16}
						color={Colors.colorBrand.burntSienna[500]}
					/>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}

			{resendOtp && (
				<TouchableOpacity
					style={styles.resendContainer}
					onPress={handleResendOtp}
					disabled={isCountdownActive}
				>
					<Text style={[styles.resendText, isCountdownActive && styles.resendTextDisabled]}>
						{isCountdownActive ? `Gửi lại mã sau ${countdown}s` : "Gửi lại mã OTP"}
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	inputsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
	},
	input: {
		width: 45,
		height: 50,
		borderWidth: 1,
		borderRadius: 8,
		fontSize: 22,
		fontWeight: "bold",
		backgroundColor: Colors.gray[50],
		borderColor: Colors.gray[300],
		color: Colors.colorBrand.midnightBlue[800],
	},
	inputFocused: {
		borderColor: Colors.colorBrand.burntSienna[500],
		backgroundColor: "#FFFFFF",
		borderWidth: 2,
	},
	inputFilled: {
		backgroundColor: Colors.gray[100],
		borderColor: Colors.colorBrand.midnightBlue[500],
	},
	inputError: {
		borderColor: Colors.colorBrand.burntSienna[500],
		borderWidth: 1.5,
	},
	errorContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},
	errorText: {
		color: Colors.colorBrand.burntSienna[500],
		fontSize: 14,
		marginLeft: 4,
	},
	resendContainer: {
		alignItems: "center",
		marginTop: 20,
	},
	resendText: {
		color: Colors.colorBrand.burntSienna[500],
		fontWeight: "600",
		fontSize: 14,
	},
	resendTextDisabled: {
		color: Colors.gray[500],
	},
});
