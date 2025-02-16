import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
	BottomTabScreenApp: undefined;
	LoginScreen: undefined;
	RegisterScreen: undefined;
	ForgotPassowrdScreen: undefined;
	// Register: undefined;
	// ProductDetail: { productId: string };
	// SubCategory: { categoryId: string };
	// PaymentOption: { selectedItems: CartItem[]; totalPrice: number };
	// Order: undefined;
	// OrderDetail: { order: Order };
	// Feedback: undefined;
	// PaymentResult: undefined;
	// Cart: { productId: string; callback: () => void };
	// ChatAdmin: { userId: string };
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type StackScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// export type ProductDetailRouteProp = RouteProp<
// 	RootStackParamList,
// 	'ProductDetail'
// >;
// export type OrderDetailRouteProp = RouteProp<RootStackParamList, 'OrderDetail'>;
// export type CartRouteProp = RouteProp<RootStackParamList, 'Cart'>;
// export type ChatAdminRouteProp = RouteProp<RootStackParamList, 'ChatAdmin'>;
// export type PaymentOptionRouteProp = RouteProp<
// 	RootStackParamList,
// 	'PaymentOption'
// >;
