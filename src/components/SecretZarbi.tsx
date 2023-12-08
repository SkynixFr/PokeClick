import { Pressable, StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';

import { PokemonImgByPokemonId } from '../constants/PokemonImgByPokemonId';
import { incrementPokeDollarMoneyByAmount } from '../features/moneySlice';
import { incrementDpcByAmount } from '../features/dpcSlice';

const SecretZarbi = () => {
	const dispatch = useDispatch();

	function developperMode() {
		dispatch(
			incrementPokeDollarMoneyByAmount(
				99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
			)
		);
		dispatch(incrementDpcByAmount(99));
	}

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => {
					developperMode();
				}}
			>
				<Image
					source={PokemonImgByPokemonId[201]}
					style={{ width: 30, height: 30 }}
					resizeMode="contain"
				/>
			</Pressable>
		</View>
	);
};

export default SecretZarbi;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 180,
		right: 0
	}
});
