import { Button, Alert, Text, View } from 'react-native';

function promptAsync(){
	Alert.alert('', 'sync to strava');
}

export default function Profile() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Profile</Text>
			<Button title="Sync To Strava" onPress={() => promptAsync()}/>
		</View>
	)
}