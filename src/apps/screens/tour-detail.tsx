import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "../components";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Tab } from "@/libs/navigation";
import { TourDetailTabs } from "./tour-detail-tabs";

export const TourDetailScreen = () => {
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

	return (
		<SafeAreaView style={{ alignItems: "stretch", backgroundColor: "#fff" }}>
			<View style={styles.container}>
				{/* Ảnh Tour */}
				<Image
					source={{
						uri: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Tour_eiffel_paris-eiffel_tower.jpg",
					}}
					style={styles.image}
				/>

				{/* Nội dung */}
				<View style={styles.content}>
					<Text style={styles.title}>Tour Côn Đảo 3N2Đ</Text>
					<Text style={styles.description}>HCM - Grand World - Câu Cá - Lặn Ngắm San Hô</Text>

					{/* Địa điểm và đánh giá */}
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

					{/* Nút hành động
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.primaryButton}>
							<Text style={styles.primaryButtonText}>Lịch trình</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text style={styles.secondaryButton}>Đánh giá</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text style={styles.secondaryButton}>Thông tin khác</Text>
						</TouchableOpacity>
					</View> */}
				</View>
				{/* Tabs */}
				<View style={{ flex: 1 }}>
					<TourDetailTabs />
				</View>
			</View>
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
	buttonContainer: {
		flexDirection: "row",
		marginTop: 8,
	},
	primaryButton: {
		backgroundColor: "#FF6F61",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 5,
	},
	primaryButtonText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "bold",
	},
	secondaryButton: {
		color: "#666",
		fontSize: 12,
		marginLeft: 15,
		fontWeight: "bold",
	},
});
