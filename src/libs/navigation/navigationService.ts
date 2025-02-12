import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "./stack-navigator.config";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
	name: RouteName,
	params?: RootStackParamList[RouteName],
) {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	}
}
