import { Colors } from "@/constants";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ItemSelectDate } from "./item-select-date";
import { TourScheduleResponses } from "@/types/implement";

interface Props {
	date: TourScheduleResponses[];
	selectTime: TourScheduleResponses;
	setSelectTime: (date: TourScheduleResponses) => void;
}

export const SelectDate = ({ date, selectTime, setSelectTime }: Props) => {
	return (
		<>
			{selectTime && (
				<FlatList
					data={date}
					renderItem={({ item }) => (
						<ItemSelectDate
							item={item}
							selectTime={selectTime}
							setSelectTime={setSelectTime}
						/>
					)}
					keyExtractor={(item) => item.toString()}
					horizontal
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</>
	);
};
