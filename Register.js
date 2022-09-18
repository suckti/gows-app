import { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { AuthContext } from './AuthContext';

export default function Register({navigation}) {
	const [isShowPass, setIsShowPass] = useState(true);
	const [eyePass, setEyePass] = useState('eye');
	const [isShowConfirmPass, setIsShowConfirmPass] = useState(true);
	const [eyeConfirmPass, setEyeConfirmPass] = useState('eye');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const register = () => {
		const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

		if (!strongRegex.test(email)) {
			Alert.alert('Not valid email !')
			return false;
		} else if (password.length < 8) {
			Alert.alert('Password minimum 8 character !');
			return false;
		} else if (password !== confirmPassword) {
			Alert.alert('Password and Confirm Password didn\'t match !');
			return false;
		}
		navigation.navigate('Home');
	}

	return (
		<View>
			<Input label='Name' />
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
			<Input
				label='Confirm Password'
				secureTextEntry={isShowConfirmPass}
				rightIcon={
					<Icon type='font-awesome' name={eyeConfirmPass}
						onPress={() => {
							setIsShowConfirmPass(!isShowConfirmPass);
							setEyeConfirmPass(eyeConfirmPass == 'eye' ? 'eye-slash' : 'eye')
						}}
					/>}
				onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
			/>
			<Button title="Create Account" onPress={() => register(navigation)}/>
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