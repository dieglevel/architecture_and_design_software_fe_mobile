import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfile, updateAvatar } from "@/services/user-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/libs/async-storage";
import { CommonActions, useIsFocused, useNavigation } from "@react-navigation/native";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/libs/redux/redux.config";
import { setUser } from "@/libs/redux/stores/user.store.";
import { ActivityIndicatorCustom } from "../components/activity-indicator-custom";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/assets/svgs/calendar";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import imagePicker from "@/services/image-picker";

const ProfileScreen = () => {
	const isFocused = useIsFocused();

	useEffect(() => {
		const handleGetProfile = async () => {
			try {
				const response = await getProfile();
				if (response.statusCode === 200) {
					dispatch(setUser(response.data ?? null));
					console.log("Profile data:", response.data);
				} else {
					console.error("Error fetching profile:", response?.message ?? "Unknown error");
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		if (isFocused) {
			setIsLoading(true);
			handleGetProfile();
			setIsLoading(false);
		}
	}, [isFocused]);

	const user = useAppSelector((state) => state.user.data);

	const dispatch = useAppDispatch<AppDispatch>();

	const formatDate = (timestamp: number): string => {
		const date = new Date(timestamp); // Chuyển timestamp thành Date object
		const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày (dd)
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (MM)
		const year = date.getFullYear(); // Lấy năm (YYYY)

		return `${day}/${month}/${year}`; // Format thành dd/MM/yyyy
	};
	const [name, setName] = useState<string>(user?.fullName ?? "");
	const [username, setUsername] = useState<string>(user?.username ?? "");
	const [avatar, setAvatar] = useState<string>(user?.avatarUrl ?? "");
	const [gender, setGender] = useState<string>(user?.gender === 1 ? "Nam" : "Nữ");
	const [dateOfBirth, setDateOfBirth] = useState<string>(
		formatDate(Number(user?.birthday) || Date.now()), // Ép kiểu về number
	);

	const [phone, setPhone] = useState<string>(user?.phone ?? "");
	const [email, setEmail] = useState<string>(user?.email ?? "");
	const [password, setPassword] = useState<string>("************");
	const [confirmPassword, setConfirmPassword] = useState<string>("************");
	const [isDatePickVisible, setDatePickVisible] = useState<boolean>(false);
	const navigation = useNavigation();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Hàm xử lý khi người dùng nhấn nút "Đăng xuất"
	const handleLogout = async () => {
		try {
			await AsyncStorage.removeItem(AsyncStorageKey.TOKEN);
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "LoginScreen" }],
				}),
			); // Chuyển hướng về Login
		} catch (error) {
			console.error("Đăng xuất thất bại:", error);
		}
	};

	const showDatePicker = () => {
		setDatePickVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickVisible(false);
	};

	// Hàm xử lý khi chọn ngày
	const handleConfirm = (date: Date) => {
		const formattedDate = format(date, "dd/MM/yyyy", { locale: vi }); // Định dạng ngày tháng
		setDateOfBirth(formattedDate);
		validateDOB(formattedDate);
		hideDatePicker();
	};

	const validateDOB = (text: string) => {
		const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
		if (!dateRegex.test(text)) return "Ngày sinh phải có định dạng dd/MM/yyyy!";

		const [day, month, year] = text.split("/").map(Number);
		const birthDate = new Date(year, month - 1, day);
		const today = new Date();

		// Tính ngày cách đây 16 năm
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

	const handleChangAvatar = async () => {
		const newImage = await imagePicker();
		const response = await updateAvatar(newImage ?? "");
		if (response.statusCode === 200) {
			setAvatar(response.data?.avatarUrl ?? "");
			dispatch(setUser(response.data ?? null));
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			{isLoading ? (
				<ActivityIndicatorCustom />
			) : (
				<ScrollView>
					<LinearGradient
						colors={["#f07055", "#9043ed"]}
						start={{ x: 0, y: 0.5 }}
						end={{ x: 1, y: 0.5 }}
						style={styles.header}
					>
						<View style={styles.avatarContainer}>
							<Image
								source={{ uri: avatar }}
								style={styles.avatar}
							/>
							<TouchableOpacity
								onPress={handleChangAvatar}
								style={styles.avatarEdit}
							>
								<MaterialIcons
									name="camera-alt"
									size={14}
									color={Colors.colorBrand.midnightBlue[500]}
								/>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: "column", alignItems: "flex-start" }}>
							<Text style={styles.name}>{name}</Text>
							<Text style={styles.username}>{username}</Text>
						</View>
					</LinearGradient>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
						<ProfileInput
							label="Họ và tên"
							value={name}
							onChangeText={setName}
						/>
						<ProfileInput
							label="Giới tính"
							value={gender}
							onChangeText={setGender}
						/>
						<ProfileInput
							label="Ngày sinh"
							value={dateOfBirth}
							onChangeText={setDateOfBirth}
							icon={<Calendar />}
							onIconPress={showDatePicker}
						/>
						<DateTimePicker
							isVisible={isDatePickVisible}
							onConfirm={handleConfirm}
							mode="date"
							display="compact"
							onCancel={hideDatePicker}
							maximumDate={new Date()}
							minimumDate={new Date(1900, 0, 1)}
						/>

						<ProfileInput
							label="Liên lạc"
							value={phone}
							onChangeText={setPhone}
						/>
						<ProfileInput
							label="Email"
							value={email}
							onChangeText={setEmail}
						/>
						<ActionButtons />
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Mật khẩu</Text>
						<ProfileInput
							label="Mật khẩu"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
						/>
						<ProfileInput
							label="Nhập lại mật khẩu"
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry
						/>
						<ActionButtons />
					</View>

					<View style={styles.section}>
						<TouchableOpacity onPress={handleLogout}>
							<Text
								style={{ color: "#f07055", fontSize: 16, textAlign: "center", fontWeight: 500 }}
							>
								Đăng xuất
							</Text>
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
	secureTextEntry?: boolean;
	icon?: React.ReactNode; // Icon tùy chỉnh
	onIconPress?: () => void; // Hàm gọi khi nhấn vào icon
}

const ProfileInput: React.FC<ProfileInputProps> = ({
	label,
	value,
	onChangeText,
	secureTextEntry = false,
	icon,
	onIconPress,
}) => (
	<View style={styles.inputContainer}>
		<Text style={styles.inputLabel}>{label}</Text>
		<View style={styles.inputWrapper}>
			<TextInput
				style={[styles.input, icon ? styles.inputWithIcon : null]}
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry}
			/>
			{icon && (
				<TouchableOpacity
					style={styles.iconContainer}
					onPress={onIconPress}
				>
					{icon}
				</TouchableOpacity>
			)}
		</View>
	</View>
);

const ActionButtons = () => (
	<View style={styles.buttonContainer}>
		<TouchableOpacity style={[styles.button, styles.cancelButton]}>
			<Text style={styles.buttonText}>Huỷ</Text>
		</TouchableOpacity>
		<TouchableOpacity style={[styles.button, styles.confirmButton]}>
			<Text style={styles.buttonText}>Xác nhận</Text>
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#f8f8f8" },
	header: {
		flexDirection: "row",
		justifyContent: "flex-start",
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderRadius: 20,
		marginHorizontal: 15,
		marginTop: 10,
	},
	avatarContainer: { position: "relative", width: 80, height: 80, marginRight: 8 },
	avatar: {
		width: "100%",
		height: "100%",
		borderRadius: 40,
		borderWidth: 3,
		borderColor: "#fff",
	},
	avatarEdit: {
		position: "absolute",
		bottom: -3,
		width: 30,
		height: 15,
		backgroundColor: "#fff",
		borderRadius: 20,
		alignItems: "center",
		alignSelf: "center",
	},
	name: { fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 10 },
	username: {
		fontSize: 14,
		color: "#f0f0f0",
		backgroundColor: "#ffffff50",
		padding: 5,
		borderRadius: 8,
		marginTop: 5,
	},

	section: {
		backgroundColor: "#fff",
		padding: 15,
		marginVertical: 10,
		marginHorizontal: 20,
		borderRadius: 10,
		elevation: 2,
	},
	sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },

	inputContainer: { marginBottom: 10 },
	inputLabel: { fontSize: 14, color: "#555" },
	input: {
		backgroundColor: "#f0f0f0",
		padding: 10,
		borderRadius: 8,
		marginTop: 5,
	},

	buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
	button: { flex: 1, padding: 10, borderRadius: 8, alignItems: "center", marginHorizontal: 5 },
	cancelButton: { backgroundColor: "#a0a0a0" },
	confirmButton: { backgroundColor: "#ff4d4d" },
	buttonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },

	inputWrapper: {
		position: "relative",
		borderColor: "#ccc",
		borderRadius: 8,
		justifyContent: "center",
	},
	inputWithIcon: {
		paddingRight: 35,
	},
	iconContainer: {
		position: "absolute",
		right: 10,
		top: "50%",
		transform: [{ translateY: -10 }],
	},
});

export default ProfileScreen;
