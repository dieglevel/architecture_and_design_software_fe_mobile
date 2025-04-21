import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tour } from "@/types/implement";
import { fetchHistoryTours } from "../thunks/tour.thunk";
import { TourHistoryItem } from "@/types/implement/tour-history";

interface HistoryState {
	history: Tour[];
	data: TourHistoryItem[];
	loading: boolean;
	error: string | null;
}

const initialState: HistoryState = {
	history: [],
	data: [],
	loading: false,
	error: null,
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
	extraReducers: (builder) => {
		builder
			.addCase(fetchHistoryTours.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchHistoryTours.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload ?? [];
			})
			.addCase(fetchHistoryTours.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string | null;
			});
	},
});

export const { addToHistory, clearHistory } = historySlice.actions;
const historyReducer = historySlice.reducer;
export default historyReducer;
