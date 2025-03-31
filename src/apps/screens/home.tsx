import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "../components";
import { Colors, Texts } from "@/constants";
import { TourItem } from "../components/ui";
import { useEffect, useState } from "react";
import { getTours } from "@/services/tourService";

interface TourItemProps {
	tourId: string;
	image: string;
	name: string;
	rating: number;
	price: number;
	discount: number;
	duration: string;
	description: string;
}

export const HomeScreen = () => {
	const [listTour, setListTour] = useState<Array<TourItemProps>>([]);

	const [showAll, setShowAll] = useState<boolean>(false);
	const [showAllTemp, setShowAllTemp] = useState<boolean>(false);

	const displayedTours = showAll ? listTour : listTour.slice(0, 3);
	const displayedToursTemp = showAllTemp ? listTour : listTour.slice(0, 3);

	useEffect(() => {
		handleGetTours();
	}, []);

	const handleGetTours = async () => {
		try {
			const response = await getTours();
			if (response.statusCode === 302) {
				const tourList = Array.isArray(response.data) ? response.data : [];

				const mappedTours: TourItemProps[] = tourList.map((tour) => ({
					tourId: tour.tourId,
					image: tour.thumbnail,
					name: tour.name,
					rating: 4.5, // Giả sử API chưa có rating
					price: tour.price,
					discount: 10, // Giả sử API chưa có discount
					duration: tour.duration,
					description: tour.description,
				}));

				setListTour(mappedTours);
			} else {
				console.error("Error fetching tours:", response?.message ?? "Unknown error");
			}
		} catch (error) {
			console.error("Error fetching tours:", error);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff", alignItems: "stretch" }}>
			<ScrollView contentContainerStyle={{ padding: 13 }}>
				<Text style={[Texts.bold16, { color: Colors.colorBrand.midnightBlue[950] }]}>
					Những địa điểm nổi bật
				</Text>

				{displayedTours.map((item) => (
					<TourItem
						key={item.tourId}
						{...item}
					/>
				))}

				{listTour.length > 3 && (
					<TouchableOpacity
						onPress={() => setShowAll(!showAll)}
						style={{ borderRadius: 5, marginTop: 10, alignItems: "center" }}
					>
						<Text
							style={{
								color: Colors.colorBrand.burntSienna[500],
								fontSize: 14,
								fontWeight: "bold",
							}}
						>
							{showAll ? "Thu gọn <" : "Xem thêm >"}
						</Text>
					</TouchableOpacity>
				)}

				<Text style={[Texts.bold16, { color: Colors.colorBrand.midnightBlue[950] }]}>Tour ba miền</Text>

				{displayedToursTemp.map((item) => (
					<TourItem
						key={item.tourId}
						{...item}
					/>
				))}

				{listTour.length > 3 && (
					<TouchableOpacity
						onPress={() => setShowAllTemp(!showAllTemp)}
						style={{ borderRadius: 5, marginTop: 10, alignItems: "center" }}
					>
						<Text
							style={{
								color: Colors.colorBrand.burntSienna[500],
								fontSize: 14,
								fontWeight: "bold",
							}}
						>
							{showAllTemp ? "Thu gọn <" : "Xem thêm >"}
						</Text>
					</TouchableOpacity>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};
