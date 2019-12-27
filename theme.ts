import { StyleSheet, processColor } from 'react-native';

type HexColor = string;

type SystemColor =
	'blue' |
	'brown' |
	'gray' |
	'gray2' |
	'gray3' |
	'gray4' |
	'gray5' |
	'gray6' |
	'green' |
	'indigo' |
	'orange' |
	'pink' |
	'purple' |
	'red' |
	'teal' |
	'yellow';

type SystemColorSet = Record<SystemColor, HexColor>;

type SemanticColor =
	'label' |
	'secondaryLabel' |
	'tertiaryLabel' |
	'quaternaryLabel' |
	'systemFill' |
	'secondarySystemFill' |
	'tertiarySystemFill' |
	'quaternarySystemFill' |
	'placeholderText' |
	'systemBackground' |
	'secondarySystemBackground' |
	'tertiarySystemBackground' |
	'systemGroupedBackground' |
	'secondarySystemGroupedBackground' |
	'tertiarySystemGroupedBackground' |
	'separator' |
	'opaqueSeparator' |
	'link';

type SemanticColorSet = Record<SemanticColor, HexColor>;

const systemColors: Record<string, SystemColorSet> = {
	light: {
		blue: '#007AFF',
		brown: '#A2845E',
		gray: '#8E8E93',
		gray2: '#AEAEB2',
		gray3: '#C7C7CC',
		gray4: '#D1D1D6',
		gray5: '#E5E5EA',
		gray6: '#F2F2F7',
		green: '#34C759',
		indigo: '#5856D6',
		orange: '#FF9500',
		pink: '#FF2D55',
		purple: '#AF52DE',
		red: '#FF3B30',
		teal: '#5AC8FA',
		yellow: '#FFCC00',
	},
	dark: {
		blue: '#0A84FF',
		brown: '#AC8E68',
		gray: '#8E8E93',
		gray2: '#636366',
		gray3: '#48484A',
		gray4: '#3A3A3C',
		gray5: '#2C2C2E',
		gray6: '#1C1C1E',
		green: '#30D158',
		indigo: '#5E5CE6',
		orange: '#FF9F0A',
		pink: '#FF375F',
		purple: '#BF5AF2',
		red: '#FF453A',
		teal: '#64D2FF',
		yellow: '#FFD60A',
	},
	accessible: {
		blue: '#0040DD',
		brown: '#7F6545',
		gray: '#6C6C70',
		gray2: '#8E8E93',
		gray3: '#AEAEB2',
		gray4: '#BCBCC0',
		gray5: '#D8D8DC',
		gray6: '#EBEBF0',
		green: '#248A3D',
		indigo: '#3634A3',
		orange: '#C93400',
		pink: '#D30F45',
		purple: '#8944AB',
		red: '#D70015',
		teal: '#0071A4',
		yellow: '#A05A00',
	},
	accessibleDark: {
		blue: '#409CFF',
		brown: '#B59469',
		gray: '#AEAEB2',
		gray2: '#7C7C80',
		gray3: '#545456',
		gray4: '#444446',
		gray5: '#363638',
		gray6: '#242426',
		green: '#30DB5B',
		indigo: '#7D7AFF',
		orange: '#FFB340',
		pink: '#FF6482',
		purple: '#DA8FFF',
		red: '#FF6961',
		teal: '#70D7FF',
		yellow: '#FFD426',
	},
};

const semanticColors = {
	light: {
		label: '#000000ff',
		secondaryLabel: '#3c3c4399',
		tertiaryLabel: '#3c3c434c',
		quaternaryLabel: '#3c3c432d',
		systemFill: '#78788033',
		secondarySystemFill: '#78788028',
		tertiarySystemFill: '#7676801e',
		quaternarySystemFill: '#74748014',
		placeholderText: '#3c3c434c',
		systemBackground: '#ffffffff',
		secondarySystemBackground: systemColors.light.gray6,
		tertiarySystemBackground: '#ffffffff',
		systemGroupedBackground: systemColors.light.gray6,
		secondarySystemGroupedBackground: '#ffffffff',
		tertiarySystemGroupedBackground: systemColors.light.gray6,
		separator: '#3c3c4349',
		opaqueSeparator: '#c6c6c8ff',
		link: systemColors.light.blue,
	},
	dark: {
		label: '#ffffffff',
		secondaryLabel: '#ebebf599',
		tertiaryLabel: '#ebebf54c',
		quaternaryLabel: '#ebebf52d',
		systemFill: '#7878805b',
		secondarySystemFill: '#78788051',
		tertiarySystemFill: '#7676803d',
		quaternarySystemFill: '#7676802d',
		placeholderText: '#ebebf54c',
		systemBackground: '#000000ff',
		secondarySystemBackground: systemColors.dark.gray6,
		tertiarySystemBackground: '#2c2c2eff',
		systemGroupedBackground: '#000000ff',
		secondarySystemGroupedBackground: systemColors.dark.gray6,
		tertiarySystemGroupedBackground: '#2c2c2eff',
		separator: '#54545899',
		opaqueSeparator: '#38383aff',
		link: '#0984ffff',
	},
};

const brandColors = {
	primary: systemColors.light.red,
};

// const isDark = true;
const isDark = false;

export function getSystemColor( key: SystemColor ) {
	return isDark ? systemColors.dark[ key ] : systemColors.light[ key ];
}

export function getBrandColor( key ) {
	return brandColors[ key ];
}

export function getSemanticColor( key: SemanticColor ) {
	return isDark ? semanticColors.dark[ key ] : semanticColors.light[ key ];
}
