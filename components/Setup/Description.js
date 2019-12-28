import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create( {
	description: {
		color: '#666666',
		marginTop: 15,
		marginBottom: 15,
		textAlign: 'center',
	},
} );

export default function Description( props ) {
	const style = StyleSheet.compose( styles.description, props.styles );

	return (
		<View>
			<Text style={ style }>{ props.children }</Text>
		</View>
	);
}
