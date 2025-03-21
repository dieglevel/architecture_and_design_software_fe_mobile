import { LoginScreen, SignupScreen } from "@/apps/screens";
import { ForgotPasswordScreen } from "@/apps/screens/forgot-password";
import { RootStackParamList, Stack, StackScreenNavigationProp } from "@/libs/navigation";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { BottomTabScreenApp } from "./bottom-tab-acreen-app";
import { useEffect } from "react";
import { eventEmitter } from "@/libs/eventemitter3";

export const RootScreenApp = () => {
	const insets = useSafeAreaInsets();

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

	return (
		<>
			<Stack.Navigator
				initialRouteName="LoginScreen"
				screenOptions={{
					headerShown: false,
					animation: "fade_from_bottom",
				}}
			>
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
					name="ForgotPassowrdScreen"
					component={ForgotPasswordScreen} // Add RegisterScreen here
				/>
			</Stack.Navigator>
			<Toast />
		</>
	);
};
