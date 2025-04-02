import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "../../components";
import { TourItem } from "../../components/ui";
import { useEffect, useState } from "react";
import HeadText from "./components/head-text";
import { Tour } from "@/types/implement";
import Header from "./container/header";
import ListItem from "./container/list-item";
import { Divider } from "react-native-paper";
import { handleGetTours } from "./handle";

export const HomeScreen = () => {
	const [listTour, setListTour] = useState<Tour[]>([]);

	useEffect(() => {
		handleGetTours(setListTour);
	}, []);



	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff", alignItems: "stretch" }}>
			{/* Header renderItem Footer */}
			{/* => (Header + FlatList) -> RenderItem */}
			<FlatList
				ListHeaderComponent={() => (
					<View style={{ padding: 10, flex: 1, gap: 10 }}>
						<Header />

						<HeadText title="Những Địa Điểm Nổi Bật" />
						<ListItem listTour={listTour} />

						<Divider></Divider>

						<HeadText title="Tour Ba Miền" />
					</View>
				)}
				data={listTour}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<TourItem
						key={item.tourId}
						tour={item}
					/>
				)}
				keyExtractor={(_, index) => index.toString()}
				contentContainerStyle={{ paddingVertical: 8 }}
				nestedScrollEnabled={true}
				style={{ flex: 1 }}
			/>
		</SafeAreaView>
	);
};
