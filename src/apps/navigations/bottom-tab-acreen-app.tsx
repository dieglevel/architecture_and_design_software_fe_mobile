import { HomeScreen, SearchScreen, MessageScreen, UserScreen } from "@/apps/screens";
import { Tab } from "@/libs/navigation";
import { Ionicons } from "@expo/vector-icons";

export const BottomTabScreenApp = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName: any;
					if (route.name === "HomeScreen") iconName = "home";
					else if (route.name === "SearchScreen") iconName = "search";
					else if (route.name === "MessageScreen") iconName = "chatbubble";
					else if (route.name === "UserScreen") iconName = "person";
					return (
						<Ionicons
							name={iconName}
							size={size}
							color={color}
						/>
					);
				},
				tabBarActiveTintColor: "#E67E22",
				tabBarInactiveTintColor: "gray",
				tabBarShowLabel: false,
				headerShown: false,
			})}
		>
			<Tab.Screen
				name="HomeScreen"
				component={HomeScreen}
			/>
			<Tab.Screen
				name="SearchScreen"
				component={SearchScreen}
			/>
			<Tab.Screen
				name="MessageScreen"
				component={MessageScreen}
			/>
			<Tab.Screen
				name="UserScreen"
				component={UserScreen}
			/>
		</Tab.Navigator>
	);
};
