import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen, SignupScreen } from "@/apps/screens";
import { Stack } from "@/libs/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabScreenApp } from "./bottom-tab-acreen-app";
import { navigationRef } from "@/libs/navigation/navigationService";
import { ForgotPasswordScreen } from "@/apps/screens/forgot-password";
import Toast from "react-native-toast-message";
import WelcomeScreen from "../screens/home/welcome-screen";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "@/services/user-service";
import { setUser } from "@/libs/redux/stores/user.store.";
import { LoadingSpin } from "../components";

export const RootScreenApp = () => {
	const insets = useSafeAreaInsets();

	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			const profile = await getProfile();
			if (profile.statusCode === 200) {
				dispatch(setUser(profile.data || null));
			}
			setIsLoading(false);
		};

		getUser();
	}, []);

	return (
		<>
			{isLoading ? (
				<LoadingSpin />
			) : (
				<NavigationContainer ref={navigationRef}>
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
							component={SignupScreen} // Add RegisterScreen here
						/>
						<Stack.Screen
							name="ForgotPasswordScreen"
							component={ForgotPasswordScreen} // Add RegisterScreen here
						/>
					</Stack.Navigator>
					<Toast />
				</NavigationContainer>
			)}
		</>
	);
};
