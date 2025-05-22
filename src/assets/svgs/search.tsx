import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import Svg, { Path, Rect, Mask, Defs } from "react-native-svg";
import { searchFilterTours } from "@/services/booking-service";

interface SearchIconProps {
	size?: number;
	color?: string;
	backgroundColor?: string;
	borderRadius?: number;
}

const SearchIcon: React.FC<SearchIconProps> = ({
	size = 36,
	color = "black",
	backgroundColor = "transparent",
	borderRadius = 8,
}) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 36 36"
			fill={backgroundColor || "transparent"}
		>
			<Defs>
				<Mask
					id="mask1"
					x="0"
					y="0"
					width="36"
					height="36"
				>
					<Rect
						x="0"
						y="0"
						width="36"
						height="36"
						fill="white"
						rx={borderRadius}
						ry={borderRadius}
					/>
				</Mask>
			</Defs>
			<Rect
				width={size}
				height={size}
				fill={backgroundColor}
				mask="url(#mask1)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10 17C10 13.134 13.134 10 17 10C20.866 10 24 13.134 24 17C24 18.8836 23.2561 20.5934 22.046 21.8516C22.0103 21.8788 21.9759 21.9087 21.9433 21.9413C21.9106 21.9741 21.8806 22.0085 21.8533 22.0443C20.5949 23.2554 18.8844 24 17 24C13.134 24 10 20.866 10 17ZM22.6188 24.031C21.0789 25.2632 19.1255 26 17 26C12.0294 26 8 21.9706 8 17C8 12.0294 12.0294 8 17 8C21.9706 8 26 12.0294 26 17C26 19.1245 25.2639 21.0771 24.0328 22.6166L27.7075 26.2913C28.098 26.6819 28.098 27.315 27.7075 27.7055C27.317 28.0961 26.6838 28.0961 26.2933 27.7055L22.6188 24.031Z"
				fill={color}
			/>
		</Svg>
	);
};

interface SearchFilterProps {
	onSearchResults?: (results: any) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearchResults }) => {
	const [tourName, setTourName] = useState("");
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async () => {
		try {
			setIsLoading(true);
			const minPriceValue = minPrice ? parseFloat(minPrice) : 0;
			const maxPriceValue = maxPrice ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER;

			const response = await searchFilterTours(tourName, maxPriceValue, minPriceValue);

			if (response.success && onSearchResults) {
				onSearchResults(response.data);
			}
		} catch (error) {
			console.error("Search error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Tour name"
					value={tourName}
					onChangeText={setTourName}
				/>
				<SearchIcon
					size={24}
					color="#999"
				/>
			</View>

			<View style={styles.priceContainer}>
				<TextInput
					style={styles.priceInput}
					placeholder="Min price"
					value={minPrice}
					onChangeText={setMinPrice}
					keyboardType="numeric"
				/>
				<Text style={styles.priceDivider}>-</Text>
				<TextInput
					style={styles.priceInput}
					placeholder="Max price"
					value={maxPrice}
					onChangeText={setMaxPrice}
					keyboardType="numeric"
				/>
			</View>

			<TouchableOpacity
				style={styles.searchButton}
				onPress={handleSearch}
				disabled={isLoading}
			>
				<Text style={styles.searchButtonText}>{isLoading ? "Searching..." : "Search"}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#fff",
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 12,
	},
	input: {
		flex: 1,
		height: 48,
		fontSize: 16,
	},
	priceContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 12,
	},
	priceInput: {
		flex: 1,
		height: 48,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 16,
	},
	priceDivider: {
		marginHorizontal: 8,
		fontSize: 18,
		color: "#666",
	},
	searchButton: {
		backgroundColor: "#3b82f6",
		borderRadius: 8,
		height: 48,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 16,
	},
	searchButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});

export { SearchIcon, SearchFilter };
export default SearchIcon;
