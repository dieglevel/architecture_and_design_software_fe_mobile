import { useRef } from "react";
import { Animated, TouchableWithoutFeedback, ViewStyle } from "react-native";

interface Props {
	children: React.ReactNode;
	delayPressIn?: number;
	onPress?: () => void;
	style?: ViewStyle;
	disabled?: boolean;
}

export const Press = ({ children, delayPressIn = 100, onPress, style, disabled }: Props) => {
	const scaleAnim = useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(scaleAnim, {
			toValue: 0.7, // Thu nhỏ khi nhấn
			useNativeDriver: true,
			
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scaleAnim, {
			toValue: 1, // Quay về kích thước ban đầu
			useNativeDriver: true,
		}).start();
	};

	const handlePress = () => {
		handlePressIn();
		setTimeout(() => {
			onPress && onPress();
			handlePressOut();
		}, 100); // Thời gian delay sau khi nhấn xong và trước khi chạy hàm
		onPress
	}

	return (
		<TouchableWithoutFeedback
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			delayPressIn={delayPressIn} // Độ trễ nhấn
			onPress={handlePress} // Hàm xử lý khi nhấn
			disabled={disabled}
		>
			<Animated.View
				style={[
					style,
					{
						transform: [{ scale: scaleAnim }], // Áp dụng hiệu ứng scale
					},
				]}
			>
				{children}
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};