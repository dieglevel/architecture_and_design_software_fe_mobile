import { SafeAreaView } from "react-native-safe-area-context";
import { Button, InputForm } from "../components/ui";
import { Calendar } from "@/assets/svgs/calendar";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useState } from "react";
import { View } from "react-native";

export const SearchScreen = () => {
	const [isDatePickVisible, setDatePickVisible] = useState<boolean>(false);

	const showDatePicker = () => {
		setDatePickVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickVisible(false);
	};

	const handleConfirm = (date: any) => {
		console.warn("A date has been picked: ", date);
		hideDatePicker();
	};
	return (
		<SafeAreaView style={{ backgroundColor: "#fff", alignItems: "stretch", padding: 13 }}>
			<InputForm
				label="Khởi hành từ"
				placeholder="Nhập địa điểm..."
			/>
			<InputForm
				label="Điểm đến"
				placeholder="Bạn muốn đi đâu?"
			/>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<InputForm
					label="Ngày đi"
					placeholder="DD/MM/YY"
					left={<Calendar />}
					onLeftPress={showDatePicker}
					style={{ width: "48%" }}
				/>
				<DateTimePicker
					isVisible={isDatePickVisible}
					onConfirm={handleConfirm}
					mode="date"
					onCancel={hideDatePicker}
				/>
				<InputForm
					label="Ngày về"
					placeholder="DD/MM/YY"
					left={<Calendar />}
					onLeftPress={showDatePicker}
					style={{ width: "48%" }}
				/>
				<DateTimePicker
					isVisible={isDatePickVisible}
					onConfirm={handleConfirm}
					mode="date"
					onCancel={hideDatePicker}
				/>
			</View>
			<Button
				style={{ marginTop: 8 }}
				onPress={() => {
					console.log("adu");
				}}
			>
				Tìm kiếm
			</Button>
		</SafeAreaView>
	);
};
