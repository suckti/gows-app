import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from '@rneui/base';
import { NavigationContainer } from '@react-navigation/native';

import Register from './Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './Signin';
import Home from './Home';

export default function App() {
	function StartScreen({navigation}) {
		return (
			<View style={styles.container}>
				<Button
					title="Register"
					buttonStyle={{
						backgroundColor: 'black',
						borderWidth: 2,
						borderColor: 'white',
						borderRadius: 30,
					}}
					containerStyle={{
						width: 200,
						marginHorizontal: 50,
						marginVertical: 10,
					}}
					titleStyle={{ fontWeight: 'bold' }}
					onPress={() => navigation.navigate('Register')}
				/>
				<Button
					title="Sign In"
					buttonStyle={{
						backgroundColor: 'black',
						borderWidth: 2,
						borderColor: 'white',
						borderRadius: 30,
					}}
					containerStyle={{
						width: 200,
						marginHorizontal: 50,
						marginVertical: 10,
					}}
					titleStyle={{ fontWeight: 'bold' }}
					onPress={() => navigation.navigate('SignIn')}
				/>
			</View>
		);
	}

	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='StartScreen'>
				<Stack.Screen name='StartScreen' component={StartScreen} options={{title: ''}}/>
				<Stack.Screen name='Register' component={Register} />
				<Stack.Screen name='SignIn' component={Signin} />
				<Stack.Screen name='Home' component={Home} />
			</Stack.Navigator>
		</NavigationContainer>

		// <View style={styles.container}>
		//   <Text>Open up App.js to start working on your app!Thank you so much</Text>
		//   <StatusBar style="auto" />
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		spacing: 4
	},
});
