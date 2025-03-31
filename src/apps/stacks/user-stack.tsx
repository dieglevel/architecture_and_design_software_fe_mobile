import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile";

const Stack = createNativeStackNavigator();
export default function UserStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
