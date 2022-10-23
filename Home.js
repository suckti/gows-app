import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import Challenge from "./Challenge";


function ActivityDetailScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Details Activity!</Text>
		</View>
	);
}

function ActivityScreen({navigation}) {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Activity</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Activity Details')}
			/>
		</View>
	);
}

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="Activity" component={ActivityScreen} />
			<HomeStack.Screen name="Activity Details" component={ActivityDetailScreen} />
		</HomeStack.Navigator>
	)
}

const Tab = createBottomTabNavigator();

export default function Home() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen name="Home" component={HomeStackScreen} />
			<Tab.Screen name="Challenge" component={Challenge} />
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	)
}