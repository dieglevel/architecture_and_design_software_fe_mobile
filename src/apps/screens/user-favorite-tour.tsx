import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
	Dimensions,
	ActivityIndicator,
	RefreshControl,
	StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/libs/redux/redux.config";
import { fetchFavoriteTours, removeFavoriteTour } from "@/libs/redux/thunks/tour.thunk";
import { TourItem } from "../components/ui";
import { FavoriteTourItem } from "@/types/implement/tour-favorite";
import { localePrice } from "@/utils";
import { navigate } from "@/libs/navigation/navigationService";

const { width } = Dimensions.get("window");

const UserFavoriteTourScreen = () => {
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const { data: favoriteTours, loading } = useAppSelector((state) => state.favorite);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		loadFavoriteTours();
	}, []);

	const loadFavoriteTours = async () => {
		try {
			await dispatch(fetchFavoriteTours()).unwrap();
		} catch (error) {
			console.error("Failed to load favorite tours:", error);
		}
	};

	const handleRemoveFavorite = async (tourId: string) => {
		try {
			await dispatch(removeFavoriteTour(tourId)).unwrap();
		} catch (error) {
			console.error("Failed to remove favorite tour:", error);
		}
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await loadFavoriteTours();
		setRefreshing(false);
	};

	const handleTourPress = (tourId: string) => {
		navigate("TourDetailScreen", { tourId });
	};

	const renderFavoriteTourItem = ({ item, index }: { item: FavoriteTourItem; index: number }) => {
		return (
			<View style={styles.animatedContainer}>
				<TouchableOpacity
					style={styles.favoriteItem}
					onPress={() => handleTourPress(item.tour.tourId)}
				>
					<Image
						source={{ uri: item.tour.thumbnail || "https://via.placeholder.com/150" }}
						style={styles.tourImage}
					/>

					<View style={styles.favoriteItemContent}>
						<Text
							style={styles.tourName}
							numberOfLines={2}
						>
							{item.tour.name}
						</Text>

						<View style={styles.infoRow}>
							<View style={styles.infoItem}>
								<Ionicons
									name="time-outline"
									size={14}
									color={Colors.gray[500]}
								/>
								<Text style={styles.infoText}>{item.tour.duration}</Text>
							</View>

							<View style={styles.infoItem}>
								<Ionicons
									name="star"
									size={14}
									color="#FFD700"
								/>
								<Text style={styles.infoText}>{item.tour.rating.toFixed(1)}</Text>
							</View>
						</View>

						<Text style={styles.tourPrice}>{localePrice(item.tour.price)}</Text>
					</View>

					<TouchableOpacity
						style={styles.removeButton}
						onPress={() => handleRemoveFavorite(item.tour.tourId)}
					>
						<Ionicons
							name="heart"
							size={22}
							color={Colors.colorBrand.burntSienna[500]}
						/>
					</TouchableOpacity>
				</TouchableOpacity>
			</View>
		);
	};

	const EmptyFavorites = () => (
		<View style={styles.emptyContainer}>
			<Ionicons
				name="heart"
				size={80}
				color={Colors.gray[300]}
			/>
			<Text style={styles.emptyTitle}>Chưa có tour yêu thích</Text>
			<Text style={styles.emptyText}>
				Khám phá tour và lưu những trải nghiệm tuyệt vời cho chuyến đi tiếp theo của bạn
			</Text>
			<TouchableOpacity
				style={styles.exploreButton}
				onPress={() => navigation.goBack()}
			>
				<Text style={styles.exploreButtonText}>Khám phá ngay</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaView
			style={styles.container}
			edges={["top"]}
		>
			<StatusBar
				barStyle="dark-content"
				backgroundColor="#fff"
			/>

			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<Ionicons
						name="chevron-back"
						size={28}
						color={Colors.colorBrand.burntSienna[500]}
					/>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Tour yêu thích</Text>
				<View style={styles.rightPlaceholder} />
			</View>

			{loading && !refreshing ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator
						size="large"
						color={Colors.colorBrand.burntSienna[500]}
					/>
					<Text style={styles.loadingText}>Đang tải danh sách...</Text>
				</View>
			) : (
				<>
					{favoriteTours.length > 0 ? (
						<FlatList
							data={favoriteTours}
							keyExtractor={(item) => item.tourFavoriteId}
							renderItem={renderFavoriteTourItem}
							contentContainerStyle={styles.listContent}
							showsVerticalScrollIndicator={false}
							refreshControl={
								<RefreshControl
									refreshing={refreshing}
									onRefresh={onRefresh}
									colors={[Colors.colorBrand.burntSienna[500]]}
									tintColor={Colors.colorBrand.burntSienna[500]}
								/>
							}
						/>
					) : (
						<EmptyFavorites />
					)}
				</>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		height: 60,
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray[100],
	},
	backButton: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.colorBrand.midnightBlue[800],
	},
	rightPlaceholder: {
		width: 40,
	},
	listContent: {
		padding: 16,
		paddingBottom: 30,
	},
	animatedContainer: {
		marginBottom: 16,
	},
	favoriteItem: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 16,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
		height: 120,
	},
	tourImage: {
		width: 120,
		height: "100%",
	},
	favoriteItemContent: {
		flex: 1,
		padding: 12,
		justifyContent: "space-between",
	},
	tourName: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.colorBrand.midnightBlue[900],
		marginBottom: 8,
	},
	infoRow: {
		flexDirection: "row",
		marginBottom: 8,
	},
	infoItem: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 16,
	},
	infoText: {
		fontSize: 12,
		color: Colors.gray[700],
		marginLeft: 4,
	},
	tourPrice: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.colorBrand.burntSienna[600],
	},
	removeButton: {
		padding: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		marginTop: 12,
		fontSize: 16,
		color: Colors.gray[600],
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},
	emptyTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.colorBrand.midnightBlue[800],
		marginTop: 20,
		marginBottom: 12,
	},
	emptyText: {
		fontSize: 16,
		color: Colors.gray[600],
		textAlign: "center",
		marginBottom: 24,
	},
	exploreButton: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		paddingHorizontal: 24,
		paddingVertical: 14,
		borderRadius: 10,
	},
	exploreButtonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export { UserFavoriteTourScreen };
export default UserFavoriteTourScreen;
