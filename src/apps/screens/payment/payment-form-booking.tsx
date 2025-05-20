import { InputForm } from "@/apps/components/ui";
import { useAppSelector } from "@/libs/redux/redux.config";
import { useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Colors } from "@/constants";

export const PaymentFormBooking = () => {
	const { adultCount, babyCount, bookingId, childCount, information, totalPrice, tourScheduleId } = useAppSelector(
		(state) => state.payment,
	);

	const [userFullName, setUserFullName] = useState<string>();
	const [userPhone, setUserPhone] = useState<string>();
	const [userEmail, setUserEmail] = useState<string>();
	const [userAddress, setUserAddress] = useState<string>();

	const handleSubmit = () => {
		// Handle submit logic here
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.gray[100] }}>
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.card}>
					<InputForm
						label="Họ và tên"
						value={userFullName}
						onChangeText={setUserFullName}
						placeholder="Nhập họ và tên"
						style={styles.input}
					/>
					<InputForm
						label="Số điện thoại"
						value={userPhone}
						onChangeText={setUserPhone}
						placeholder="Nhập số điện thoại"
						style={styles.input}
						keyboardType="phone-pad"
					/>
					<InputForm
						label="Email"
						value={userEmail}
						onChangeText={setUserEmail}
						placeholder="Nhập email"
						style={styles.input}
						keyboardType="email-address"
					/>
					<InputForm
						label="Địa chỉ"
						value={userAddress}
						onChangeText={setUserAddress}
						placeholder="Nhập địa chỉ"
						style={styles.input}
					/>
					<TouchableOpacity
						style={styles.button}
						onPress={handleSubmit}
						activeOpacity={0.85}
					>
						<Text style={styles.buttonText}>Tiếp tục</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "flex-start",
		flex: 1,
	},
	card: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 24,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 3,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
		color: Colors.colorBrand.burntSienna[500],
		textAlign: "center",
	},
	input: {
		marginBottom: 18,
	},
	button: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.12,
		shadowRadius: 6,
		elevation: 2,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		letterSpacing: 1,
	},
});
