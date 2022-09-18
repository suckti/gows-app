import { useContext } from 'react';
import { Text } from 'react-native';
import { Button } from '@rneui/themed';
import { AuthContext } from './AuthContext';

export default function Home() {
	const { logout } = useContext(AuthContext);
	return (
		<>
			<Text>This is Home</Text>
			<Button title="Logout" onPress={() => logout()} />
		</>
	)
}