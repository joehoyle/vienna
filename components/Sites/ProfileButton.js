import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create( {
	image: {
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 10,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,.1)',
	},
} );

function ProfileButton( props ) {
	const navigation = useNavigation();
	return (
		<TouchableOpacity onPress={ () => navigation.push( 'UsersEdit', { user: props.profile.data.id } ) }>
			{ props.profile.data &&
				<Image style={ styles.image } source={ { uri: props.profile.data.avatar_urls['96'] } } />
			}
		</TouchableOpacity>
	);
}

export default connect(
	state => ( { profile: state.sites[state.activeSite.id].data.users.profile ?? {} } ),
)( ProfileButton );
