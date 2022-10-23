import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from '@rneui/base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

import Register from './Register';
import Login from './Login';
import Home from './Home';
import ForgotPassword from './ForgotPassword';

import SplashScreen from './SplashScreen';
import { AuthContext } from './AuthContext';

import * as secureStore from 'expo-secure-store';
import * as Device from 'expo-device';

export default function App() {
	const serverUrl = 'http://170.187.229.26';
	const initialState = {
		isLoading: true,
		isSignout: false,
		userToken: null
	};
	const stateFunction = (prevState, action) => {
		switch (action.type) {
			case 'restore_token':
				return {
					...prevState,
					userToken: action.token,
					isLoading: false
				};
			case 'login':
				return {
					...prevState,
					isSignOut: false,
					userToken: action.token
				};
			case 'logout':
				return {
					...prevState,
					isSignOut: true,
					userToken: null
				};
		}
	};

	const authContext = {
		login: async (email, password) => {
			try {
				let loginRequest = await axios.post(`${serverUrl}/api/auth/login`, {
					email: email,
					password: password,
					device_name: `${Device.manufacturer}`
				});
				let data = loginRequest.data.data;
				if (loginRequest.status == 200) {
					await secureStore.setItemAsync('userToken', data.access_token);
					dispatch({ type: 'login', token: data.access_token });
				}
			} catch (e) {
				if (e.response.data.message) {
					Alert.alert('', e.response.data.message);
				} else {
					Alert.alert('', e.message);
				}

				return;
			}
		},
		logout: async () => {
			await secureStore.deleteItemAsync('userToken');
			dispatch({ type: 'logout' })
		},
		register: async (name, email, password) => {
			try {
				let registerRequest = await axios.post(`${serverUrl}/api/auth/register`, {
					name: name,
					email: email,
					password: password,
					device_name: `${Device.manufacturer}`
				});
				let data = registerRequest.data.data;
				if (registerRequest.status == 200) {
					await secureStore.setItemAsync('userToken', data.access_token);
					Alert.alert(registerRequest.data.message)
					dispatch({ type: 'login', token: data.access_token });
				}
			} catch (e) {
				if (e.response.data.message) {
					Alert.alert('', e.response.data.message);
				} else {
					Alert.alert('', e.mesage);
				}
				return;
			}
		},
		forgotPassword: async (email) => {
			try {
				let resetPassRequest = await axios.post(`${serverUrl}/api/auth/forgot-password`, {
					email: email,
				});
				if (resetPassRequest.status == 200) {
					Alert.alert('', resetPassRequest.data.message)
					dispatch({ type: 'logout' })
				}
			} catch (e) {
				if (e.response.data.message) {
					Alert.alert('', e.response.data.message);
				} else {
					Alert.alert('', e.mesage);
				}
				return;
			}
		}
	};

	useEffect(() => {
		const bootstrapAsync = async () => {
			let userToken;
			try {
				userToken = await secureStore.getItemAsync('userToken')
			} catch (err) {
				Alert.alert(err.message)
			}

			dispatch({ type: 'restore_token', token: userToken })
		};
		bootstrapAsync();
	}, []);

	const [state, dispatch] = useReducer(stateFunction, initialState);

	function StartScreen({ navigation }) {
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
					title="Login"
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
					onPress={() => navigation.navigate('Login')}
				/>
			</View>
		);
	}

	if (state.isLoading) {
		return <SplashScreen />
	}

	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
			<AuthContext.Provider value={authContext}>
				<Stack.Navigator>
					{state.userToken == null ? (
						<>
							<Stack.Screen name='StartScreen' component={StartScreen} options={{ title: '' }} />
							<Stack.Screen name='Register' component={Register} />
							<Stack.Screen name='Login' component={Login} />
							<Stack.Screen name='ForgotPassword' component={ForgotPassword} />
						</>
					) : (
						<Stack.Group screenOptions={{headerShown: false}}>
							<Stack.Screen name='Home' component={Home} options={{ title: '' }} />
						</Stack.Group>
					)}
				</Stack.Navigator>
			</AuthContext.Provider>
		</NavigationContainer>
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
