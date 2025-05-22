export interface Message {
	role: "assistant" | "user"; // hoặc string nếu có nhiều role khác
	content: string;
}

export interface TourSuggestionResponse {
	question: string;
	language: string;
	next_state: string;
	thread_id: string;
	user_id: string;
	messages: Message;
}

export interface ChatResponse<T> {
	data: T;
	status: number;
}
