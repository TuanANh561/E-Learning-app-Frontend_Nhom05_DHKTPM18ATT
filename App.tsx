import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './AppNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens(); // ✅ Kích hoạt screens native

export default function App() {
	return (
		<SafeAreaProvider>
			<AppNavigator />
		</SafeAreaProvider>
	);
}