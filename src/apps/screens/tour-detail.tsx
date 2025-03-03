import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "../components";
import { FontAwesome } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useState } from "react";
import RatingTour from "../components/ui/rating";
import { Colors, Texts } from "@/constants";

export const TourDetailScreen = () => {
	const Schedule = () => (
		<View style={styles.scene}>
			<Text>Lịch trình</Text>
		</View>
	);

	const Info = () => (
		<View style={styles.scene}>
			<Text>Thông tin khác</Text>
		</View>
	);

	const renderScene = ({ route }: { route: any }) => {
		switch (route.key) {
			case "schedule":
				return <Schedule />;
			case "review":
				return (
					<RatingTour
						rating={4.9}
						ratingDetails={ratingDetails}
					/>
				);
			case "info":
				return <Info />;
			default:
				return null;
		}
	};

	const [index, setIndex] = useState(0);
	const [routes] = useState<Array<Object>>([
		{ key: "schedule", title: "Lịch trình" },
		{ key: "review", title: "Đánh giá" },
		{ key: "info", title: "Thông tin khác" },
	]);

	const tourList = [
		{
			id: "1",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			title: "Tour Phú Quốc 3N2Đ",
			description: "HCM - Grand World - Câu Cá - Lặn Ngắm San Hô",
			location: "Kiên Giang",
			rating: 4.8,
			reviews: 24,
		},
		{
			id: "2",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			title: "Tour Đà Lạt 4N3Đ",
			description: "Khám phá Hồ Xuân Hương - Langbiang - Chợ Đêm",
			location: "Lâm Đồng",
			rating: 4.5,
			reviews: 18,
		},
		{
			id: "3",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			title: "Tour Miền Tây 2N1Đ",
			description: "Cần Thơ - Chợ Nổi Cái Răng - Bến Ninh Kiều",
			location: "Cần Thơ",
			rating: 4.7,
			reviews: 30,
		},
		{
			id: "4",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			title: "Tour Huế - Đà Nẵng 5N4Đ",
			description: "Đại Nội Huế - Bà Nà Hills - Hội An",
			location: "Huế - Đà Nẵng",
			rating: 4.6,
			reviews: 22,
		},
		{
			id: "5",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			title: "Tour Côn Đảo 3N2Đ",
			description: "Khám phá thiên đường biển hoang sơ",
			location: "Bà Rịa - Vũng Tàu",
			rating: 4.9,
			reviews: 28,
		},
	];

	const ratingDetails = [
		{ label: "Xuất sắc", value: 90 },
		{ label: "Tốt", value: 80 },
		{ label: "Trung bình", value: 70 },
		{ label: "Kém", value: 40 },
		{ label: "Vị trí", value: 85 },
		{ label: "Giá cả", value: 75 },
		{ label: "Phục vụ", value: 88 },
		{ label: "Tiện nghi", value: 78 },
	];

	return (
		<SafeAreaView style={{ backgroundColor: "#fff", alignItems: "stretch" }}>
			<View style={styles.container}>
				<Image
					source={{
						uri: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
					}}
					style={styles.image}
				/>

				<View style={styles.content}>
					<Text style={styles.title}>Tour Côn Đảo 3N2Đ</Text>
					<Text style={styles.description}>HCM - Grand World - Câu Cá - Lặn Ngắm San Hô</Text>
					<View style={styles.row}>
						<Text style={styles.location}>Kiên Giang</Text>
						<View style={styles.ratingContainer}>
							<FontAwesome
								name="star"
								size={14}
								color="#FFB400"
							/>
							<Text style={styles.rating}>4.8</Text>
							<Text style={styles.reviews}>(24 đánh giá)</Text>
						</View>
					</View>
				</View>
			</View>

			<TabView
				initialLayout={{ width: 360 }}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				renderTabBar={(props) => (
					<TabBar
						{...props}
						indicatorStyle={{ backgroundColor: "#ff6347" }}
						style={styles.tabBar}
						activeColor="#fff"
						inactiveColor="#7D7D7D"
						renderTabBarItem={({ route }) => {
							const isFocused =
								props.navigationState.index === props.navigationState.routes.indexOf(route);
							return (
								<TouchableOpacity
									style={[styles.tabItem, isFocused && styles.activeTab]}
									onPress={() => {
										props.jumpTo(route.key); // Chuyển tab khi bấm
									}}
								>
									<Text style={[styles.tabText, isFocused && styles.activeTabText]}>
										{route.title}
									</Text>
								</TouchableOpacity>
							);
						}}
						contentContainerStyle={{ justifyContent: "space-evenly" }}
						indicatorContainerStyle={{ display: "none" }}
					/>
				)}
			/>
			<Text style={[Texts.bold16, { color: Colors.colorBrand.midnightBlue[950], alignSelf: "flex-start" }]}>
				Có thể bạn sẽ thích
			</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		overflow: "hidden",
		margin: 10,
	},
	image: {
		width: "100%",
		height: 150,
		borderRadius: 10,
	},
	content: {
		padding: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 4,
	},
	description: {
		fontSize: 14,
		color: "#0077CC",
		marginBottom: 6,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 6,
	},
	location: {
		fontSize: 12,
		color: "#666",
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	rating: {
		fontSize: 12,
		fontWeight: "bold",
		marginLeft: 4,
	},
	reviews: {
		fontSize: 12,
		color: "red",
		marginLeft: 4,
	},
	scene: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	tabBar: {
		backgroundColor: "#fff",
		elevation: 2,
	},

	tabItem: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	activeTab: {
		backgroundColor: "#ff6347", // Màu nền cam khi chọn
	},
	tabText: {
		color: "#7D7D7D",
		fontWeight: "bold",
	},
	activeTabText: {
		color: "#fff", // Màu trắng khi active
	},
});
