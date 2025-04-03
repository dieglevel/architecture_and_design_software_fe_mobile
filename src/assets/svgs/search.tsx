import React from "react";
import Svg, { Path } from "react-native-svg";
interface HomeIconProps {
	size?: number;
	color?: string;
}
const SearchIcon: React.FC<HomeIconProps> = ({ size = 36, color = "#461409" }) => {
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
				d="M10 17C10 13.134 13.134 10 17 10C20.866 10 24 13.134 24 17C24 18.8836 23.2561 20.5934 22.046 21.8516C22.0103 21.8788 21.9759 21.9087 21.9433 21.9413C21.9106 21.9741 21.8806 22.0085 21.8533 22.0443C20.5949 23.2554 18.8844 24 17 24C13.134 24 10 20.866 10 17ZM22.6188 24.031C21.0789 25.2632 19.1255 26 17 26C12.0294 26 8 21.9706 8 17C8 12.0294 12.0294 8 17 8C21.9706 8 26 12.0294 26 17C26 19.1245 25.2639 21.0771 24.0328 22.6166L27.7075 26.2913C28.098 26.6819 28.098 27.315 27.7075 27.7055C27.317 28.0961 26.6838 28.0961 26.2933 27.7055L22.6188 24.031Z"
				fill={color}
			/>
		</Svg>
	);
};

export default SearchIcon;
