import { Colors } from "@/constants";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
	date: Date[];
	selectTime: Date;
	setSelectTime: (date: Date) => void;
}

export const SelectDate = ({ date, selectTime, setSelectTime }: Props) => {
	return (
		<FlatList
			data={date}
			renderItem={({ item }) => (
				<TouchableOpacity
					style={[
						styles.month,
						{
							backgroundColor: selectTime === item ? Colors.colorBrand.burntSienna[500] : "white",
						},
					]}
					onPress={() => setSelectTime(item)}
				>
					<Text
						style={{
							color: selectTime === item ? "white" : Colors.colorBrand.midnightBlue[950],
							fontWeight: "bold",
						}}
					>
						{item.toLocaleString("default", {
							month: "long",
						})}
					</Text>
				</TouchableOpacity>
			)}
			keyExtractor={(item) => item.toString()}
			horizontal
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
		/>
	);
};

const styles = StyleSheet.create({
	month: {
		fontSize: 16,
		color: Colors.colorBrand.midnightBlue[950],
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
});
