import { HomeScreen, MessageScreen, SearchScreen, UserScreen } from "@/apps/screens";
import { Tab } from "@/libs/navigation";
import { Ionicons } from "@expo/vector-icons";

export const BottomTabScreenApp = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName: any;
					if (route.name === "HomeStack") iconName = "home";
					else if (route.name === "SearchStack") iconName = "search";
					else if (route.name === "MessageStack") iconName = "chatbubble";
					else if (route.name === "UserStack") iconName = "person";
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
				name="HomeStack"
				component={HomeScreen}
			/>
			<Tab.Screen
				name="SearchStack"
				component={SearchScreen}
			/>
			<Tab.Screen
				name="MessageStack"
				component={MessageScreen}
			/>
			<Tab.Screen
				name="UserStack"
				component={UserScreen}
			/>
		</Tab.Navigator>
	);
};
