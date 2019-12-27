import 'react-native';
import React from 'react';
import ConfirmButton from '../components/ConfirmButton';
import renderer from 'react-test-renderer';

it( 'renders correctly', () => {
	const tree = renderer
		.create( <ConfirmButton text="Delete" confirmText="Confirm" /> )
		.toJSON();
	expect( tree ).toMatchSnapshot();
} );
