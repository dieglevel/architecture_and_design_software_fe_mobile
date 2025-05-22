import { Booking } from '@/types/implement/booking';
import { BookingHistoryDetailScreen } from './../../apps/screens/profile/booking-history/booking-history-detail-screen';
import { RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
	BottomTabScreenApp: undefined;
	LoginScreen: undefined;
	RegisterScreen: undefined;
	ForgotPasswordScreen: undefined;
	WelcomeScreen: undefined;
	TourDetailScreen: { tourId: string };
	ProfileScreen: undefined;
	ProfileScreenBooking: undefined;
	ProfileDetailsScreen: undefined;
	ProfileSecurityScreen: undefined;
	UserFavoriteTourScreen: undefined;
	OtpInputScreen: { email: string };
	ResetPasswordScreen: { email: string; otp: string };
	SearchScreen: undefined;
	SearchResultsScreen: {
		departure?: string;
		destination?: string;
		departureDate?: string;
		returnDate?: string;
	};
	CategoryDetailScreen: {
		categoryId: string;
		categoryName: string;
		categoryIcon: string;
		categoryImage: string;
		categoryDescription: string;
	};
	PaymentScreen: {
		tourId: string;
		
	};
	PaymentSuccessPage: undefined;
	PaymentFormBooking: undefined;
	BookingHistoryScreen:undefined;
	BookingHistoryDetailScreen: {
		bookingData: Booking;
	}
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type StackScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type TourDetailRouteProp = RouteProp<RootStackParamList, "TourDetailScreen">;
export type PaymentRouteProp = RouteProp<RootStackParamList, "PaymentScreen">;
export type BookingHistoryDetailScreenRouteProp = RouteProp<RootStackParamList, "BookingHistoryDetailScreen">;