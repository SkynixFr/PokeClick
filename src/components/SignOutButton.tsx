import { getAuth, signOut } from 'firebase/auth';
import { Button, View } from 'react-native';
export const SignOutButton = () => {
	const auth = getAuth();
	return (
		<View>
			<Button
				title="Sign Out"
				onPress={() => {
					signOut(auth)
						.then(() => {
							// Sign-out successful.
						})
						.catch(error => {
							// An error happened.
						});
				}}
			/>
		</View>
	);
};
