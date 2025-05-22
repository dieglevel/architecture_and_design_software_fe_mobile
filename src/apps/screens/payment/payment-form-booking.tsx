import { InputForm } from "@/apps/components/ui";
import { useAppSelector } from "@/libs/redux/redux.config";
import { useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, ScrollView, Linking } from "react-native";
import { Colors } from "@/constants";
import { BookingRequest, BookingRequestTicket } from "@/types/implement/booking";
import { createBooking, paymentUrlAmount } from "@/services/booking-service";

export const PaymentFormBooking = () => {
	const { adultCount, babyCount, bookingId, childCount, information, totalPrice, tourScheduleId, data } =
		useAppSelector((state) => state.payment);

	const [userFullName, setUserFullName] = useState<string>();
	const [userPhone, setUserPhone] = useState<string>();
	const [userEmail, setUserEmail] = useState<string>();
	const [userAddress, setUserAddress] = useState<string>();

	const handleSubmit = async () => {
		if (!userFullName || !userPhone || !userEmail || !userAddress) {
			return;
		}

		let tickets: BookingRequestTicket[] = [];

		for (let i = 0; i < adultCount; i++) {
			tickets.push({
				ticketType: "ADULT",
				fullName: "",
				status: 1,
				gender: "male",
				birthDate: "",
				price: data?.adultPrice || 0,
			});
		}

		for (let i = 0; i < babyCount; i++) {
			tickets.push({
				ticketType: "BABY",
				fullName: "",
				status: 1,
				gender: "male",
				birthDate: "",
				price: data?.babyPrice || 0,
			});
		}

		for (let i = 0; i < childCount; i++) {
			tickets.push({
				ticketType: "CHILD",
				fullName: "",
				status: 1,
				gender: "male",
				birthDate: "",
				price: data?.childPrice || 0,
			});
		}

		const bookingRequest: BookingRequest = {
			userFullName: userFullName,
			userPhone: userPhone,
			userEmail: userEmail,
			userAddress: userAddress,
			tourScheduleId: tourScheduleId || "",
			note: "",
			tickets: tickets,
		};

		try {
			const responseBooking = await createBooking(bookingRequest)
			if (responseBooking) {
				console.log("Booking created successfully:", responseBooking);

				const responseUrlPayment = await paymentUrlAmount(totalPrice || 0, responseBooking.bookingId || "");
				if (responseUrlPayment) {
					console.log("Payment URL created successfully:", responseUrlPayment);
					Linking.openURL(responseUrlPayment);
				} else {
					console.error("Failed to create payment URL");
				}
			} else {
				console.error("Failed to create booking");
			}
		} catch (error) {
			console.error("Error creating booking:", error);
		}
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
