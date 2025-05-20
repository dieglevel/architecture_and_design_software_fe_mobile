import { ItemTypeTicket } from "@/apps/components/payment";
import { SelectDate } from "@/apps/components/payment/select-date";
import { Colors } from "@/constants";
import { localePrice } from "@/utils";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import * as Linking from "expo-linking";
import { useNavigation, useRoute } from "@react-navigation/native";
import { size } from "lodash";
import { getTourDetails } from "@/services/tour-service";
import { PaymentRouteProp } from "@/libs/navigation";
import { TourScheduleResponses } from "@/types/implement";
import { formatDateToDDMMYYYY } from "@/utils/format-date";

export const PaymentScreen = () => {
	const { setOptions, goBack } = useNavigation();
	const route = useRoute<PaymentRouteProp>();

	const [data, setData] = useState<TourScheduleResponses[]>();

	const [selecteData, setSelectedData] = useState<TourScheduleResponses>();

	const [selectTime, setSelectTime] = useState<Date>();
	const [adultCount, setAdultCount] = useState<number>(1);
	const [childCount, setChildCount] = useState<number>(0);
	const [infantCount, setInfantCount] = useState<number>(0);

	const [isDisabled, setIsDisabled] = useState<boolean>(false);

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
						setSelectTime(new Date(response.data.tourScheduleResponses[0].startDate ?? ""));
						console.log("Tour Details:", response.data);
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
	}, []);

	useEffect(() => {
		if (adultCount > 0 && childCount >= 0 && infantCount >= 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [adultCount, childCount, infantCount]);

	const handleBookTicket = () => {
		const totalPrice =
			adultCount * (selecteData?.adultPrice || 0) +
			childCount * (selecteData?.childPrice || 0) +
			infantCount * (selecteData?.babyPrice || 0);
		Linking.openURL("https://docs.expo.dev/versions/latest/sdk/linking/");
	};

	const calculatorTotalPrice = () => {
		return localePrice(
			adultCount * (selecteData?.adultPrice || 0) +
				childCount * (selecteData?.childPrice || 0) +
				infantCount * (selecteData?.babyPrice || 0),
		);
	};

	const getListStartDate = (): Date[] => {
		if (!data || data.length === 0) return [];
		const startDates = data
			.filter((item) => item.startDate !== undefined)
			.map((item) => new Date(item.startDate as string | number | Date));
		return startDates.sort((a, b) => a.getTime() - b.getTime());
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				{/* Header */}
				<View style={styles.headerCard}>
					<Text style={styles.header}>GIÁ VÉ</Text>
					<View style={styles.monthSelector}>
						{data && data.length > 0 && (
							<SelectDate
								date={getListStartDate()}
								selectTime={selectTime}
								setSelectTime={setSelectTime}
							/>
						)}
					</View>
					<Text style={styles.date}>
						{selectTime &&
							selectTime.toLocaleString("default", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
							})}
					</Text>
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
								value={infantCount}
								setValue={setInfantCount}
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
