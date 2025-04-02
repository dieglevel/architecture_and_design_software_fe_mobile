import { Colors } from "@/constants";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

const BookingButton = () => {
	return (
		<View style={styles.bookingContainer}>
			<TouchableOpacity style={styles.favoriteButton}>
				<FontAwesome
					name="heart-o"
					size={20}
					color="#A13F3F"
				/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.bookingButton}>
				<Text style={styles.bookingText}>Đặt ngay ↗</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	bookingContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: Colors.gray[0],
		paddingVertical: 8,
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 20,
	},
	favoriteButton: {
		width: 48,
		height: 48,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#FF7F66",
		justifyContent: "center",
		alignItems: "center",
	},
	bookingButton: {
		flex: 1,
		marginLeft: 10,
		backgroundColor: "#FF7F66",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 14,
	},
	bookingText: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default BookingButton;
