import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfile } from "@/services/user-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "@/libs/navigation/navigationService";
import { AsyncStorageKey } from "@/libs/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
	const [name, setName] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("************");
	const [confirmPassword, setConfirmPassword] = useState<string>("************");
	const navigation = useNavigation();

	useEffect(() => {
		handleGetProfile();
	}, []);

	const handleGetProfile = async () => {
		try {
			const response = await getProfile();
			if (response.statusCode === 200) {
				setName(response.data?.fullname ?? "");
				setUsername(response.data?.username ?? "");
				// setAddress(response.data?.address ?? "");
				setPhone(response.data?.phone ?? "");
				setEmail(response.data?.email ?? "");
			} else {
				console.error("Error fetching profile:", response?.message ?? "Unknown error");
			}
		} catch (error) {
			console.error("Error fetching profile:", error);
		}
	};

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

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<LinearGradient
					colors={["#f07055", "#9043ed"]}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
					style={styles.header}
				>
					<Image
						source={{ uri: "https://i.imgur.com/your-avatar-link.jpg" }}
						style={styles.avatar}
					/>
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
						label="Địa chỉ"
						value={address}
						onChangeText={setAddress}
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
						<Text style={{ color: "#f07055", fontSize: 16, textAlign: "center", fontWeight: 500 }}>
							Đăng xuất
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

interface ProfileInputProps {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	secureTextEntry?: boolean;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ label, value, onChangeText, secureTextEntry = false }) => (
	<View style={styles.inputContainer}>
		<Text style={styles.inputLabel}>{label}</Text>
		<TextInput
			style={styles.input}
			value={value}
			onChangeText={onChangeText}
			secureTextEntry={secureTextEntry}
		/>
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
	avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: "#fff", marginRight: 8 },
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
});

export default ProfileScreen;
