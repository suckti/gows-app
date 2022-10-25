import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, FlatList, Button, Text, View, StatusBar, Alert } from 'react-native';
import { ListItem, Avatar, FAB } from '@rneui/themed';
import * as secureStore from 'expo-secure-store';
import axios from 'axios';
import moment from 'moment';

function ChallengeDetailScreen({ route }) {
	const [challengeId, setChallengeId] = useState(route.params.id);
	useEffect(() => {
		console.log(`THIS IS EFFECT chalange detail screen ${route.params.id}`);
	}, [])
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Details Challenge {challengeId}!</Text>
		</View>
	);
}

function ChallengeScreen({ navigation }) {
	const serverUrl = 'http://170.187.229.26';
	const [list, setList] = useState([]);
	useEffect(() => {
		async function getList() {
			const userToken = await secureStore.getItemAsync('userToken');
			try {
				let getList = await axios.get(`${serverUrl}/api/challenge`, {
					headers: {
						'Accept': 'application/json',
						'Authorization': `Bearer ${userToken}`
					}
				});
				let listData = getList.data.data;
				console.log('data', listData);
				setList(listData); //this is dangerous, dont save in here
			} catch (e) {
				if (e.response.data.message) {
					Alert.alert('', e.response.data.message);
				} else {
					Alert.alert('', e.message);
				}
			}
		}
		getList();
		console.log('THIS IS EFFECT chalange screen');
	}, [])

	const renderItem = ({ item }) => (
		<ListItem bottomDivider onPress={() => navigation.navigate('Challenge Details', { id: item.id })}>
			<ListItem.Content>
				<ListItem.Title>{item.name}</ListItem.Title>
				<ListItem.Subtitle>
					{moment(item.start_date).format('D MMM YY')} - {moment(item.end_date).format('D MMM YY')}
				</ListItem.Subtitle>
			</ListItem.Content>
			<ListItem.Chevron />
		</ListItem>
	);
	const keyExtractor = (item, index) => index.toString();
	return (
		<>
			<SafeAreaView>
				<FlatList data={list} renderItem={renderItem} keyExtractor={keyExtractor} />
			</SafeAreaView>
			<FAB
				visible={true}
				placement="right"
				icon={{ name: 'add', color: 'black' }}
				color="white"
			/>
		</>

	)
}

const ChallengeStack = createNativeStackNavigator();

export default function Challenge() {
	return (
		<ChallengeStack.Navigator>
			<ChallengeStack.Screen name="Challenge List" component={ChallengeScreen} />
			<ChallengeStack.Screen name="Challenge Details" component={ChallengeDetailScreen} />
		</ChallengeStack.Navigator>
	)
}