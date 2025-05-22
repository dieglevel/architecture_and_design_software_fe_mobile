import { getMyBooking } from "@/services/booking-service";
import { Booking } from "@/types/implement/booking";
import { localePrice } from "@/utils";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Add this import if using Expo
import { Colors } from "@/constants";
import { formatDateToDDMMYYYY } from "@/utils/format-date";
import { StackScreenNavigationProp } from "@/libs/navigation";
import { useNavigation } from "@react-navigation/native";

export const BookingHistoryScreen = () => {
	const [bookings, setBookings] = useState<Booking[]>([]);

	const navigate = useNavigation<StackScreenNavigationProp>();

	useEffect(() => {
		const fetching = async () => {
			try {
				const response = await getMyBooking();
				if (response) {
					setBookings(response);
					console.log("Booking history:", response);
				}
			} catch (error) {
				console.log("Error fetching booking history:", error);
			}
		};
		fetching();
	}, []);

	const renderStatus = (status: string) => {
		switch (status) {
			case "PAID":
				return (
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<MaterialIcons
							name="check-circle"
							size={18}
							color="green"
							style={{ marginRight: 4 }}
						/>
						<Text style={{ color: "green", fontWeight: "600" }}>Đã thanh toán</Text>
					</View>
				);
			case "PENDING":
				return (
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<MaterialIcons
							name="hourglass-empty"
							size={18}
							color="orange"
							style={{ marginRight: 4 }}
						/>
						<Text style={{ color: "orange", fontWeight: "600" }}>Chờ thanh toán</Text>
					</View>
				);
			case "EXPIRED":
				return (
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<MaterialIcons
							name="cancel"
							size={18}
							color="red"
							style={{ marginRight: 4 }}
						/>
						<Text style={{ color: "red", fontWeight: "600" }}>Hết hạn</Text>
					</View>
				);
			default:
				return (
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<MaterialIcons
							name="help-outline"
							size={18}
							color="gray"
							style={{ marginRight: 4 }}
						/>
						<Text style={{ color: "gray", fontWeight: "600" }}>Không rõ</Text>
					</View>
				);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				style={{ paddingHorizontal: 4 }}
				data={bookings}
				keyExtractor={(item) => item.bookingId}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => {
							navigate.navigate("BookingHistoryDetailScreen", { bookingData: item });
						}}
						style={styles.bookingCard}
					>
						<Text style={styles.bookingId}>
							{formatDateToDDMMYYYY(item.tourSchedule.startDate || null)}
						</Text>
						<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
							<Text style={styles.statusLabel}>Trạng thái:</Text>
							{renderStatus(item.status || "")}
						</View>
						<Text style={styles.price}>{localePrice(item.totalPrice || 0) ?? "N/A"}</Text>
					</TouchableOpacity>
				)}
				ListEmptyComponent={<Text style={styles.emptyText}>No bookings found.</Text>}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	header: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 16,
		color: "#222",
	},
	bookingCard: {
		padding: 18,
		marginBottom: 16,
		backgroundColor: "#f9f9f9",
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 3,
		borderWidth: 1,
		borderColor: "#ececec",
	},
	bookingId: {
		fontWeight: "bold",
		marginBottom: 6,
		fontSize: 15,
		color: "#444",
	},
	statusLabel: {
		fontWeight: "500",
		marginRight: 6,
		color: "#555",
		fontSize: 15,
	},
	price: {
		marginTop: 6,
		fontWeight: "bold",
		fontSize: 20,
		color: Colors.colorBrand.burntSienna[500],
	},
	emptyText: {
		textAlign: "center",
		marginTop: 32,
		color: "#888",
		fontSize: 16,
	},
});
