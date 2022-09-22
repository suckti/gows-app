import { useContext, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { AuthContext } from './AuthContext';

export default function Register({ navigation }) {
	const [isShowPass, setIsShowPass] = useState(true);
	const [eyePass, setEyePass] = useState('eye');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [btnLogin, setBtnLogin] = useState(false);
	const { login } = useContext(AuthContext);

	const submitLogin = async () => {
		const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

		if (!strongRegex.test(email)) {
			Alert.alert('Email not valid!')
			return false;
		} else if (password == '') {
			Alert.alert('Password minimum 8 character !');
			return false;
		}

		setBtnLogin(true);
		await login(email, password);
		setBtnLogin(false);
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
			<Button title="Login" onPress={() => submitLogin()} disabled={btnLogin} />
			<Text onPress={() => navigation.navigate('ForgotPassword')}>Fogot Your Password?</Text>
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