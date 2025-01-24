import { Borders, Colors, Styles, Texts } from "@/constants";
import { useState } from "react";
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import { Press } from "../press";

interface Props {
	label: string;
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;

	left?: React.ReactNode;
	onLeftPress?: () => void;

	right?: React.ReactNode;
	onRightPress?: () => void;

	secureTextEntry?: boolean;
	required?: boolean;

	style?: StyleProp<ViewStyle>
}

export const InputForm = ({
	label,
	value,
	onChange,
	placeholder,
	left,
	onLeftPress,
	right,
	onRightPress,
	secureTextEntry,
	required,
	style,
}: Props) => {
	const [isFocus, setIsFocus] = useState(false);

	return (
		<View style={[Styles.gap8, Styles.px8, style]}>
			<Text style={[Texts.bold16, { color: Colors.colorBrand.midnightBlue[950] }]}>
				{label}
				{required && <Text style={[Texts.bold18, { color: Colors.colorBrand.burntSienna[500] }]}> *</Text>}
			</Text>
			<View
				style={[
					isFocus ? Borders.borderFocus : Borders.border,
					Styles.px8,
					Styles.gap8,
					{ flexDirection: "row", alignItems: "center", maxHeight: 40 },
				]}
			>
				{left && <View style={{ padding: 10 }}>{left}</View>}
				<TextInput
					value={value}
					onChangeText={onChange}
					placeholder={placeholder}
					secureTextEntry={secureTextEntry}
					style={[Styles.flex]}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
				/>
				{right && (
					<Press
						onPress={onRightPress}
						style={{ maxHeight: 25, maxWidth: 25 }}
					>
						{right}
					</Press>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "black",
		padding: 10,
		margin: 10,
	},
});
