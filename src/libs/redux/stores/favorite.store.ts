import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tour } from "@/types/implement";

interface FavoriteState {
	favorites: Tour[];
}

const initialState: FavoriteState = {
	favorites: [],
};

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<Tour>) => {
			const exists = state.favorites.some((t) => t.tourId === action.payload.tourId);
			if (!exists) state.favorites.push(action.payload);
		},
		removeFavorite: (state, action: PayloadAction<string>) => {
			state.favorites = state.favorites.filter((t) => t.tourId !== action.payload);
		},
		clearFavorites: (state) => {
			state.favorites = [];
		},
	},
});

export const { addFavorite, removeFavorite, clearFavorites } = favoriteSlice.actions;
const favoriteReducer = favoriteSlice.reducer;
export default favoriteReducer;
