import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Image,
} from "react-native";
import { SafeAreaView } from "../components";
import { Colors, Texts } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Message as AIMessage, TourSuggestion } from "@/services/ai";
import { exchangeMessage } from "@/services/chat-bot-service";
import { RootState } from "@/libs/redux/redux.config";
import { useSelector } from "react-redux";

// Define an interface that matches the actual response structure
interface ApiMessageContent {
	content: string;
	role: string;
}

interface ApiResponse {
	data: {
		question: string;
		language: string;
		next_state: string;
		thread_id: string;
		user_id: string;
		messages: ApiMessageContent[];
	};
	status: number;
	header: {
		"Content-Type": string;
	};
	config: any;
}

// Helper function to convert API messages to client format
const convertApiMessageToClientFormat = (message: any): AIMessage => {
	return {
		id: Date.now().toString(),
		text: typeof message === "string" ? message : message.content || "",
		type: "ai",
		timestamp: new Date(),
	};
};

// Mock tour data structure based on our UI requirements
// This will be replaced with actual data when API provides tour suggestions
const createMockTourFromResponse = (threadId: string, index: number): TourSuggestion => {
	return {
		id: `${threadId}_${index}`,
		name: `Tour suggestion ${index + 1}`,
		image: "https://picsum.photos/200/300", // Default placeholder image
		duration: "2 days",
		rating: 4.5,
		price: 1000000,
	};
};

const ChatMessage = ({ message }: { message: AIMessage }) => {
	const isUser = message.type === "user";

	return (
		<View style={[styles.messageContainer, isUser ? styles.userMessage : styles.aiMessage]}>
			{!isUser && (
				<View style={styles.avatarContainer}>
					<Ionicons
						name="person-circle"
						size={36}
						color={Colors.colorBrand.midnightBlue[500]}
					/>
				</View>
			)}
			<View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
				<Text style={[styles.messageText, isUser ? styles.userText : styles.aiText]}>{message.text}</Text>
				<Text style={styles.timestamp}>
					{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
				</Text>
			</View>
		</View>
	);
};

const TourSuggestionCard = ({ tour }: { tour: TourSuggestion }) => {
	return (
		<TouchableOpacity style={styles.tourCard}>
			<Image
				source={{ uri: tour.image }}
				style={styles.tourImage}
			/>
			<View style={styles.tourInfo}>
				<Text
					style={styles.tourName}
					numberOfLines={1}
				>
					{tour.name}
				</Text>
				<View style={styles.tourDetails}>
					<View style={styles.tourDetail}>
						<Ionicons
							name="time-outline"
							size={14}
							color={Colors.gray[600]}
						/>
						<Text style={styles.tourDetailText}>{tour.duration}</Text>
					</View>
					<View style={styles.tourDetail}>
						<Ionicons
							name="star"
							size={14}
							color="#FFD700"
						/>
						<Text style={styles.tourDetailText}>{tour.rating.toFixed(1)}</Text>
					</View>
				</View>
				<Text style={styles.tourPrice}>{tour.price.toLocaleString("vi-VN")}đ</Text>
			</View>
		</TouchableOpacity>
	);
};

export const MessageScreen = () => {
	const [messages, setMessages] = useState<AIMessage[]>([
		{
			id: "1",
			text: "Xin chào! Tôi là trợ lý AI du lịch của TravelSummonRift. Tôi có thể giúp bạn tìm tour, đề xuất điểm đến, hoặc trả lời bất kỳ câu hỏi nào về dịch vụ của chúng tôi. Bạn đang tìm kiếm điều gì?",
			type: "ai",
			timestamp: new Date(),
		},
	]);
	const [inputText, setInputText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [suggestedTours, setSuggestedTours] = useState<TourSuggestion[]>([]);
	// Store userId for API calls
	const userId = useSelector((state: RootState) => state.user.data?.userId);
	// Store thread ID from API response
	const [threadId, setThreadId] = useState<string | null>(null);

	const flatListRef = useRef<FlatList>(null);

	// Scroll to bottom whenever messages update
	useEffect(() => {
		if (flatListRef.current && messages.length > 0) {
			setTimeout(() => {
				flatListRef.current?.scrollToEnd({ animated: true });
			}, 200);
		}
	}, [messages]);

	// Handle sending a message
	const handleSendMessage = async () => {
		if (inputText.trim() === "") return;
		console.log("userId: ", userId);
		console.log("inputText: ", inputText);

		const userMessage: AIMessage = {
			id: Date.now().toString(),
			text: inputText,
			type: "user",
			timestamp: new Date(),
		};

		setMessages((prevMessages) => [...prevMessages, userMessage]);
		setInputText("");
		setIsLoading(true);

		try {
			// Cast the response to our defined interface
			const response = (await exchangeMessage(
				inputText,
				userId ?? "",
				threadId ?? "",
			)) as unknown as ApiResponse;
			console.log("response:", JSON.stringify(response, null, 2));

			// Kiểm tra response dựa trên cấu trúc thực tế
			if (response && response.status === 200) {
				// Lấy dữ liệu từ response
				const responseData = response.data;

				if (responseData) {
					// Store thread ID for future use
					setThreadId(responseData.thread_id);

					// Xử lý messages từ response
					console.log("Messages from API:", JSON.stringify(responseData.messages, null, 2));

					// Kiểm tra cấu trúc message để trích xuất nội dung
					let messageContent;

					if (Array.isArray(responseData.messages)) {
						// Nếu là mảng, lấy phần tử đầu tiên
						const firstMessage = responseData.messages[0];
						messageContent = firstMessage?.content || JSON.stringify(firstMessage);
					} else if (typeof responseData.messages === "object") {
						// Nếu là object, thử lấy content
						const msgObj = responseData.messages as any;
						messageContent = msgObj?.content || JSON.stringify(msgObj);
					} else {
						// Nếu là string hoặc dạng khác
						messageContent = String(responseData.messages);
					}

					// Convert và thêm vào danh sách tin nhắn
					if (messageContent) {
						const aiResponse = convertApiMessageToClientFormat(messageContent);
						setMessages((prevMessages) => [...prevMessages, aiResponse]);
					}

					// For now, create some mock tour suggestions based on thread ID
					// This will be replaced with actual tour data when the API provides it
					const mockTours = [1, 2, 3].map((i) =>
						createMockTourFromResponse(responseData.thread_id || "default", i),
					);
					setSuggestedTours(mockTours);
				}
			} else {
				throw new Error("Failed to get response from server");
			}
		} catch (error) {
			console.error("Error getting chat response:", error);
			const errorMessage: AIMessage = {
				id: Date.now().toString(),
				text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
				type: "system",
				timestamp: new Date(),
			};
			setMessages((prevMessages) => [...prevMessages, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	// Loading indicator component
	const renderLoading = () => {
		if (!isLoading) return null;

		return (
			<View style={styles.loadingContainer}>
				<View style={styles.loadingBubble}>
					<ActivityIndicator
						size="small"
						color={Colors.colorBrand.burntSienna[500]}
					/>
					<Text style={styles.loadingText}>AI đang trả lời...</Text>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Ionicons
					name="chatbubble-ellipses"
					size={24}
					color={Colors.colorBrand.burntSienna[500]}
				/>
				<Text style={styles.headerTitle}>Trợ lý Du lịch AI</Text>
			</View>

			<KeyboardAvoidingView
				style={styles.chatContainer}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			>
				<FlatList
					ref={flatListRef}
					data={messages}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <ChatMessage message={item} />}
					contentContainerStyle={styles.messagesContainer}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={<>{renderLoading()}</>}
				/>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Nhập câu hỏi của bạn..."
						placeholderTextColor={Colors.gray[400]}
						value={inputText}
						onChangeText={setInputText}
						multiline
						maxLength={500}
					/>
					<TouchableOpacity
						style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
						onPress={handleSendMessage}
						disabled={!inputText.trim() || isLoading}
					>
						<Ionicons
							name="send"
							size={22}
							color={Colors.gray[0]}
						/>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.gray[50],
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		backgroundColor: Colors.gray[0],
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray[200],
		width: "100%",
	},
	headerTitle: {
		...Texts.bold18,
		color: Colors.gray[900],
		marginLeft: 10,
	},
	chatContainer: {
		flex: 1,
	},
	messagesContainer: {
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	messageContainer: {
		marginTop: 16,
		flexDirection: "row",
		alignItems: "flex-end",
	},
	userMessage: {
		justifyContent: "flex-end",
	},
	aiMessage: {
		justifyContent: "flex-start",
	},
	avatarContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		marginRight: 8,
		backgroundColor: Colors.colorBrand.midnightBlue[50],
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	avatar: {
		width: 36,
		height: 36,
	},
	messageBubble: {
		maxWidth: "80%",
		borderRadius: 16,
		padding: 12,
		paddingBottom: 8,
		...Texts.shadowSmall,
	},
	userBubble: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		borderBottomRightRadius: 2,
	},
	aiBubble: {
		backgroundColor: Colors.gray[0],
		borderBottomLeftRadius: 2,
	},
	messageText: {
		...Texts.regular14,
		marginBottom: 4,
	},
	userText: {
		color: Colors.gray[0],
	},
	aiText: {
		color: Colors.gray[800],
	},
	timestamp: {
		...Texts.regular12,
		color: Colors.gray[400],
		alignSelf: "flex-end",
	},
	loadingContainer: {
		marginTop: 16,
		alignItems: "flex-start",
	},
	loadingBubble: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.gray[0],
		borderRadius: 16,
		padding: 12,
		...Texts.shadowSmall,
	},
	loadingText: {
		...Texts.regular14,
		marginLeft: 8,
		color: Colors.gray[600],
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: Colors.gray[0],
		borderTopWidth: 1,
		borderTopColor: Colors.gray[200],
		width: "100%",
	},
	input: {
		flex: 1,
		maxHeight: 100,
		minHeight: 40,
		backgroundColor: Colors.gray[50],
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingTop: 10,
		paddingBottom: 10,
		...Texts.regular14,
		color: Colors.gray[900],
	},
	sendButton: {
		marginLeft: 8,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.colorBrand.burntSienna[500],
		justifyContent: "center",
		alignItems: "center",
	},
	sendButtonDisabled: {
		backgroundColor: Colors.colorBrand.burntSienna[300],
	},
	suggestionsContainer: {
		marginTop: 16,
		backgroundColor: Colors.gray[50],
		borderRadius: 16,
		padding: 12,
	},
	suggestionsTitle: {
		...Texts.bold16,
		color: Colors.gray[800],
		marginBottom: 8,
	},
	suggestionsList: {
		paddingBottom: 8,
	},
	tourCard: {
		width: 200,
		backgroundColor: Colors.gray[0],
		borderRadius: 12,
		overflow: "hidden",
		marginRight: 12,
		...Texts.shadowSmall,
	},
	tourImage: {
		width: "100%",
		height: 120,
	},
	tourInfo: {
		padding: 10,
	},
	tourName: {
		...Texts.bold16,
		color: Colors.gray[900],
		marginBottom: 4,
	},
	tourDetails: {
		flexDirection: "row",
		marginBottom: 6,
	},
	tourDetail: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 12,
	},
	tourDetailText: {
		...Texts.regular12,
		color: Colors.gray[600],
		marginLeft: 4,
	},
	tourPrice: {
		...Texts.bold16,
		color: Colors.colorBrand.burntSienna[500],
	},
});
/*
 * AI TRAVEL ASSISTANT CHAT
 *
 * This component implements a chat interface with an AI assistant that helps users:
 * - Find tours based on keywords (beach, mountain, etc.)
 * - Get recommendations based on preferences (budget, duration, etc.)
 * - Answer FAQs about bookings, payments, cancellations, etc.
 *
 * CURRENT IMPLEMENTATION:
 * - Uses real AI services (Gemini, Claude, DeepSeek) with fallback to mock responses
 * - Displays tour suggestions related to user queries
 * - Maintains chat history during the session
 *
 * FUTURE ENHANCEMENTS:
 * - Integration with OpenAI or other AI service API
 * - Redux integration for persistent chat history
 * - Linking suggested tours to actual tour detail pages
 * - Enhanced keyword detection and natural language processing
 */
