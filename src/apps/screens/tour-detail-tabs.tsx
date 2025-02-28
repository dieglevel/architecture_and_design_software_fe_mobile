import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, StyleSheet } from "react-native";

// Các màn hình con
const ScheduleScreen = () => (
	<View style={styles.screen}>
		<Text style={styles.text}>Lịch trình chi tiết của tour</Text>
	</View>
);
const ReviewsScreen = () => (
	<View style={styles.screen}>
		<Text style={styles.text}>Danh sách đánh giá của khách hàng</Text>
	</View>
);
const InfoScreen = () => (
	<View style={styles.screen}>
		<Text style={styles.text}>Thông tin khác về tour</Text>
	</View>
);

const Tab = createMaterialTopTabNavigator();

export const TourDetailTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: "#000",
				tabBarIndicatorStyle: { backgroundColor: "#FFB400", height: 3 },
				tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
			}}
		>
			<Tab.Screen
				name="Lịch trình"
				component={ScheduleScreen}
			/>
			<Tab.Screen
				name="Đánh giá"
				component={ReviewsScreen}
			/>
			<Tab.Screen
				name="Thông tin khác"
				component={InfoScreen}
			/>
		</Tab.Navigator>
	);
};

// Style đơn giản
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	text: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
