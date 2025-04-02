import { TourItem } from "@/apps/components/ui";
import { Colors } from "@/constants";
import { Tour } from "@/types/implement";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";

interface Props {
	listTour: Tour[];
}

const ListItem = ({ listTour }: Props) => {
	const [showAll, setShowAll] = useState<boolean>(false);
	const [data, setData] = useState<Tour[]>(listTour.slice(0, 3));
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleShowAll = () => {
		setIsLoading(true);
		setData(showAll ? listTour.slice(0, 3) : listTour);
		setShowAll(!showAll);
		setIsLoading(false);
	};

	const handleShowLess = () => {
		setIsLoading(true);
		setData(listTour.slice(0, 3));
		setShowAll(!showAll);
		setIsLoading(false);
	};

	return (
		<>
			<FlatList
				data={data}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<TourItem
						key={item.tourId}
						tour={item}
					/>
				)}
			/>
			{isLoading ? (
				<ActivityIndicator size={"large"}></ActivityIndicator>
			) : (
				listTour.length > 3 && (
					<TouchableOpacity
						onPress={() => (showAll ? handleShowLess() : handleShowAll())}
						style={{
							borderRadius: 5,
							alignItems: "center",
							flexDirection: "row",
							justifyContent: "center",
							paddingVertical: 10,
							backgroundColor: Colors.colorBrand.burntSienna[50],
						}}
					>
						<Text
							style={{
								color: Colors.colorBrand.burntSienna[500],
								fontSize: 14,
								fontWeight: "bold",
							}}
						>
							{showAll ? "Thu gọn" : "Xem thêm"}
						</Text>
					</TouchableOpacity>
				)
			)}
		</>
	);
};

export default ListItem;
