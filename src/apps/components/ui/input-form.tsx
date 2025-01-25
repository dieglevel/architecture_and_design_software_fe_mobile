import { Borders, Colors, Styles, Texts } from "@/constants";
import { useState } from "react";
import { StyleProp, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { Press } from "../press";

interface Props extends React.PropsWithChildren<TextInputProps> {
	label: string;

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
	onChangeText,
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
		<View style={[Styles.gap8, style]}>
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
					onChangeText={onChangeText}
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

