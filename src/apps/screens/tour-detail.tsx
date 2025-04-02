import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useState } from "react";
import RatingTour from "../components/ui/rating";
import { Colors, Texts } from "@/constants";
import { TourItem } from "../components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import ScheduleItem from "../components/ui/schedule";
import Comment from "../components/ui/comment";
import TourInfo from "../components/ui/more-infors";
import BookingButton from "../components/ui/booking-btn";

export const TourDetailScreen = () => {
	const schedules = [
		{
			day: "Ngày 1",
			route: "TP. Hồ Chí Minh - Incheon - Seoul",
			meals: "02 (trưa, tối)",
			description:
				"Sáng sớm: HDV đón Quý khách tại Cổng D2 Ga đi QT Sân bay TSN làm thủ tục xuất cảnh đi Paris...",
		},
		{
			day: "Ngày 2",
			route: "Seoul - Nami Island",
			meals: "03 (sáng, trưa, tối)",
			description: "Tham quan đảo Nami, địa điểm nổi tiếng trong phim Bản tình ca mùa đông...",
		},
		{
			day: "Ngày 3",
			route: "Seoul City Tour",
			meals: "03 (sáng, trưa, tối)",
			description:
				"Tham quan Cung điện Gyeongbokgung, bảo tàng dân gian quốc gia và Nhà Xanh Phủ Tổng Thống...",
		},
		{
			day: "Ngày 4",
			route: "Seoul - Everland",
			meals: "03 (sáng, trưa, tối)",
			description: "Khởi hành đi công viên Everland – một trong những công viên giải trí lớn nhất Hàn Quốc...",
		},
		{
			day: "Ngày 5",
			route: "Seoul - TP. Hồ Chí Minh",
			meals: "02 (sáng, trưa)",
			description: "Tham quan mua sắm tại cửa hàng nhân sâm, mỹ phẩm. Đáp chuyến bay về lại Việt Nam...",
		},
	];

	const commentData = [
		{
			id: "9",
			avatar: "https://i.pravatar.cc/150?img=1",
			name: "Phung Anh Minh",
			date: "10/11/2022",
			rating: 5,
			comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		},
		{
			id: "10",
			avatar: "https://i.pravatar.cc/150?img=2",
			name: "Nguyen Van A",
			date: "15/02/2023",
			rating: 4,
			comment: "Great service and amazing experience. Will definitely recommend to others!",
		},
		{
			id: "11",
			avatar: "https://i.pravatar.cc/150?img=3",
			name: "Tran Thi B",
			date: "05/05/2023",
			rating: 3,
			comment: "It was a decent experience. Could improve the customer service a bit more.",
		},
	];

	const renderScene = ({ route }: { route: any }) => {
		switch (route.key) {
			case "schedule":
				return (
					<FlatList
						data={schedules}
						renderItem={({ item }) => <ScheduleItem {...item} />}
						keyExtractor={(item) => item.day}
						nestedScrollEnabled={true}
						scrollEnabled={false}
					/>
				);
			case "review":
				return (
					<ScrollView>
						<RatingTour
							rating={4.9}
							ratingDetails={ratingDetails}
						/>

						<FlatList
							data={commentData}
							renderItem={({ item }) => (
								<Comment
									avatar={item.avatar}
									name={item.name}
									date={item.date}
									rating={item.rating}
									comment={item.comment}
								/>
							)}
							keyExtractor={(item) => item.id}
							scrollEnabled={false}
							nestedScrollEnabled={true}
						/>
					</ScrollView>
				);
			case "info":
				return (
					<TourInfo
						transport={[
							"Vé máy bay khứ hồi Vietjet Air bao gồm 7kg hành lý xách tay + 20kg hành lý ký gửi.",
							"Xe du lịch hiện đại, điều hòa, đưa đón tham quan.",
							"Tàu câu cá và lặn ngắm san hô với đầy đủ dụng cụ.",
						]}
						accommodation={[
							"Khách sạn 3 sao tiêu chuẩn (2-3 khách/phòng).",
							"Phòng tiện nghi điều hòa, tivi, nóng lạnh.",
						]}
						others={[
							"Ăn uống theo lịch trình tham quan.",
							"Vé vào cửa các điểm tham quan.",
							"HDV nhiệt tình, kinh nghiệm.",
							"Nước uống lạnh phục vụ du lịch.",
							"Bảo hiểm du lịch mức cao nhất.",
							"Y tế dự phòng trên xe.",
						]}
					/>
				);
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

	const listTour = [
		{
			tourId: "1",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Du lịch biển Nha Trang",
			rating: 4.8,
			price: 2500000,
			discount: 15,
			duration: "3 ngày 2 đêm",
		},
		{
			tourId: "2",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Khám phá Đà Lạt",
			rating: 4.7,
			price: 1800000,
			discount: 10,
			duration: "2 ngày 1 đêm",
		},
		{
			tourId: "3",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Tour Phú Quốc",
			rating: 4.9,
			price: 3200000,
			discount: 20,
			duration: "4 ngày 3 đêm",
		},
		{
			tourId: "4",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Trekking Fansipan",
			rating: 4.5,
			price: 1500000,
			discount: 0,
			duration: "2 ngày 1 đêm",
		},
		{
			tourId: "5",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Khám phá Sài Gòn",
			rating: 4.6,
			price: 1200000,
			discount: 5,
			duration: "1 ngày",
		},
		{
			tourId: "6",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Du lịch Hội An",
			rating: 4.8,
			price: 2100000,
			discount: 10,
			duration: "3 ngày 2 đêm",
		},
		{
			tourId: "7",
			image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
			name: "Thám hiểm Sơn Đoòng",
			rating: 5.0,
			price: 5000000,
			discount: 25,
			duration: "5 ngày 4 đêm",
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
		<SafeAreaView style={{ backgroundColor: "#fff" }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
			>
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

					<View style={{ flex: 1, minHeight: 400 }}>
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
											props.navigationState.index ===
											props.navigationState.routes.indexOf(route);
										return (
											<TouchableOpacity
												style={[styles.tabItem, isFocused && styles.activeTab]}
												onPress={() => props.jumpTo(route.key)}
											>
												<Text
													style={[
														styles.tabText,
														isFocused && styles.activeTabText,
													]}
												>
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
					</View>

					<Text
						style={[
							Texts.bold16,
							{ color: Colors.colorBrand.midnightBlue[950], alignSelf: "flex-start" },
						]}
					>
						Có thể bạn sẽ thích
					</Text>

					<FlatList
						data={listTour}
						renderItem={({ item }) => <TourItem {...item} />}
						keyExtractor={(item, index) => index.toString()}
						style={{ marginTop: 10 }}
						contentContainerStyle={{ paddingBottom: 50 }} // Tạo khoảng cách để không bị che
						scrollEnabled={false} // Ngăn FlatList cuộn riêng
						nestedScrollEnabled={true}
					/>
					<View>
						<BookingButton />
					</View>
				</View>
			</ScrollView>
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
