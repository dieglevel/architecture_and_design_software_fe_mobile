import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
	children: ReactNode; 
	style?: ViewStyle; 
}

export const SafeAreaView = ({ children, style }: Props) => {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				{
               flex: 1,
               justifyContent: "space-between",
               alignItems: "center",
               paddingTop: insets.top,
               paddingBottom: insets.bottom,
               paddingLeft: insets.left,
               paddingRight: insets.right,
				},
				style, // Override hoặc thêm style từ props
			]}
		>
			{children}
		</View>
	);
};
