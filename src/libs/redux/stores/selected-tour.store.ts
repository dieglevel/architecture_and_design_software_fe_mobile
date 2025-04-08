import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tour } from "@/types/implement";

interface SelectedTourState {
	selected: Tour | null;
}

const initialState: SelectedTourState = {
	selected: null,
};

const selectedTourSlice = createSlice({
	name: "selectedTour",
	initialState,
	reducers: {
		selectTour: (state, action: PayloadAction<Tour>) => {
			state.selected = action.payload;
		},
		clearSelectedTour: (state) => {
			state.selected = null;
		},
	},
});

export const { selectTour, clearSelectedTour } = selectedTourSlice.actions;
const selectedTourReducer = selectedTourSlice.reducer;
export default selectedTourReducer;
