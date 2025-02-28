import { Colors } from "@/constants";
import { navigate } from "@/libs/navigation/navigationService";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface TourItemProps {
	image: string;
	name: string;
	rating: number;
	price: number;
	discount?: number;
	duration: string;
}

export const TourItem: React.FC<TourItemProps> = ({ image, name, rating, price, discount = 0, duration }) => {
	const discountedPrice = price - (price * discount) / 100;

	return (
		<TouchableOpacity
			style={[styles.container, discount > 0 && styles.containerDiscount]}
			onPress={() => navigate("TourDetailScreen")}
		>
			<Image
				source={{ uri: image }}
				style={styles.image}
			/>
			<View style={styles.details}>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<Text
						style={styles.name}
						numberOfLines={1}
					>
						{name}
					</Text>

					<Text style={styles.duration}>⏱ {duration}</Text>
				</View>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<Text style={styles.rating}>⭐ ({rating.toFixed(1)})</Text>

					<Text style={styles.price}>
						{discount > 0 ? (
							<>
								<Text style={styles.originalPrice}>{price.toLocaleString("vi-VN")} ₫</Text>
								{"  "}
								<Text style={styles.discountedPrice}>
									{discountedPrice.toLocaleString("vi-VN")} ₫
								</Text>
							</>
						) : (
							<Text>{price.toLocaleString("vi-VN")} ₫</Text>
						)}
					</Text>
				</View>
			</View>
			{discount > 0 && <Text style={styles.discountBadge}>-{discount}%</Text>}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 230,
		backgroundColor: "#fff",
		borderRadius: 10,
		marginVertical: 5,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 2,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		position: "relative",
	},
	containerDiscount: {
		borderColor: "#FF6F61",
	},
	image: {
		width: "100%",
		height: 160,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	details: {
		margin: 10,
		justifyContent: "space-between",
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.colorBrand.midnightBlue[950],
	},

	rating: {
		fontSize: 14,
		color: "#000",
	},
	duration: {
		fontSize: 14,
		color: "#555",
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
	},
	discountedPrice: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.colorBrand.midnightBlue[950],
	},
	originalPrice: {
		fontSize: 14,
		color: "#888",
		textDecorationLine: "line-through",
	},
	discountBadge: {
		position: "absolute",
		top: 10,
		right: 10,
		backgroundColor: "#fff",
		color: Colors.colorBrand.midnightBlue[950],
		textAlign: "center",
		paddingHorizontal: 8,
		paddingVertical: 2,
		fontSize: 12,
		fontWeight: "bold",
		borderRadius: 5,
	},
});
