import { isLoaded } from 'expo-font';
import React from 'react';
import { StyleSheet, StyleProp, Text, TextStyle } from 'react-native';

const styles = StyleSheet.create( {
	base: {},
	icon: {
		fontFamily: 'sfsymbols',
	},
	fallback: {},
} );

interface IconProps {
	fallback: string;
	fallbackStyle?: StyleProp<TextStyle>;
	icon: string;
	iconStyle?: StyleProp<TextStyle>;
	style?: StyleProp<TextStyle>;
}

export default function Icon( props: IconProps ) {
	const useIcon = isLoaded( 'sfsymbols' );
	const style = [
		styles.base,
		useIcon ? styles.icon : styles.fallback,
		props.style,
		useIcon ? props.iconStyle : props.fallbackStyle,
	];

	return (
		<Text style={ style }>
			{ useIcon ? props.icon : props.fallback }
		</Text>
	);
}
