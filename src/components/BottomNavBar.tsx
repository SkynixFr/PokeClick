import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Upgrade from './Upgrade';
import Success from './Success';
import Shop from './Shop';

import FaIcon from '@expo/vector-icons/FontAwesome5';
import { AntDesign } from '@expo/vector-icons';

import bottomNavbarStyle from '../styles/bottomNavbar';
import overlayStyle from '../styles/overlay';

const BottomNavBar = () => {
	const [selectedComponent, setSelectedComponent] = useState<string>('');

	const renderComponent = () => {
		switch (selectedComponent) {
			case 'Upgrades':
				return <Upgrade />;
			case 'Success':
				return <Success />;
			case 'Shop':
				return <Shop />;
			default:
				return null;
		}
	};

	const handleComponent = (component: string) => {
		if (selectedComponent === component) {
			setSelectedComponent('');
		} else {
			setSelectedComponent(component);
		}
	};

	return (
		<>
			{selectedComponent && (
				<View style={overlayStyle.overlay}>{renderComponent()}</View>
			)}
			<View style={bottomNavbarStyle.bottomNavBar}>
				<TouchableOpacity
					onPress={() => handleComponent('Success')}
					style={bottomNavbarStyle.navBtn}
				>
					<AntDesign
						name="star"
						size={25}
						style={{
							color: selectedComponent === 'Success' ? '#3A75C4' : '#000'
						}}
					/>

					<Text
						style={{
							color: selectedComponent === 'Success' ? '#3A75C4' : '#000'
						}}
					>
						Succès
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={bottomNavbarStyle.navBtn}
					onPress={() => handleComponent('Upgrades')}
				>
					<FaIcon
						name="angle-double-up"
						size={25}
						style={{
							color:
								selectedComponent === 'Upgrades' ? '#3A75C4' : '#000'
						}}
					/>
					<Text
						style={{
							color:
								selectedComponent === 'Upgrades' ? '#3A75C4' : '#000'
						}}
					>
						Améliorations
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => handleComponent('Shop')}
					style={bottomNavbarStyle.navBtn}
				>
					<FaIcon
						name="store"
						size={25}
						style={{
							color: selectedComponent === 'Shop' ? '#3A75C4' : '#000'
						}}
					/>
					<Text
						style={{
							color: selectedComponent === 'Shop' ? '#3A75C4' : '#000'
						}}
					>
						Boutique
					</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default BottomNavBar;
