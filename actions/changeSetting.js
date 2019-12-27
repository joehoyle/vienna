export default function changeSetting( setting, value ) {
	return {
		type: 'SETTINGS_CHANGED',
		payload: {
			setting: setting,
			value: value,
		},
	};
}
