import { NavigationContainer } from "@react-navigation/native";

import { LoginScreen } from "@/apps/screens";
import { Stack } from "@/libs/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
			</Stack.Navigator>
		</NavigationContainer>
	);
};
