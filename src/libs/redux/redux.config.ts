import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "./stores/user.store.";
import favoriteReducer from "./stores/favorite.store";
import historyReducer from "./stores/history.store";
import paymentReducer from "./stores/payment.store";

export const store = configureStore({
	reducer: {
		user: userReducer,
		favorite: favoriteReducer,
		history: historyReducer,
		payment: paymentReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
