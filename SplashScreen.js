import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen() {
	return (
		<View style={styles}>
			<Text>This is splash screen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
});