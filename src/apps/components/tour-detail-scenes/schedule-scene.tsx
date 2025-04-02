import { FlatList } from "react-native";
import ScheduleItem from "../ui/schedule";
import { ScheduleItemProps } from "@/types/implement";

export const ScheduleScene = ({ schedules }: { schedules: ScheduleItemProps[] }) => (
	<FlatList
		style={{ padding: 10 }}
		data={schedules}
		renderItem={({ item }) => <ScheduleItem {...item} />}
		keyExtractor={(item, index) => index.toString()}
		nestedScrollEnabled
	/>
);
