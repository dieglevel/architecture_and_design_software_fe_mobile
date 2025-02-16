import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen, SignupScreen } from "@/apps/screens";
import { Stack } from "@/libs/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabScreenApp } from "./bottom-tab-acreen-app";
import { navigationRef } from "@/libs/navigation/navigationService";
import { ForgotPasswordScreen } from "@/apps/screens/forgot-password";

export const RootScreenApp = () => {
	const insets = useSafeAreaInsets();

	return (
		<NavigationContainer ref={navigationRef}>
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
		</NavigationContainer>
	);
};
