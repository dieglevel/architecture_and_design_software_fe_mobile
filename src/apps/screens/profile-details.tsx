import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Alert,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfile } from "@/services/user-service";
import { CommonActions, useIsFocused, useNavigation } from "@react-navigation/native";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/libs/redux/redux.config";
import { setUser } from "@/libs/redux/stores/user.store.";
import { ActivityIndicatorCustom } from "../components/activity-indicator-custom";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/assets/svgs/calendar";
import { Colors } from "@/constants";
import DateTimePicker from "react-native-modal-datetime-picker";

// Format date function
const formatDate = (timestamp: number): string => {
	const date = new Date(timestamp);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
};

export const ProfileDetailsScreen = () => {
	const isFocused = useIsFocused();
	const user = useAppSelector((state) => state.user.data);
	const dispatch = useAppDispatch<AppDispatch>();
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [isDatePickVisible, setDatePickVisible] = useState<boolean>(false);

	// Form state
	const [name, setName] = useState<string>(user?.fullName ?? "");
	const [gender, setGender] = useState<string>(user?.gender === 1 ? "Nam" : "Nữ");
	const [dateOfBirth, setDateOfBirth] = useState<string>(formatDate(Number(user?.birthday) || Date.now()));
	const [phone, setPhone] = useState<string>(user?.phone ?? "");
	const [email, setEmail] = useState<string>(user?.email ?? "");

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await getProfile();
				if (response.statusCode === 200) {
					dispatch(setUser(response.data ?? null));
				} else {
					console.error("Error fetching profile:", response?.message ?? "Unknown error");
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		if (isFocused) {
			setIsLoading(true);
			fetchProfile();
			setTimeout(() => {
				setIsLoading(false);
			}, 800);
		}
	}, [isFocused, dispatch]);

	useEffect(() => {
		if (user) {
			setName(user?.fullName ?? "");
			setGender(user?.gender === 1 ? "Nam" : "Nữ");
			setDateOfBirth(formatDate(Number(user?.birthday) || Date.now()));
			setPhone(user?.phone ?? "");
			setEmail(user?.email ?? "");
		}
	}, [user]);

	const showDatePicker = () => {
		setDatePickVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickVisible(false);
	};

	// Handle date selection
	const handleConfirm = (date: Date) => {
		const formattedDate = format(date, "dd/MM/yyyy", { locale: vi });
		setDateOfBirth(formattedDate);
		validateDOB(formattedDate);
		hideDatePicker();
	};

	// Validate date of birth
	const validateDOB = (text: string) => {
		const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
		if (!dateRegex.test(text)) return "Ngày sinh phải có định dạng dd/MM/yyyy!";

		const [day, month, year] = text.split("/").map(Number);
		const birthDate = new Date(year, month - 1, day);
		const today = new Date();

		// Calculate date 16 years ago
		const sixteenYearsAgo = new Date();
		sixteenYearsAgo.setFullYear(today.getFullYear() - 16);

		if (birthDate >= today) {
			return "Ngày sinh không hợp lệ!";
		}

		if (birthDate > sixteenYearsAgo) {
			return "Người dùng phải trên 16 tuổi!";
		}

		return null;
	};

	// Handle gender selection
	const toggleGender = () => {
		setGender(gender === "Nam" ? "Nữ" : "Nam");
	};

	// Handle save changes
	const handleSaveChanges = async () => {
		// Validation
		if (!name.trim()) {
			Alert.alert("Lỗi", "Họ và tên không được để trống");
			return;
		}

		if (!phone.trim()) {
			Alert.alert("Lỗi", "Số điện thoại không được để trống");
			return;
		}

		const dobError = validateDOB(dateOfBirth);
		if (dobError) {
			Alert.alert("Lỗi", dobError);
			return;
		}

		// TODO: Implement the actual API call to update profile
		setIsSaving(true);

		// Simulate API call
		setTimeout(() => {
			setIsSaving(false);
			Alert.alert("Thành công", "Thông tin cá nhân đã được cập nhật", [
				{ text: "OK", onPress: () => navigation.goBack() },
			]);
		}, 1000);
	};

	return (
		<SafeAreaView style={styles.container}>
			{isLoading ? (
				<ActivityIndicatorCustom />
			) : (
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<View style={styles.formContainer}>
						<ProfileInput
							label="Họ và tên"
							value={name}
							onChangeText={setName}
							placeholder="Nhập họ tên của bạn"
						/>

						<View style={styles.inputContainer}>
							<Text style={styles.inputLabel}>Giới tính</Text>
							<View style={styles.genderContainer}>
								<TouchableOpacity
									style={[
										styles.genderOption,
										gender === "Nam" && styles.genderOptionSelected,
									]}
									onPress={() => setGender("Nam")}
								>
									<Text
										style={[
											styles.genderText,
											gender === "Nam" && styles.genderTextSelected,
										]}
									>
										Nam
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={[
										styles.genderOption,
										gender === "Nữ" && styles.genderOptionSelected,
									]}
									onPress={() => setGender("Nữ")}
								>
									<Text
										style={[
											styles.genderText,
											gender === "Nữ" && styles.genderTextSelected,
										]}
									>
										Nữ
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						<ProfileInput
							label="Ngày sinh"
							value={dateOfBirth}
							onChangeText={setDateOfBirth}
							placeholder="DD/MM/YYYY"
							icon={<Calendar />}
							onIconPress={showDatePicker}
						/>

						<DateTimePicker
							isVisible={isDatePickVisible}
							onConfirm={handleConfirm}
							mode="date"
							display="default"
							onCancel={hideDatePicker}
							maximumDate={new Date()}
							minimumDate={new Date(1900, 0, 1)}
						/>

						<ProfileInput
							label="Điện thoại"
							value={phone}
							onChangeText={setPhone}
							placeholder="Nhập vào số điện thoại của bạnbạn"
							keyboardType="phone-pad"
						/>

						<ProfileInput
							label="Email"
							value={email}
							onChangeText={setEmail}
							placeholder="Nhập vào địa chỉ email của bạn"
							keyboardType="email-address"
							editable={false}
							info="Địa chỉ email không thể thay đổi"
						/>

						<TouchableOpacity
							style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
							onPress={handleSaveChanges}
							disabled={isSaving}
						>
							{isSaving ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text style={styles.saveButtonText}>Save Changes</Text>
							)}
						</TouchableOpacity>
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

interface ProfileInputProps {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	secureTextEntry?: boolean;
	icon?: React.ReactNode;
	onIconPress?: () => void;
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
	editable?: boolean;
	info?: string;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
	label,
	value,
	onChangeText,
	placeholder,
	secureTextEntry = false,
	icon,
	onIconPress,
	keyboardType = "default",
	editable = true,
	info,
}) => (
	<View style={styles.inputContainer}>
		<Text style={styles.inputLabel}>{label}</Text>
		<View style={[styles.inputWrapper, !editable && styles.inputDisabled]}>
			<TextInput
				style={[styles.input, icon ? styles.inputWithIcon : null, !editable && styles.inputTextDisabled]}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={Colors.gray[400]}
				secureTextEntry={secureTextEntry}
				keyboardType={keyboardType}
				editable={editable}
			/>
			{icon && (
				<TouchableOpacity
					style={styles.iconContainer}
					onPress={onIconPress}
					disabled={!editable}
				>
					{icon}
				</TouchableOpacity>
			)}
		</View>
		{info && <Text style={styles.infoText}>{info}</Text>}
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	scrollContainer: {
		paddingBottom: 30,
	},
	formContainer: {
		paddingHorizontal: 16,
	},
	inputContainer: {
		marginBottom: 20,
	},
	inputLabel: {
		fontSize: 16,
		fontWeight: "500",
		color: Colors.gray[800],
		marginBottom: 8,
	},
	inputWrapper: {
		position: "relative",
		borderWidth: 1,
		borderColor: Colors.gray[300],
		borderRadius: 8,
		backgroundColor: "#fff",
	},
	input: {
		fontSize: 16,
		color: Colors.gray[900],
		padding: 12,
	},
	inputWithIcon: {
		paddingRight: 40,
	},
	iconContainer: {
		position: "absolute",
		right: 12,
		top: "50%",
		transform: [{ translateY: -12 }],
	},
	infoText: {
		fontSize: 12,
		color: Colors.gray[500],
		marginTop: 4,
	},
	inputDisabled: {
		backgroundColor: Colors.gray[100],
		borderColor: Colors.gray[300],
	},
	inputTextDisabled: {
		color: Colors.gray[600],
	},
	saveButton: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		borderRadius: 8,
		paddingVertical: 14,
		alignItems: "center",
		marginTop: 20,
	},
	saveButtonDisabled: {
		backgroundColor: Colors.colorBrand.burntSienna[300],
	},
	saveButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	genderContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	genderOption: {
		flex: 1,
		paddingVertical: 12,
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.gray[300],
		backgroundColor: "#fff",
	},
	genderOptionSelected: {
		borderColor: Colors.colorBrand.burntSienna[500],
		backgroundColor: Colors.colorBrand.burntSienna[50],
	},
	genderText: {
		fontSize: 16,
		color: Colors.gray[700],
	},
	genderTextSelected: {
		color: Colors.colorBrand.burntSienna[500],
		fontWeight: "500",
	},
});
