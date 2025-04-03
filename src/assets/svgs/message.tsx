import React from "react";
import Svg, { Path } from "react-native-svg";

interface MessageIconProps {
	size?: number;
	color?: string;
}
const MessageIcon: React.FC<MessageIconProps> = ({ size = 36, color = "#461409" }) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 36 36"
			fill="none"
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M28.997 7.92258C28.9793 7.69304 28.8827 7.46845 28.7071 7.29289C28.4206 7.00643 28.0036 6.9301 27.6476 7.06389L7.66965 14.0562C7.28265 14.1916 7.01755 14.5496 7.00084 14.9593C6.98412 15.3689 7.21919 15.7473 7.59387 15.9138L16.2424 19.7576L20.0862 28.4062C20.2527 28.7808 20.6311 29.0159 21.0408 28.9992C21.4504 28.9825 21.8084 28.7174 21.9439 28.3304L28.9368 8.35057C28.9881 8.21326 29.0082 8.06694 28.997 7.92258ZM24.1943 10.3915L10.7111 15.1106L16.7785 17.8073L24.1943 10.3915ZM18.1927 19.2215L25.6086 11.8057L20.8894 25.289L18.1927 19.2215Z"
				fill={color}
			/>
		</Svg>
	);
};

export default MessageIcon;
