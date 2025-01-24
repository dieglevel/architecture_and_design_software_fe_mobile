import { StyleSheet } from "react-native";
import { Colors } from "./color";
import { Radius } from "./radius";

export const Borders = StyleSheet.create({
	border: {
		borderWidth: 2,
		borderColor: Colors.gray[200],
		borderRadius: Radius.radiusMedium,
	},
	borderFocus: {
		borderWidth: 2,
		borderColor: Colors.colorBrand.burntSienna[500],
		borderRadius: Radius.radiusMedium,
	},
});
