import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{ headerShown: false }}
			/>

			{/* <Stack.Screen
        name="PlayList"
        component={PlayList}
        options={{ headerShown: false }}
      /> */}
		</Stack.Navigator>
	);
}
