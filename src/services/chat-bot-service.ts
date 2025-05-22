import { Gateway } from "@/libs/axios";
import { api } from "@/libs/axios/axios.config";
import { safeApiCall } from "@/libs/axios/safe-api-call";
import { BaseResponse } from "@/types";
import { ChatResponse, TourSuggestionResponse } from "@/types/implement/chat-bot";

export const exchangeMessage = async (question: string, userId: string, threadId: string) => {
	return safeApiCall(() =>
		api.post<BaseResponse<ChatResponse<TourSuggestionResponse>>>(`${Gateway.CHATBOT}/chat`, {
			thread_id: threadId,
			question,
			user_id: userId,
		}),
	);
};
