import { FlatList, ScrollView, View } from "react-native";
import ScheduleItem from "../ui/schedule";
import { ScheduleItemProps } from "@/types/implement";

export const ScheduleScene = ({ schedules }: { schedules: ScheduleItemProps[] }) => (
	<ScrollView
		style={{ flex: 1 }}
		contentContainerStyle={{ flexGrow: 1 }}
		showsVerticalScrollIndicator={false}
		nestedScrollEnabled
	>
		<FlatList
			contentContainerStyle={{ padding: 10 }}
			data={schedules}
			renderItem={({ item }) => <ScheduleItem {...item} />}
			keyExtractor={(item, index) => index.toString()}
			nestedScrollEnabled
			showsVerticalScrollIndicator={false}
		/>
	</ScrollView>
);
