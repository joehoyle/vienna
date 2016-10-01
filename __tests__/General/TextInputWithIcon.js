import 'react-native'
import React from 'react'
import TextInputWithIcon from '../../components/General/TextInputWithIcon'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
	const tree = renderer.create(
		<TextInputWithIcon />
	).toJSON()
	expect(tree).toMatchSnapshot()
});
