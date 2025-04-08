import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tour } from "@/types/implement";

interface HistoryState {
	history: Tour[];
}

const initialState: HistoryState = {
	history: [],
};

const historySlice = createSlice({
	name: "history",
	initialState,
	reducers: {
		addToHistory: (state, action: PayloadAction<Tour>) => {
			// Xóa nếu đã có rồi, để thêm mới vào đầu
			state.history = state.history.filter((t) => t.tourId !== action.payload.tourId);
			state.history.unshift(action.payload);

			// Giới hạn lịch sử ví dụ 20 tour
			if (state.history.length > 20) state.history.pop();
		},
		clearHistory: (state) => {
			state.history = [];
		},
	},
});

export const { addToHistory, clearHistory } = historySlice.actions;
const historyReducer = historySlice.reducer;
export default historyReducer;
