import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { ScheduleItemProps } from "@/types/implement";

const ScheduleItem: React.FC<ScheduleItemProps> = ({ day, route, meals, description }) => {
	const [expanded, setExpanded] = useState<boolean>(false);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.header}
				onPress={() => setExpanded(!expanded)}
			>
				<View>
					<Text style={styles.title}>
						{day}: {route}
					</Text>
					<Text style={styles.meals}>Số bữa ăn: {meals}</Text>
				</View>
				<AntDesign
					name={expanded ? "up" : "down"}
					size={18}
					color="#007BFF"
				/>
			</TouchableOpacity>

			{expanded && description && (
				<View style={styles.content}>
					<Text style={styles.description}>{description}</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
		elevation: 3,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.colorBrand.midnightBlue[900],
	},
	meals: {
		fontSize: 14,
		color: Colors.colorBrand.midnightBlue[900],
	},
	content: {
		marginTop: 10,
	},
	description: {
		fontSize: 14,
		color: "#333",
		lineHeight: 20,
	},
});

export default ScheduleItem;
