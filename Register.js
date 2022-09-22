import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { AuthContext } from './AuthContext';

export default function Register({ navigation }) {
	const [isShowPass, setIsShowPass] = useState(true);
	const [eyePass, setEyePass] = useState('eye');
	const [isShowConfirmPass, setIsShowConfirmPass] = useState(true);
	const [eyeConfirmPass, setEyeConfirmPass] = useState('eye');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const [btnRgs, setBtnRgs] = useState(false);
	const { register } = useContext(AuthContext);

	const submitRegister = async () => {
		const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
		if (!strongRegex.test(email)) {
			Alert.alert('Email not valid!')
			return false;
		} else if (password.length < 8) {
			Alert.alert('Password minimum 8 character !');
			return false;
		} else if (password !== confirmPassword) {
			Alert.alert('Password and Confirm Password didn\'t match !');
			return false;
		}

		setBtnRgs(true);
		await register(name, email, password)
		setBtnRgs(false);
	}

	return (
		<View>
			<Input label='Name'
				onChangeText={(name) => setName(name)} />
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
			<Button title="Create Account" onPress={() => submitRegister(navigation)} disabled={btnRgs} />
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