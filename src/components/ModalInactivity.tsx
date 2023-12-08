import {
	AppState,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-native-modal';
import computeTotalPokemonDefeated from '../utils/computeTotalPokemonDefeated';
import { store } from '../app/store';
import { setDate } from '../features/dateSlice';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { computeMoney } from '../utils/computeMoney';
import { incrementLevel, incrementLevelByAmount } from '../features/levelSlice';
import { incrementPokeDollarMoneyByAmount } from '../features/moneySlice';
import {
	setPokeDollarEarned,
	setPokemonDefeated,
	setLevelsConquered
} from '../features/idleSlice';
import { computePokemonLife } from '../utils/computePokemonLife';

interface ModalInactivityProps {
	stopAutoAttack: () => void;
	startAutoAttack: () => void;
	setPokemonLife: React.Dispatch<React.SetStateAction<number>>;
}

const ModalInactivity = ({
	stopAutoAttack,
	startAutoAttack,
	setPokemonLife
}: ModalInactivityProps) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const appState = useRef(AppState.currentState);
	// const [pokemonDefeated, setPokemonDefeated] = useState(0);
	// const [levelsConquered, setLevelsConquered] = useState(0);
	// const [pokeDollarEarned, setPokeDollarEarned] = useState(0);
	const dispatch = useDispatch();

	const handleIdle = () => {
		setModalIsOpen(false);
		dispatch(incrementLevelByAmount(store.getState().idle.levelsConquered));
		dispatch(
			incrementPokeDollarMoneyByAmount(
				store.getState().idle.pokeDollarEarned
			)
		);
		setPokemonLife(
			computePokemonLife(
				store.getState().difficulty.value,
				10,
				store.getState().idle.levelsConquered,
				false
			)
		);
		startAutoAttack();
	};

	// useEffect(() => {
	// 	const recapIdle = AppState.addEventListener('change', nextAppState => {
	// 		appState.current = nextAppState;

	// 		if (appState.current === 'background') {
	// 			dispatch(setDate(dayjs().toISOString()));
	// 		}
	// 		// if (appState.current === 'active') {
	// 		// 	stopAutoAttack();
	// 		// 	const currentDate = dayjs();
	// 		// 	const timePassed = currentDate.diff(
	// 		// 		store.getState().date.value,
	// 		// 		'second'
	// 		// 	);
	// 		// 	const { pokemonDefeated, levelsConquered, pokeDollarEarned } =
	// 		// 		computeTotalPokemonDefeated(
	// 		// 			store.getState().dps.value,
	// 		// 			timePassed,
	// 		// 			store.getState().difficulty.value,
	// 		// 			store.getState().level.value,
	// 		// 			false,
	// 		// 			10
	// 		// 		);

	// 		// 	dispatch(setPokeDollarEarned(pokeDollarEarned));
	// 		// 	dispatch(setPokemonDefeated(pokemonDefeated));
	// 		// 	dispatch(setLevelsConquered(levelsConquered));

	// 		// 	setModalIsOpen(true);
	// 		// }
	// 	});
	// 	return () => {
	// 		recapIdle.remove();
	// 	};
	// }, []);

	return (
		<Modal isVisible={modalIsOpen} style={styles.modalContainer}>
			<View style={styles.modalContent}>
				<View>
					<Text style={styles.modalItem}>
						Récapitulatif du temps passé en inactivité
					</Text>
				</View>
				<View style={styles.textContainer}>
					<Text>
						Pokémon défaits : {store.getState().idle.pokemonDefeated}
					</Text>
					<Text>
						Niveaux conquis : {store.getState().idle.levelsConquered}
					</Text>
					<Text>
						Pokedollar gagnés : {store.getState().idle.pokeDollarEarned}
					</Text>
				</View>

				<TouchableOpacity onPress={() => handleIdle()}>
					<View style={styles.buttonContainer}>
						<Text style={styles.buttonText}>Reprendre</Text>
					</View>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default ModalInactivity;

const styles = StyleSheet.create({
	modalContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalContent: {
		width: 350,
		height: 300,
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 20
	},
	modalItem: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10
	},
	textContainer: {
		flex: 1
	},
	buttonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1f618d',
		padding: 10,
		borderRadius: 5
	},
	buttonText: {
		color: 'white'
	}
});
function dayJs() {
	throw new Error('Function not implemented.');
}
