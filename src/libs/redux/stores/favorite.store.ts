import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tour } from "@/types/implement";
import { fetchFavoriteTours, addFavoriteTour } from "../thunks/tour.thunk";
import { FavoriteTourItem } from "@/types/implement/tour-favorite";

interface FavoriteState {
	data: FavoriteTourItem[];
	loading: boolean;
	error: string | null;
}

const initialState: FavoriteState = {
	data: [],
	loading: false,
	error: null,
};

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<FavoriteTourItem>) => {
			const exists = state.data.some((t) => t.tour.tourId === action.payload.tour.tourId);
			if (!exists) state.data.push(action.payload);
		},
		removeFavorite: (state, action: PayloadAction<string>) => {
			state.data = state.data.filter((t) => t.tourFavoriteId !== action.payload);
		},
		clearFavorites: (state) => {
			state.data = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFavoriteTours.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFavoriteTours.fulfilled, (state, action) => {
				state.loading = false;
				const newFavorite = action.payload?.[0];

				if (newFavorite && !state.data.some((f) => f.tour.tourId === newFavorite.tour.tourId)) {
					state.data.push(newFavorite);
				}
			})
			.addCase(fetchFavoriteTours.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string | null;
			})
			.addCase(addFavoriteTour.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addFavoriteTour.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload) {
					// Add the new favorite to the state if it doesn't already exist
					const newFavorites = action.payload.filter(
						(newFav) =>
							!state.data.some(
								(existingFav) => existingFav.tourFavoriteId === newFav.tourFavoriteId,
							),
					);
					state.data.push(...newFavorites);
				}
			})
			.addCase(addFavoriteTour.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string | null;
			});
	},
});

export const { addFavorite, removeFavorite, clearFavorites } = favoriteSlice.actions;
const favoriteReducer = favoriteSlice.reducer;
export default favoriteReducer;
