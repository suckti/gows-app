import { useContext, useState } from "react";
import { View, Alert } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { AuthContext } from "./AuthContext";


export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [btn, setBtn] = useState(false);
	const { forgotPassword } = useContext(AuthContext);

	const submitResetPassword = async () => {
		const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
		if (!strongRegex.test(email)) {
			Alert.alert('Email not valid!')
			return false;
		}

		setBtn(true);
		await forgotPassword(email);
		setBtn(false);
	}

	return (
		<View>
			<Input
				label='Email'
				keyboardType='email-address'
				onChangeText={(email) => setEmail(email)} />
			<Button title="Reset Password" onPress={() => submitResetPassword()} disabled={btn} />
		</View>


	)
}