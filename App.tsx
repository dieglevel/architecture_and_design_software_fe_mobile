
import { Loading } from '@/apps/components';
import { RootScreenApp } from '@/apps/navigations';
import { fonts } from '@/assets/fonts';
import { useFonts } from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
	const [fontsLoaded] = useFonts(fonts);

	if (!fontsLoaded) {
		return <Loading size={300} />;
	}

	return (
		<SafeAreaProvider>
			<RootScreenApp />
		</SafeAreaProvider>
	);
}