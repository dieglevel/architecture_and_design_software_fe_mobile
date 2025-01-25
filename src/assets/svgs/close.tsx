import { Colors } from "@/constants";
import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

interface Props {
	color?: string;
	size?: number;
	outline?: string;
}

export const Close = ({ color = Colors.colorBrand.burntSienna[500], size = 25, outline = "#7C87FF" }: Props) => (
	<Svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
	>
		<G clip-path="url(#clip0_1558_29788)">
			<Path
				d="M2.27509 23.8503C1.68667 23.8845 1.10799 23.6889 0.661067 23.3047C-0.220356 22.418 -0.220356 20.986 0.661067 20.0993L19.9613 0.798977C20.8781 -0.058864 22.3166 -0.0111772 23.1745 0.90558C23.9502 1.7346 23.9954 3.00882 23.2803 3.89069L3.86635 23.3047C3.42519 23.6833 2.85579 23.8786 2.27509 23.8503Z"
				fill={color}
			/>
			<Path
				d="M21.5525 23.8503C20.9562 23.8478 20.3846 23.611 19.9612 23.1911L0.660883 3.89067C-0.155709 2.93708 -0.0446888 1.50198 0.9089 0.685312C1.76 -0.0435416 3.01521 -0.0435416 3.86624 0.685312L23.2802 19.9856C24.1967 20.8437 24.2441 22.2823 23.3861 23.1989C23.3519 23.2353 23.3167 23.2706 23.2802 23.3047C22.8048 23.7181 22.1792 23.9157 21.5525 23.8503Z"
				fill={color}
			/>
		</G>
	</Svg>
);
