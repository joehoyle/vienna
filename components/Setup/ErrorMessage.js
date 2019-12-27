import { FontAwesome as Icon } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create( {
	errorMessage: {
		color: 'red',
		textAlign: 'center',
		fontSize: 15,
		marginTop: 10,
		marginBottom: 5,
	},
} );

export default function ErrorMessage( props ) {
	const style = StyleSheet.compose( styles.errorMessage, props.style );
	return (
		<Text style={ style }>
			<Icon name="exclamation-triangle" color="red" /> { props.children }
		</Text>
	);
}
