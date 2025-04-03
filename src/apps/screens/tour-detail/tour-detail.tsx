import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors, Texts } from "@/constants";
import { TourItem } from "../../components/ui";
import BookingButton from "../../components/ui/booking-btn";
import { Divider } from "react-native-paper";
import TourDetail from "@/apps/components/ui/tour-detail-tabview";

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
		<View
			style={{
				marginTop: 10,
				backgroundColor: Colors.gray[0],
				flex: 1,
				paddingHorizontal: 10,
				paddingVertical: 8,
			}}
		>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={listTour}
				renderItem={({ item }) => <TourItem tour={item} />}
				keyExtractor={(item, index) => index.toString()}
				style={{ marginBottom: 20 }}
				contentContainerStyle={{ paddingBottom: 50 }} // Tạo khoảng cách để không bị che
				ListHeaderComponent={
					<View style={[styles.container, { gap: 8 }]}>
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
							<TourDetail
								schedules={schedules}
								ratingDetails={ratingDetails}
								commentData={commentData}
							/>
						</View>
						<Divider />

						<Text
							style={[
								Texts.bold16,
								{ color: Colors.colorBrand.midnightBlue[950], alignSelf: "flex-start" },
							]}
						>
							Có thể bạn sẽ thích
						</Text>
					</View>
				}
			/>
			<BookingButton />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		overflow: "hidden",
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
	// backgroundColor: "#fff",
});
