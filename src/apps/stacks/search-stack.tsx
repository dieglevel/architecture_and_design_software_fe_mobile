import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchResultsScreen } from "../screens/search-results";
import { SearchScreen } from "../screens/search";

const Stack = createNativeStackNavigator();
export default function SearchStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="SearchScreen"
				component={SearchScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="SearchResultsScreen"
				component={SearchResultsScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
