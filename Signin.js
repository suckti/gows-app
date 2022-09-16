import { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';

export default function Register() {
	const [isShowPass, setIsShowPass] = useState(true);
	const [eyePass, setEyePass] = useState('eye');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = () => {
		const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

		if (!strongRegex.test(email)) {
			Alert.alert('Not valid email !')
			return false;
		} else if (password == '') {
			Alert.alert('Password minimum 8 character !');
			return false;
		}
	}

	return (
		<View>
			<Input
				label='Email'
				keyboardType='email-address'
				onChangeText={(email) => setEmail(email)} />
			<Input
				label='Password'
				secureTextEntry={isShowPass}
				rightIcon={
					<Icon type='font-awesome' name={eyePass}
						onPress={() => {
							setIsShowPass(!isShowPass);
							setEyePass(eyePass == 'eye' ? 'eye-slash' : 'eye')
						}}
					/>}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button title="Login" onPress={() => login()} />
			<Text>Fogot Your Password?</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});