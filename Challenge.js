import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';

function ChallengeDetailScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Details Challenge!</Text>
		</View>
	);
}

function ChallengeScreen({navigation}) {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Challenge</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Challenge Details')}
			/>
		</View>
	)
}

const ChallengeStack = createNativeStackNavigator();

export default function Challenge() {
	return (
		<ChallengeStack.Navigator>
			<ChallengeStack.Screen name="Challenge" component={ChallengeScreen} />
			<ChallengeStack.Screen name="Challenge Details" component={ChallengeDetailScreen} />
		</ChallengeStack.Navigator>
	)
}