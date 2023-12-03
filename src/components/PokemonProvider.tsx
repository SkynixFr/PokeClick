import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonsQuery } from '../features/api/apiSlice';
import { addPokemons } from '../features/pokemonsSlice';
import StarterSelection from './StarterSelection';
import { RootState } from '../app/store';

export const PokemonProvider = (props: React.PropsWithChildren) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const isStarterSelected = useSelector(
		(state: RootState) => state.upgrades.isStarterSelected
	);

	const { data, error, isLoading: isQuerying } = useGetPokemonsQuery();

	const dispatch = useDispatch();

	useEffect(() => {
		function getPokemons() {
			if (isQuerying || error || !data) {
				return;
			}
			setIsLoading(true);
			setTimeout(() => {
				dispatch(addPokemons(data.results));
				setIsLoading(false);
			}, 1000);
		}

		getPokemons();
	}, [data]);

	return isLoading || isQuerying ? (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/miaoussLoader.gif')}
				style={styles.loader}
				resizeMode="contain"
			>
				<Text style={styles.text}>Chargement des assets...</Text>
			</ImageBackground>
		</View>
	) : isStarterSelected ? (
		props.children
	) : (
		<StarterSelection />
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#feffe9'
	},
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		marginTop: 300,
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black'
	}
});
