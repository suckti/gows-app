import { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from '@rneui/themed';
import { AuthContext } from './AuthContext';
import * as secureStore from 'expo-secure-store';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();
//strava endpoint
const discovery = {
	authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
	tokenEndpoint: 'https://www.strava.com/oauth/token',
	revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
};

const serverUrl = 'http://170.187.229.26';
let userId = '';

export default function Home() {
	const [request, response, promptAsync] = useAuthRequest(
		{
			clientId: '94304',
			scopes: ['activity:read'],
			redirectUri: `${serverUrl}/exchange-token/1`//`${serverUrl}/exchange-token/${userId}`,
		},
		discovery
	)
	const { logout } = useContext(AuthContext);
	useEffect(() => {
		if (response?.type === 'success') {
			const { code } = response.params;
			console.log('response', response)
			//this maybe need to send to server for exchange token
		}

		const getProfile = async () => {
			const userToken = await secureStore.getItemAsync('userToken');
			try {
				const profileRequest = await axios.get(`${serverUrl}/api/profile`, {
					headers: {
						'Accept': 'application/json',
						'Authorization': `Bearer ${userToken}`
					}
				});
				let data = profileRequest.data.data;
				userId = data.id;
				console.log('data', data);
			} catch (e) {
				if (e.response.data.message) {
					Alert.alert('', e.response.data.message);
				} else {
					Alert.alert('', e.message);
				}
			}
		};
		getProfile();
	}, [response])
	return (
		<>
			<Text>This is Home</Text>
			<Button title="Sync To Strava" onPress={() => promptAsync()} />
			<Button title="Logout" onPress={() => testFunction()} />
		</>
	)
}