import { Colors } from "@/constants";
import { useAppDispatch } from "@/libs/redux/redux.config";
import { setPage1 } from "@/libs/redux/stores/payment.store";
import { TourScheduleResponses } from "@/types/implement";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
	item: TourScheduleResponses;
	selectTime: TourScheduleResponses;
	setSelectTime: (date: TourScheduleResponses) => void;
}

export const ItemSelectDate = ({ item, selectTime, setSelectTime }: Props) => {
    const itemStartDate = item.startDate ? new Date(item.startDate) : undefined;
    const selectStartDate = selectTime?.startDate ? new Date(selectTime.startDate) : undefined;
	 const dispatch = useAppDispatch();

    const isSelected =
        selectStartDate &&
        itemStartDate &&
        selectStartDate.getMonth() === itemStartDate.getMonth() &&
        selectStartDate.getFullYear() === itemStartDate.getFullYear();

    return (
        <TouchableOpacity
            style={[
                styles.month,
                {
                    backgroundColor: isSelected ? Colors.colorBrand.burntSienna[500] : "white",
                },
            ]}
            onPress={() => {
					dispatch(setPage1({tourScheduleId: item.tourScheduleId}))
					setSelectTime(item)
				}}
        >
            <Text
                style={{
                    color: isSelected ? "white" : Colors.colorBrand.midnightBlue[950],
                    fontWeight: "bold",
                }}
            >
                {itemStartDate
                    ? itemStartDate.toLocaleString("default", { month: "long" })
                    : ""}
            </Text>
        </TouchableOpacity>
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
