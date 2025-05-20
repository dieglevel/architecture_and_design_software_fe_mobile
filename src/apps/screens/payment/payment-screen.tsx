import { ItemTypeTicket } from "@/apps/components/payment";
import { SelectDate } from "@/apps/components/payment/select-date";
import { Colors } from "@/constants";
import { localePrice } from "@/utils";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import * as Linking from "expo-linking";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { size } from "lodash";
import { getTourDetails } from "@/services/tour-service";
import { PaymentRouteProp } from "@/libs/navigation";
import { TourScheduleResponses } from "@/types/implement";
import { formatDateToDDMMYYYY } from "@/utils/format-date";
import { useAppDispatch, useAppSelector } from "@/libs/redux/redux.config";
import { setPage1 } from "@/libs/redux/stores/payment.store";

export const PaymentScreen = () => {
	const navigation = useNavigation();

	const { setOptions, goBack } = useNavigation();
	const route = useRoute<PaymentRouteProp>();
	const { adultCount, babyCount, bookingId, childCount, information, totalPrice, tourScheduleId } = useAppSelector(
		(state) => state.payment,
	);
	const dispatch = useAppDispatch();

	const [data, setData] = useState<TourScheduleResponses[]>();

	const [selecteData, setSelectedData] = useState<TourScheduleResponses>();

	const [selectTime, setSelectTime] = useState<TourScheduleResponses>();

	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const focus = useIsFocused();
	useEffect(() => {
		setOptions({
			headerShown: true,
			headerTitle: "Đặt vé",
			headerTitleAlign: "start",
			headerTintColor: Colors.colorBrand.burntSienna[500],
			headerTitleStyle: {
				fontSize: 24,
				fontWeight: "bold",
				color: Colors.colorBrand.burntSienna[500],
			},
			headerStyle: {
				elevation: 0,
				shadowColor: "transparent",
			},
			headerLeft: () => (
				<TouchableOpacity
					style={{ padding: 8 }}
					onPress={() => {
						goBack();
					}}
				>
					<AntDesign
						name="arrowleft"
						size={24}
						color={Colors.colorBrand.burntSienna[500]}
					/>
				</TouchableOpacity>
			),
		});

		const fetchData = async () => {
			const { params } = route;
			try {
				const response = await getTourDetails(params.tourId);
				if (response && response.statusCode === 200) {
					setData(response.data?.tourScheduleResponses || []);
					if (response.data?.tourScheduleResponses && response.data.tourScheduleResponses.length > 0) {
						setSelectedData(response.data.tourScheduleResponses[0]);
						setSelectTime(response.data.tourScheduleResponses[0]);
					}
				}
			} catch (error) {
				Toast.show({
					type: "error",
					text1: "Lỗi",
					text2: "Không thể tải thông tin tour. Vui lòng thử lại sau.",
					autoHide: true,
				});
			}
		};

		fetchData();
	}, [focus]);

	useEffect(() => {
		if (adultCount > 0 && childCount >= 0 && babyCount >= 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [adultCount, childCount, babyCount]);

	const handleBookTicket = () => {
		const totalPrice =
			adultCount * (selecteData?.adultPrice || 0) +
			childCount * (selecteData?.childPrice || 0) +
			babyCount * (selecteData?.babyPrice || 0);
		dispatch(setPage1({ totalPrice }));
		navigation.navigate("PaymentFormBooking")

	};

	const calculatorTotalPrice = () => {
		return localePrice(
			adultCount * (selecteData?.adultPrice || 0) +
				childCount * (selecteData?.childPrice || 0) +
				babyCount * (selecteData?.babyPrice || 0),
		);
	};

	const setAdultCount = (value: number) => {
		if (value < 1) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
		dispatch({
			type: "payment/setPage1",
			payload: { adultCount: value },
		});
	};

	const setChildCount = (value: number) => {
		dispatch({
			type: "payment/setPage1",
			payload: { childCount: value },
		});
	};

	const setBabyCount = (value: number) => {
		dispatch({
			type: "payment/setPage1",
			payload: { babyCount: value },
		});
	};

	return (
		<ScrollView>
			{data && (
				<View style={styles.container}>
					{/* Header */}
					<View style={styles.headerCard}>
						<Text style={styles.header}>GIÁ VÉ</Text>
						<View style={styles.monthSelector}>
							{data && data.length > 0 && (
								<SelectDate
									date={data}
									selectTime={selectTime || data[0]}
									setSelectTime={setSelectTime}
								/>
							)}
						</View>

					</View>

					{selectTime && (
						<>
							{/* Date Section */}
							<View style={styles.card}>
								<Text style={styles.sectionTitle}>Thời gian xuất phát</Text>
								<View style={styles.dateRange}>
									<Text style={styles.dateLabel}>{`Ngày đi: ${formatDateToDDMMYYYY(
										selecteData?.startDate || null,
									)}`}</Text>
									<Text style={styles.dateLabel}>{`Ngày về: ${formatDateToDDMMYYYY(
										selecteData?.endDate || null,
									)}`}</Text>
								</View>
							</View>

							{/* Price Section */}
							<View style={[styles.card, styles.priceSection]}>
								<Text style={styles.sectionTitle}>Giá Tour</Text>
								<ItemTypeTicket
									icon="user"
									title="Người lớn"
									description="Từ 12 tuổi trở lên"
									price={selecteData?.adultPrice || 0}
									value={adultCount}
									setValue={setAdultCount}
									minValue={1}
								/>
								<ItemTypeTicket
									icon="child"
									title="Trẻ em"
									description="Từ 2 tuổi đến 12 tuổi"
									price={selecteData?.childPrice || 0}
									value={childCount}
									setValue={setChildCount}
								/>
								<ItemTypeTicket
									icon="baby"
									title="Em bé"
									description="Từ 2 tuổi trở xuống"
									price={selecteData?.babyPrice || 0}
									value={babyCount}
									setValue={setBabyCount}
								/>
								<View style={styles.divider} />
								<View style={styles.totalRow}>
									<Text style={styles.totalLabel}>Tổng cộng</Text>
									<Text style={styles.totalPrice}>{calculatorTotalPrice()}</Text>
								</View>
							</View>

							{/* Button */}
							<TouchableOpacity
								style={[styles.button, isDisabled && styles.buttonDisabled]}
								onPress={handleBookTicket}
								disabled={isDisabled}
								activeOpacity={0.85}
							>
								<Text style={styles.buttonText}>Đặt ngay</Text>
							</TouchableOpacity>
						</>
					)}
				</View>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.colorBrand.midnightBlue[50],
		padding: 16,
	},
	headerCard: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 20,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 3,
		alignItems: "center",
	},
	header: {
		fontSize: 26,
		fontWeight: "bold",
		color: Colors.colorBrand.burntSienna[500],
		marginBottom: 8,
	},
	monthSelector: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 8,
		alignItems: "center",
	},
	date: {
		padding: 8,
		fontSize: 22,
		textAlign: "center",
		fontWeight: "bold",
		color: Colors.colorBrand.midnightBlue[700],
		marginBottom: 0,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 20,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 2,
	},
	sectionTitle: {
		fontWeight: "700",
		fontSize: 18,
		color: Colors.colorBrand.midnightBlue[900],
		marginBottom: 10,
	},
	dateRange: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 8,
		marginTop: 8,
	},
	dateLabel: {
		fontSize: 16,
		color: Colors.colorBrand.midnightBlue[950],
		fontWeight: "500",
	},
	priceSection: {
		gap: 8,
	},
	divider: {
		height: 1,
		backgroundColor: Colors.gray[200],
		marginVertical: 12,
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	totalLabel: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.colorBrand.burntSienna[500],
	},
	totalPrice: {
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.colorBrand.burntSienna[700],
	},
	button: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		paddingVertical: 18,
		borderRadius: 16,
		alignItems: "center",
		marginTop: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.12,
		shadowRadius: 6,
		elevation: 2,
	},
	buttonDisabled: {
		backgroundColor: Colors.colorBrand.burntSienna[200],
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
		letterSpacing: 1,
	},
});
