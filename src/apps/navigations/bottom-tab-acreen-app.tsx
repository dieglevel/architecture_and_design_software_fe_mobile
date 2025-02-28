import { HomeScreen, SearchScreen, MessageScreen, UserScreen } from "@/apps/screens";
import { Tab } from "@/libs/navigation";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "../stacks/home-stack";
import SearchStack from "../stacks/search-stack";
import MessageStack from "../stacks/message-stack";
import UserStack from "../stacks/user-stack";

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
				component={HomeStack}
			/>
			<Tab.Screen
				name="SearchStack"
				component={SearchStack}
			/>
			<Tab.Screen
				name="MessageStack"
				component={MessageStack}
			/>
			<Tab.Screen
				name="UserStack"
				component={UserStack}
			/>
		</Tab.Navigator>
	);
};
