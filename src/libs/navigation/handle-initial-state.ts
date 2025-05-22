import { getFavoriteTours, getHistoryTours } from "@/services/booking-service";
import getUserIdFromToken from "@/utils/get-userId-by-token";
import { store } from "../redux/redux.config";
import { fetchFavoriteTours, fetchHistoryTours } from "../redux/thunks/tour.thunk";
import { fetchUserProfile } from "../redux/thunks/user.thunk";
import { getProfile } from "@/services/user-service";

const initialFavoriteTour = async () => {
	const userId = await getUserIdFromToken();
	if (!userId) return;
	try {
		const response = await getFavoriteTours(userId);
		if (response.statusCode === 200) {
			store.dispatch(fetchFavoriteTours());
		}
	} catch (error) {
		console.log(error);
	}
};

const initialHistoryTour = async () => {
	const userId = await getUserIdFromToken();
	if (!userId) return;
	try {
		const response = await getHistoryTours(userId);
		if (response.statusCode === 200) {
			store.dispatch(fetchHistoryTours());
		}
	} catch (error) {
		console.log(error);
	}
};

const initialUserProfile = async () => {
	try {
		const response = await getProfile();
		if (response.statusCode === 200) {
			store.dispatch(fetchUserProfile());
		}
	} catch (error) {
		console.log(error);
	}
};

export const initialState = async () => {
	initialFavoriteTour();
	initialHistoryTour();
	initialUserProfile();
};
