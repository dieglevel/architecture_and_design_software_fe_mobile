import { Colors, Texts } from "@/constants";
import { Text } from "react-native";

interface Props {
   title: string
}

const HeadText = ({title}: Props) => {
	return (
		<Text
			style={[
				Texts.bold20,
				{ color: Colors.colorBrand.midnightBlue[950], textAlign: "center", marginBottom: 10 },
			]}
		>
         {title}
		</Text>
	);
};

export default HeadText;
