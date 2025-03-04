import { Text, View } from "react-native";
import { SafeAreaView } from "../components";
import Comment from "../components/ui/comment";

export const MessageScreen = () => {
	const commentData = [
		{
			id: "1",
			avatar: "https://i.pravatar.cc/150?img=1",
			name: "Phung Anh Minh",
			date: "10/11/2022",
			rating: 5,
			comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
		},
		{
			id: "2",
			avatar: "https://i.pravatar.cc/150?img=2",
			name: "Nguyen Van A",
			date: "15/02/2023",
			rating: 4,
			comment: "Great service and amazing experience. Will definitely recommend to others!",
		},
		{
			id: "3",
			avatar: "https://i.pravatar.cc/150?img=3",
			name: "Tran Thi B",
			date: "05/05/2023",
			rating: 3,
			comment: "It was a decent experience. Could improve the customer service a bit more.",
		},
	];

	return (
		<SafeAreaView>
			<View>
				{commentData.map((comment) => (
					<Comment
						key={comment.id}
						avatar={comment.avatar}
						name={comment.name}
						date={comment.date}
						rating={comment.rating}
						comment={comment.comment}
					/>
				))}
			</View>
		</SafeAreaView>
	);
};
