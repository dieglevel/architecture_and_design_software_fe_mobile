import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, TourDetailScreen } from "../screens";

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
				name="TourDetailScreen"
				component={TourDetailScreen}
				options={{ headerShown: true }}
			/>
		</Stack.Navigator>
	);
}
