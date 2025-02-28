import { View } from "react-native";

interface CommentProps {
	name: string;
	image: string;
	date: string;
	content: string;
	rating: number;
}

export const Comment: React.FC<CommentProps> = ({ name, image, date, content, rating }) => {
	return <View></View>;
};
