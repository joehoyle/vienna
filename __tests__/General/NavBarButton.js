import 'react-native'
import React from 'react'
import NavBarButton from '../../components/General/NavBarButton'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
	const tree = renderer.create(
		<NavBarButton />
	).toJSON()
	expect(tree).toMatchSnapshot()

	const withText = renderer.create(
		<NavBarButton>Back</NavBarButton>
	).toJSON()
	expect(withText).toMatchSnapshot()
});
