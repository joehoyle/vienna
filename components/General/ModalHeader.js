import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { HeaderTitle } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create( {
	container: {
		paddingTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerText: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	closeButton: {
		alignSelf: 'flex-end',
		color: 'dodgerblue',
		fontSize: 16,
		marginLeft: 10,
		width: 80,
	},
	headerRight: {
		width: 80,
		alignItems: 'flex-end',
	},
} );

export default function ModalHeader( props ) {
	const navigation = useNavigation()
	return ( <View style={ styles.container }>
		<TouchableOpacity onPress={ () => navigation.goBack() }>
			<Text style={ styles.closeButton }>Cancel</Text>
		</TouchableOpacity>
		<HeaderTitle style={ styles.headerText }>{ props.title }</HeaderTitle>
		<View style={ styles.headerRight }>
			{ props.headerRight && props.headerRight() }
		</View>
	</View> )
}
