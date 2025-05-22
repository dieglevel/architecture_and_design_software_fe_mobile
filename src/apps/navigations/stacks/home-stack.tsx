import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoryDetailScreen, HomeScreen, UserFavoriteTourScreen } from "@/apps/screens";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="CategoryDetailScreen"
				component={CategoryDetailScreen}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="UserFavoriteTourScreen"
				component={UserFavoriteTourScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
