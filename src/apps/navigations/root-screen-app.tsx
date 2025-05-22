import { LoginScreen, PaymentFormBooking, PaymentScreen, PaymentSuccessPage, SignupScreen } from "@/apps/screens";
import { ForgotPasswordScreen } from "@/apps/screens/forgot-password";
import { OtpInputScreen } from "@/apps/screens/otp-input";
import { ResetPasswordScreen } from "@/apps/screens/reset-password";
import { eventEmitter } from "@/libs/eventemitter3";
import { RootStackParamList, Stack, StackScreenNavigationProp } from "@/libs/navigation";
import { navigationRef } from "@/libs/navigation/navigationService";
import { setUser } from "@/libs/redux/stores/user.store.";
import { getProfile } from "@/services/user-service";
import { LinkingOptions, NavigationContainer, useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { LoadingSpin } from "../components";
import WelcomeScreen from "../screens/home/welcome-screen";
import UserFavoriteTourScreen from "../screens/user-favorite-tour";
import { BottomTabScreenApp } from "./bottom-tab-acreen-app";

import { Colors } from "@/constants";
import React from "react";
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
						initialRouteName="LoginScreen"
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
					</Stack.Navigator>
					<NavigationEventListener />
					<Toast />
				</NavigationContainer>
			)}
		</>
	);
};
