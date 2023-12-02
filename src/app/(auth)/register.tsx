import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import RegisterStyle from '../../styles/register';

const Register: React.FC = () => {
	const [title, setTitle] = useState(''); // Initialize with an empty string or default title

	useEffect(() => {
		// Set the title directly (without navigation)
		setTitle('Create an Account');
	}, []);

	return (
		<>
			<View style={RegisterStyle.container}>
				<Text>{title}</Text>
			</View>
		</>
	);
};

export default Register;
