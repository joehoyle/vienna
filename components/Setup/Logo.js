import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
	icon: {
		alignSelf: 'center',
		marginBottom: 10,
	},
} );

export default function Logo() {
	return (
		<Image
			source={ require( '../../images/logo-black-40.png' ) }
			style={ styles.icon }
		/>
	);
}
