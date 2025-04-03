import { Colors } from "@/constants";
import { navigate } from "@/libs/navigation/navigationService";
import { Tour } from "@/types/implement";
import { localePrice } from "@/utils";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
	tour: Tour;
	rating?: number;

	discount?: number;
}

export const TourItem = ({ discount = 0, tour, rating = 3.5 }: Props) => {
	const discountCalculation = (price: number, discount: number) => {
		if (discount > 0) {
			return price - (price * discount) / 100;
		}
		return price;
	};

	return (
		<TouchableOpacity
			delayPressIn={500}
			style={[styles.container, discount > 0 && styles.containerDiscount]}
			onPress={() => navigate("TourDetailScreen")}
		>
			<Image
				source={{ uri: tour.thumbnail }}
				style={styles.image}
			/>
			<View style={styles.details}>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<Text
						style={styles.name}
						numberOfLines={1}
					>
						{tour.name}
					</Text>
					{rating > 0 ? (
						<Text style={[styles.rating, { fontWeight: "bold" }]}>{rating.toFixed(1)} ⭐</Text>
					) : null}
				</View>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<Text style={styles.duration}>⏱ {tour.duration}</Text>
					<Text style={styles.price}>
						{discount > 0 ? (
							<>
								<Text style={styles.originalPrice}>
									{localePrice(tour.price ? tour.price : 0)}
								</Text>
								{"  "}
								<Text style={styles.discountedPrice}>
									{localePrice(discountCalculation(tour.price ? tour.price : 0, discount))}
								</Text>
							</>
						) : (
							<Text style={{ color: Colors.colorBrand.burntSienna[500] }}>
								{localePrice(tour.price ? tour.price : 0)}
							</Text>
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
		marginVertical: 10,
		shadowColor: Colors.colorBrand.midnightBlue[950],
		borderWidth: 1,
		borderColor: "#F5F5F5",
		position: "relative",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,

		elevation: 6,
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
		maxWidth: "75%",
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
