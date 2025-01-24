import { HomeScreen, UserScreen } from "@/apps/screens";
import { Tab } from "@/libs/navigation";

export const BottomTabScreenApp = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="HomeScreen"
				component={HomeScreen}
			/>
			<Tab.Screen
				name="UserScreen"
				component={UserScreen}
			/>
		</Tab.Navigator>
	);
};
