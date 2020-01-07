const { reloadApp } = require( 'detox-expo-helpers' );

describe( 'SitesAdd', () => {
	beforeEach( async () => {
		await reloadApp();
	} );

	it( 'should add site screen on first boot', async () => {
		await expect( element( by.id( 'Sites/Add' ) ) ).toBeVisible();
		device.takeScreenshot( 'add-site' );
	} );
} );
