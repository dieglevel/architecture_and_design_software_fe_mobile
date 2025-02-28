import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { SearchScreen, UserScreen } from "../screens";

const Stack = createNativeStackNavigator();
export default function UserStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="UserScreen"
				component={UserScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
