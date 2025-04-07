import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

// Sample categories data
const categories = [
	{ id: 1, name: "Biển", icon: "water-outline" as const },
	{ id: 2, name: "Núi", icon: "triangle-outline" as const },
	{ id: 3, name: "Đô thị", icon: "business-outline" as const },
	{ id: 4, name: "Di tích", icon: "fitness-outline" as const },
	{ id: 5, name: "Khám phá", icon: "compass-outline" as const },
	{ id: 6, name: "Ẩm thực", icon: "restaurant-outline" as const },
];

export const CategoriesScroll = () => {
	const handleCategoryPress = (categoryId: number) => {
		// In a real app, navigate to category specific screen
		// For now, just print to console
		console.log(`Pressed category ${categoryId}`);
	};

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.categoriesContainer}
		>
			{categories.map((category) => (
				<TouchableOpacity
					key={category.id}
					style={styles.categoryItem}
					onPress={() => console.log(`Pressed category ${category.id}`)}
				>
					<View style={styles.iconContainer}>
						<Ionicons
							name={category.icon}
							size={24}
							color={Colors.colorBrand.burntSienna[500]}
						/>
					</View>
					<Text style={styles.categoryName}>{category.name}</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	categoriesContainer: {
		paddingVertical: 10,
	},
	categoryItem: {
		alignItems: "center",
		marginRight: 20,
		width: 65,
	},
	iconContainer: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.colorBrand.midnightBlue[50],
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
		shadowColor: Colors.gray[800],
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	categoryName: {
		fontSize: 12,
		color: Colors.colorBrand.midnightBlue[800],
		textAlign: "center",
	},
});
