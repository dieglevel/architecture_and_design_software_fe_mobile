import { LoginScreen, SignupScreen } from "@/apps/screens";
import { ForgotPasswordScreen } from "@/apps/screens/forgot-password";
import { Stack } from "@/libs/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { BottomTabScreenApp } from "./bottom-tab-acreen-app";

export const RootScreenApp = () => {
	const insets = useSafeAreaInsets();

	return (
		<NavigationContainer>
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
		</NavigationContainer>
	);
};
