import { Tab } from "@/libs/navigation";
import HomeStack from "./stacks/home-stack";
import SearchStack from "./stacks/search-stack";
import HomeIcon from "@/assets/svgs/home";
import SearchIcon from "@/assets/svgs/search";
import MessageIcon from "@/assets/svgs/message";
import UserIcon from "@/assets/svgs/user";
import { TouchableOpacity } from "react-native";
import { Colors } from "@/constants";
import { MessageScreen } from "../screens";
import ProfileScreenBooking from "../screens/profile/profile";

export const BottomTabScreenApp = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconColor = focused ? "#fff" : "#461409";
					let backgroundColor = focused ? Colors.colorBrand.burntSienna[500] : "#fff";
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
					else if (route.name === "ProfileScreenBooking")
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
				tabBarStyle: {
					borderTopRightRadius: 7,
					borderTopLeftRadius: 7,
				},
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
				component={MessageScreen}
			/>
			<Tab.Screen
				name="ProfileScreenBooking"
				component={ProfileScreenBooking}
			/>
		</Tab.Navigator>
	);
};
