import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Dimensions, Animated } from "react-native";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Export these constants for the HomeScreen
export const HEADER_HEIGHT = 140;
export const TOP_ROW_HEIGHT = 70;
export const SCROLL_THRESHOLD = TOP_ROW_HEIGHT;

interface HeaderProps {
	scrollY: Animated.Value;
}

const Header = ({ scrollY }: HeaderProps) => {
	const insets = useSafeAreaInsets();

	// Calculate the translation for the entire header
	const headerTranslateY = scrollY.interpolate({
		inputRange: [0, SCROLL_THRESHOLD],
		outputRange: [0, -TOP_ROW_HEIGHT],
		extrapolate: "clamp",
	});

	return (
		<Animated.View
			style={[
				styles.container,
				{
					paddingTop: insets.top > 0 ? insets.top : 10,
					transform: [{ translateY: headerTranslateY }],
				},
			]}
		>
			<StatusBar
				barStyle="dark-content"
				backgroundColor="#fff"
			/>

			{/* Header Top Row */}
			<View style={styles.topRow}>
				<View style={styles.welcomeContainer}>
					<Text style={styles.welcomeText}>Xin chào,</Text>
					<Text style={styles.nameText}>Khách hàng</Text>
				</View>

				<View style={styles.iconContainer}>
					<TouchableOpacity style={styles.iconButton}>
						<Ionicons
							name="heart-outline"
							size={24}
							color={Colors.colorBrand.midnightBlue[800]}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.iconButton}>
						<Ionicons
							name="notifications-outline"
							size={24}
							color={Colors.colorBrand.midnightBlue[800]}
						/>
						<View style={styles.notificationBadge} />
					</TouchableOpacity>
				</View>
			</View>

			{/* Search Bar */}
			<View style={styles.searchContainer}>
				<View style={styles.searchBar}>
					<Ionicons
						name="search"
						size={20}
						color={Colors.gray[400]}
						style={styles.searchIcon}
					/>
					<TextInput
						placeholder="Tìm kiếm địa điểm du lịch..."
						placeholderTextColor={Colors.gray[400]}
						style={styles.searchInput}
					/>
				</View>
				<TouchableOpacity style={styles.filterButton}>
					<Ionicons
						name="options-outline"
						size={20}
						color="#fff"
					/>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		// paddingBottom: 15,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		shadowColor: Colors.gray[800],
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
		// marginBottom: 15,
		width: width,
		// alignSelf: "center",
		left: 0,
		right: 0,
		position: "absolute",
		zIndex: 10,
		height: HEADER_HEIGHT,
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// marginBottom: 8,
		height: TOP_ROW_HEIGHT,
	},
	welcomeContainer: {
		flexDirection: "column",
	},
	welcomeText: {
		fontSize: 14,
		color: Colors.gray[500],
	},
	nameText: {
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.colorBrand.midnightBlue[800],
	},
	iconContainer: {
		flexDirection: "row",
	},
	iconButton: {
		marginLeft: 15,
		position: "relative",
	},
	notificationBadge: {
		position: "absolute",
		top: 0,
		right: 0,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Colors.colorBrand.burntSienna[500],
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	searchBar: {
		flex: 1,
		height: 45,
		backgroundColor: Colors.gray[50],
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		marginRight: 10,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		height: "100%",
		fontSize: 14,
		color: Colors.gray[900],
	},
	filterButton: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		width: 45,
		height: 45,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Header;
