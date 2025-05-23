import {
	LoginScreen,
	PaymentFormBooking,
	PaymentScreen,
	PaymentSuccessPage,
	SignupScreen,
	TourDetailScreen,
} from "@/apps/screens";
import { ForgotPasswordScreen } from "@/apps/screens/forgot-password";
import { OtpInputScreen } from "@/apps/screens/otp-input";
import { ResetPasswordScreen } from "@/apps/screens/reset-password";
import { eventEmitter } from "@/libs/eventemitter3";
import { RootStackParamList, Stack, StackScreenNavigationProp } from "@/libs/navigation";
import { navigate, navigationRef } from "@/libs/navigation/navigationService";
import { RootState } from "@/libs/redux/redux.config";
import { setUser } from "@/libs/redux/stores/user.store.";
import { getProfile } from "@/services/user-service";
import { LinkingOptions, NavigationContainer, useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpin } from "../components";
import WelcomeScreen from "../screens/home/welcome-screen";
import UserFavoriteTourScreen from "../screens/user-favorite-tour";
import { BottomTabScreenApp } from "./bottom-tab-acreen-app";

import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { BookingHistoryDetailScreen } from "../screens/profile/booking-history/booking-history-detail-screen";
import { BookingHistoryScreen } from "../screens/profile/booking-history/booking-history-screen";
import { ProfileDetailsScreen } from "../screens/profile/profile-details";
import { ProfileSecurityScreen } from "../screens/profile/profile-security";
import LimiterScreen from "../screens/limiter-screen";
const prefix = Linking.createURL("/");

// Separate component for event listener logic inside NavigationContainer
const NavigationEventListener = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();

	useEffect(() => {
		const logoutListener = () => {
			navigation.navigate("LoginScreen");
		};

		eventEmitter.on("logout", logoutListener);

		return () => {
			eventEmitter.off("logout", logoutListener);
		};
	}, [navigation]);

	return null;
};

export const RootScreenApp = () => {
	const dispatch = useDispatch();
	const showTourDetail = useSelector((state: RootState) => state.user.showTourDetail);
	const currentTour = useSelector((state: RootState) => state.user.currentTour);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			const profile = await getProfile();
			if (profile?.statusCode === 200) {
				dispatch(setUser(profile.data || null));
			}
			setIsLoading(false);
		};

		getUser();
	}, []);

	const linking: LinkingOptions<RootStackParamList> = {
		prefixes: [prefix, "https://travelsummornersrift.quindart.shop"],
		config: {
			screens: {
				WelcomeScreen: "welcome",
				LoginScreen: "login",
				RegisterScreen: "register",
				ForgotPasswordScreen: "forgot-password",
				OtpInputScreen: "otp-input",
				ResetPasswordScreen: "reset-password",
				PaymentScreen: "payment",
				PaymentSuccessPage: "payment-success",
			},
		},
	};

	useEffect(() => {
		const handleDeepLink = (event: Linking.EventType) => {
			const url = event.url;
			console.log("URL received: ", url);
			// xử lý theo url
		};

		const subscription = Linking.addEventListener("url", handleDeepLink);

		// Kiểm tra nếu app được mở từ link khi đã đóng
		Linking.getInitialURL().then((url) => {
			if (url) {
				console.log("App opened with URL: ", url);
			}
		});

		return () => subscription.remove();
	}, []);

	return (
		<>
			{isLoading ? (
				<LoadingSpin />
			) : (
				<NavigationContainer
					ref={navigationRef}
					linking={linking}
				>
					<Stack.Navigator
						initialRouteName="LimiterScreen"
						screenOptions={{
							headerShown: false,
							animation: "fade_from_bottom",
						}}
					>
						<Stack.Screen
							name="WelcomeScreen"
							component={WelcomeScreen}
						/>
						<Stack.Screen
							name="LimiterScreen"
							component={LimiterScreen}
						/>
						<Stack.Screen
							name="BottomTabScreenApp"
							component={BottomTabScreenApp}
						/>
						<Stack.Screen
							name="LoginScreen"
							component={LoginScreen}
						/>
						<Stack.Screen
							name="RegisterScreen"
							component={SignupScreen}
						/>
						<Stack.Screen
							name="ForgotPasswordScreen"
							component={ForgotPasswordScreen}
						/>
						<Stack.Screen
							name="PaymentSuccessPage"
							component={PaymentSuccessPage}
						/>
						<Stack.Screen
							name="PaymentFormBooking"
							options={{
								headerShown: true,
								headerTitle: "Thông tin đặt vé",
								headerTintColor: Colors.colorBrand.burntSienna[500],
								headerTitleStyle: {
									fontSize: 24,
									fontWeight: "bold",
									color: Colors.colorBrand.burntSienna[500],
								},
							}}
							component={PaymentFormBooking}
						/>
						<Stack.Screen
							name="OtpInputScreen"
							component={OtpInputScreen}
						/>
						<Stack.Screen
							name="ResetPasswordScreen"
							component={ResetPasswordScreen}
						/>
						<Stack.Screen
							name="PaymentScreen"
							options={{
								headerShown: true,
							}}
							component={PaymentScreen}
						/>
						<Stack.Screen
							name="UserFavoriteTourScreen"
							component={UserFavoriteTourScreen}
						/>
						<Stack.Screen
							name="ProfileDetailsScreen"
							component={ProfileDetailsScreen}
							options={{
								headerShown: true,
								title: "Thông tin cá nhân",
								headerTitleAlign: "center",
								headerLeft: () => (
									<TouchableOpacity
										onPress={() => navigate("BottomTabScreenApp")}
										style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}
									>
										<Ionicons
											name="chevron-back"
											size={24}
											color={Colors.colorBrand.burntSienna[500]}
										/>
									</TouchableOpacity>
								),
							}}
						/>
						<Stack.Screen
							name="BookingHistoryScreen"
							component={BookingHistoryScreen}
							options={{
								headerShown: true,
								title: "Lịch sử đặt vé",
								headerTitleAlign: "center",
								headerLeft: () => (
									<TouchableOpacity
										onPress={() => navigate("BottomTabScreenApp")}
										style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}
									>
										<Ionicons
											name="chevron-back"
											size={24}
											color={Colors.colorBrand.burntSienna[500]}
										/>
									</TouchableOpacity>
								),
							}}
						/>
						<Stack.Screen
							name="ProfileSecurityScreen"
							component={ProfileSecurityScreen}
							options={{
								headerShown: true,
								title: "Bảo mật tài khoản",
								headerTitleAlign: "center",
								headerLeft: () => (
									<TouchableOpacity
										onPress={() => navigate("BottomTabScreenApp")}
										style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}
									>
										<Ionicons
											name="chevron-back"
											size={24}
											color={Colors.colorBrand.burntSienna[500]}
										/>
									</TouchableOpacity>
								),
							}}
						/>
						<Stack.Screen
							name="BookingHistoryDetailScreen"
							component={BookingHistoryDetailScreen}
							options={{
								headerShown: true,
								title: "Chi tiết đặt vé",
								headerTitleAlign: "center",
								headerLeft: () => (
									<TouchableOpacity
										onPress={() => navigate("BottomTabScreenApp")}
										style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}
									>
										<Ionicons
											name="chevron-back"
											size={24}
											color={Colors.colorBrand.burntSienna[500]}
										/>
									</TouchableOpacity>
								),
							}}
						/>
						<Stack.Screen
							name="TourDetailScreen"
							component={TourDetailScreen}
							options={{
								headerShown: true,
								presentation: "card",
							}}
						/>
					</Stack.Navigator>
					<NavigationEventListener />
					<Toast />
				</NavigationContainer>
			)}
		</>
	);
};
