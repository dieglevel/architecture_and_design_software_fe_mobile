import { Tab } from "@/libs/navigation";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "../stacks/home-stack";
import SearchStack from "../stacks/search-stack";
import MessageStack from "../stacks/message-stack";
import UserStack from "../stacks/user-stack";
import HomeIcon from "@/assets/svgs/home";
import SearchIcon from "@/assets/svgs/search";
import MessageIcon from "@/assets/svgs/message";
import UserIcon from "@/assets/svgs/user";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";

export const BottomTabScreenApp = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconColor = focused ? "#fff" : "#461409";
					let backgroundColor = focused ? "#f27052" : "#fff";
					let size = 40;
					if (route.name === "HomeStack")
						return (
							<HomeIcon
								size={size}
								color={iconColor}
								backgroundColor={backgroundColor}
							/>
						);
					else if (route.name === "SearchStack")
						return (
							<SearchIcon
								size={size}
								color={iconColor}
								backgroundColor={backgroundColor}
							/>
						);
					else if (route.name === "MessageStack")
						return (
							<MessageIcon
								size={size}
								color={iconColor}
								backgroundColor={backgroundColor}
							/>
						);
					else if (route.name === "UserStack")
						return (
							<UserIcon
								size={size}
								color={iconColor}
								backgroundColor={backgroundColor}
							/>
						);
				},
				tabBarButton: (props: any) => (
					<TouchableOpacity
						{...props} // Chuyển tiếp tất cả các props
						activeOpacity={0.7} // Chỉnh độ mờ khi nhấn
					>
						{/* Thay icon theo từng route */}
						{props.children}
					</TouchableOpacity>
				),
				tabBarIconStyle: {
					width: "100%",
					height: "100%",
					margin: 0,
				},
				tabBarShowLabel: false,
				headerShown: false,
				tabBarHideOnKeyboard: true,
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
