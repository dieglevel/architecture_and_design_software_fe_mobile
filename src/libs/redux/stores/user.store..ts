import { User, Tour } from "@/types/implement";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	data: User | null;
	currentTour: Tour | null;
	showTourDetail: boolean;
}

const initialState: UserState = {
	data: null,
	currentTour: null,
	showTourDetail: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.data = action.payload;
		},
		reset: () => initialState,
		setCurrentTour: (state, action: PayloadAction<Tour | null>) => {
			state.currentTour = action.payload;
		},
		setShowTourDetail: (state, action: PayloadAction<boolean>) => {
			state.showTourDetail = action.payload;
		},
	},
});

export const { setUser, reset, setCurrentTour, setShowTourDetail } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
