/** All CSS custom property token keys used by the theme system */
export interface ThemeTokens {
	background: string;
	foreground: string;
	card: string;
	'card-foreground': string;
	popover: string;
	'popover-foreground': string;
	primary: string;
	'primary-foreground': string;
	secondary: string;
	'secondary-foreground': string;
	muted: string;
	'muted-foreground': string;
	accent: string;
	'accent-foreground': string;
	destructive: string;
	border: string;
	input: string;
	ring: string;
	'chart-1': string;
	'chart-2': string;
	'chart-3': string;
	'chart-4': string;
	'chart-5': string;
	radius: string;
	sidebar: string;
	'sidebar-foreground': string;
	'sidebar-primary': string;
	'sidebar-primary-foreground': string;
	'sidebar-accent': string;
	'sidebar-accent-foreground': string;
	'sidebar-border': string;
	'sidebar-ring': string;
}

export interface ThemeDefinition {
	id: string;
	label: string;
	light: ThemeTokens;
	dark: ThemeTokens;
}

export type ThemeTokenKey = keyof ThemeTokens;

/** All token keys for iteration */
export const themeTokenKeys: ThemeTokenKey[] = [
	'background',
	'foreground',
	'card',
	'card-foreground',
	'popover',
	'popover-foreground',
	'primary',
	'primary-foreground',
	'secondary',
	'secondary-foreground',
	'muted',
	'muted-foreground',
	'accent',
	'accent-foreground',
	'destructive',
	'border',
	'input',
	'ring',
	'chart-1',
	'chart-2',
	'chart-3',
	'chart-4',
	'chart-5',
	'radius',
	'sidebar',
	'sidebar-foreground',
	'sidebar-primary',
	'sidebar-primary-foreground',
	'sidebar-accent',
	'sidebar-accent-foreground',
	'sidebar-border',
	'sidebar-ring'
];

/** Token groups for the custom theme editor UI */
export const tokenGroups: { label: string; keys: ThemeTokenKey[] }[] = [
	{ label: 'Base', keys: ['background', 'foreground'] },
	{ label: 'Card', keys: ['card', 'card-foreground'] },
	{ label: 'Popover', keys: ['popover', 'popover-foreground'] },
	{ label: 'Primary', keys: ['primary', 'primary-foreground'] },
	{ label: 'Secondary', keys: ['secondary', 'secondary-foreground'] },
	{ label: 'Muted', keys: ['muted', 'muted-foreground'] },
	{ label: 'Accent', keys: ['accent', 'accent-foreground'] },
	{ label: 'Destructive', keys: ['destructive'] },
	{ label: 'Borders & Input', keys: ['border', 'input', 'ring'] },
	{ label: 'Charts', keys: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] },
	{
		label: 'Sidebar',
		keys: [
			'sidebar',
			'sidebar-foreground',
			'sidebar-primary',
			'sidebar-primary-foreground',
			'sidebar-accent',
			'sidebar-accent-foreground',
			'sidebar-border',
			'sidebar-ring'
		]
	},
	{ label: 'Spacing', keys: ['radius'] }
];

// ─── Default Theme (matches current app.css) ───────────────────────────────

const defaultLight: ThemeTokens = {
	background: 'oklch(1 0 0)',
	foreground: 'oklch(0.145 0 0)',
	card: 'oklch(1 0 0)',
	'card-foreground': 'oklch(0.145 0 0)',
	popover: 'oklch(1 0 0)',
	'popover-foreground': 'oklch(0.145 0 0)',
	primary: 'oklch(0.852 0.199 91.936)',
	'primary-foreground': 'oklch(0.421 0.095 57.708)',
	secondary: 'oklch(0.967 0.001 286.375)',
	'secondary-foreground': 'oklch(0.21 0.006 285.885)',
	muted: 'oklch(0.97 0 0)',
	'muted-foreground': 'oklch(0.556 0 0)',
	accent: 'oklch(0.97 0 0)',
	'accent-foreground': 'oklch(0.205 0 0)',
	destructive: 'oklch(0.577 0.245 27.325)',
	border: 'oklch(0.922 0 0)',
	input: 'oklch(0.922 0 0)',
	ring: 'oklch(0.708 0 0)',
	'chart-1': 'oklch(0.905 0.182 98.111)',
	'chart-2': 'oklch(0.795 0.184 86.047)',
	'chart-3': 'oklch(0.681 0.162 75.834)',
	'chart-4': 'oklch(0.554 0.135 66.442)',
	'chart-5': 'oklch(0.476 0.114 61.907)',
	radius: '0.625rem',
	sidebar: 'oklch(0.985 0 0)',
	'sidebar-foreground': 'oklch(0.145 0 0)',
	'sidebar-primary': 'oklch(0.681 0.162 75.834)',
	'sidebar-primary-foreground': 'oklch(0.987 0.026 102.212)',
	'sidebar-accent': 'oklch(0.97 0 0)',
	'sidebar-accent-foreground': 'oklch(0.205 0 0)',
	'sidebar-border': 'oklch(0.922 0 0)',
	'sidebar-ring': 'oklch(0.708 0 0)'
};

const defaultDark: ThemeTokens = {
	background: 'oklch(0.145 0 0)',
	foreground: 'oklch(0.985 0 0)',
	card: 'oklch(0.205 0 0)',
	'card-foreground': 'oklch(0.985 0 0)',
	popover: 'oklch(0.205 0 0)',
	'popover-foreground': 'oklch(0.985 0 0)',
	primary: 'oklch(0.795 0.184 86.047)',
	'primary-foreground': 'oklch(0.421 0.095 57.708)',
	secondary: 'oklch(0.274 0.006 286.033)',
	'secondary-foreground': 'oklch(0.985 0 0)',
	muted: 'oklch(0.269 0 0)',
	'muted-foreground': 'oklch(0.708 0 0)',
	accent: 'oklch(0.269 0 0)',
	'accent-foreground': 'oklch(0.985 0 0)',
	destructive: 'oklch(0.704 0.191 22.216)',
	border: 'oklch(1 0 0 / 10%)',
	input: 'oklch(1 0 0 / 15%)',
	ring: 'oklch(0.556 0 0)',
	'chart-1': 'oklch(0.905 0.182 98.111)',
	'chart-2': 'oklch(0.795 0.184 86.047)',
	'chart-3': 'oklch(0.681 0.162 75.834)',
	'chart-4': 'oklch(0.554 0.135 66.442)',
	'chart-5': 'oklch(0.476 0.114 61.907)',
	radius: '0.625rem',
	sidebar: 'oklch(0.205 0 0)',
	'sidebar-foreground': 'oklch(0.985 0 0)',
	'sidebar-primary': 'oklch(0.795 0.184 86.047)',
	'sidebar-primary-foreground': 'oklch(0.987 0.026 102.212)',
	'sidebar-accent': 'oklch(0.269 0 0)',
	'sidebar-accent-foreground': 'oklch(0.985 0 0)',
	'sidebar-border': 'oklch(1 0 0 / 10%)',
	'sidebar-ring': 'oklch(0.556 0 0)'
};

// ─── Predefined Themes ─────────────────────────────────────────────────────

export const themes: ThemeDefinition[] = [
	{
		id: 'default',
		label: 'Default',
		light: defaultLight,
		dark: defaultDark
	},
	{
		id: 'zinc',
		label: 'Zinc',
		light: {
			...defaultLight,
			primary: 'oklch(0.141 0.005 285.823)',
			'primary-foreground': 'oklch(0.985 0.002 247.858)',
			secondary: 'oklch(0.967 0.001 286.375)',
			'secondary-foreground': 'oklch(0.141 0.005 285.823)',
			accent: 'oklch(0.967 0.001 286.375)',
			'accent-foreground': 'oklch(0.141 0.005 285.823)',
			ring: 'oklch(0.141 0.005 285.823)',
			'chart-1': 'oklch(0.646 0.222 41.116)',
			'chart-2': 'oklch(0.6 0.118 184.704)',
			'chart-3': 'oklch(0.398 0.07 227.392)',
			'chart-4': 'oklch(0.828 0.189 84.429)',
			'chart-5': 'oklch(0.769 0.188 70.08)',
			'sidebar-primary': 'oklch(0.141 0.005 285.823)',
			'sidebar-primary-foreground': 'oklch(0.985 0.002 247.858)',
			'sidebar-ring': 'oklch(0.141 0.005 285.823)'
		},
		dark: {
			...defaultDark,
			primary: 'oklch(0.985 0.002 247.858)',
			'primary-foreground': 'oklch(0.141 0.005 285.823)',
			secondary: 'oklch(0.274 0.006 286.033)',
			'secondary-foreground': 'oklch(0.985 0.002 247.858)',
			accent: 'oklch(0.274 0.006 286.033)',
			'accent-foreground': 'oklch(0.985 0.002 247.858)',
			ring: 'oklch(0.985 0.002 247.858)',
			'chart-1': 'oklch(0.488 0.243 264.376)',
			'chart-2': 'oklch(0.696 0.17 162.48)',
			'chart-3': 'oklch(0.769 0.188 70.08)',
			'chart-4': 'oklch(0.627 0.265 303.9)',
			'chart-5': 'oklch(0.645 0.246 16.439)',
			'sidebar-primary': 'oklch(0.985 0.002 247.858)',
			'sidebar-primary-foreground': 'oklch(0.141 0.005 285.823)',
			'sidebar-ring': 'oklch(0.985 0.002 247.858)'
		}
	},
	{
		id: 'slate',
		label: 'Slate',
		light: {
			...defaultLight,
			primary: 'oklch(0.205 0.015 285.938)',
			'primary-foreground': 'oklch(0.985 0.002 247.858)',
			secondary: 'oklch(0.968 0.007 247.896)',
			'secondary-foreground': 'oklch(0.205 0.015 285.938)',
			accent: 'oklch(0.968 0.007 247.896)',
			'accent-foreground': 'oklch(0.205 0.015 285.938)',
			border: 'oklch(0.929 0.006 264.531)',
			input: 'oklch(0.929 0.006 264.531)',
			ring: 'oklch(0.205 0.015 285.938)',
			'chart-1': 'oklch(0.646 0.222 41.116)',
			'chart-2': 'oklch(0.6 0.118 184.704)',
			'chart-3': 'oklch(0.398 0.07 227.392)',
			'chart-4': 'oklch(0.828 0.189 84.429)',
			'chart-5': 'oklch(0.769 0.188 70.08)',
			'sidebar-primary': 'oklch(0.205 0.015 285.938)',
			'sidebar-primary-foreground': 'oklch(0.985 0.002 247.858)',
			'sidebar-border': 'oklch(0.929 0.006 264.531)',
			'sidebar-ring': 'oklch(0.205 0.015 285.938)'
		},
		dark: {
			...defaultDark,
			primary: 'oklch(0.985 0.002 247.858)',
			'primary-foreground': 'oklch(0.205 0.015 285.938)',
			secondary: 'oklch(0.279 0.017 265.755)',
			'secondary-foreground': 'oklch(0.985 0.002 247.858)',
			accent: 'oklch(0.279 0.017 265.755)',
			'accent-foreground': 'oklch(0.985 0.002 247.858)',
			border: 'oklch(1 0 0 / 10%)',
			input: 'oklch(1 0 0 / 15%)',
			ring: 'oklch(0.985 0.002 247.858)',
			'chart-1': 'oklch(0.488 0.243 264.376)',
			'chart-2': 'oklch(0.696 0.17 162.48)',
			'chart-3': 'oklch(0.769 0.188 70.08)',
			'chart-4': 'oklch(0.627 0.265 303.9)',
			'chart-5': 'oklch(0.645 0.246 16.439)',
			'sidebar-primary': 'oklch(0.985 0.002 247.858)',
			'sidebar-primary-foreground': 'oklch(0.205 0.015 285.938)',
			'sidebar-border': 'oklch(1 0 0 / 10%)',
			'sidebar-ring': 'oklch(0.985 0.002 247.858)'
		}
	},
	{
		id: 'blue',
		label: 'Blue',
		light: {
			...defaultLight,
			primary: 'oklch(0.546 0.245 262.881)',
			'primary-foreground': 'oklch(0.985 0.002 247.858)',
			secondary: 'oklch(0.968 0.007 247.896)',
			'secondary-foreground': 'oklch(0.205 0.015 285.938)',
			accent: 'oklch(0.968 0.007 247.896)',
			'accent-foreground': 'oklch(0.205 0.015 285.938)',
			ring: 'oklch(0.546 0.245 262.881)',
			'chart-1': 'oklch(0.546 0.245 262.881)',
			'chart-2': 'oklch(0.488 0.243 264.376)',
			'chart-3': 'oklch(0.623 0.214 259.815)',
			'chart-4': 'oklch(0.707 0.165 254.624)',
			'chart-5': 'oklch(0.808 0.105 251.813)',
			'sidebar-primary': 'oklch(0.546 0.245 262.881)',
			'sidebar-primary-foreground': 'oklch(0.985 0.002 247.858)',
			'sidebar-ring': 'oklch(0.546 0.245 262.881)'
		},
		dark: {
			...defaultDark,
			primary: 'oklch(0.623 0.214 259.815)',
			'primary-foreground': 'oklch(0.985 0.002 247.858)',
			secondary: 'oklch(0.279 0.017 265.755)',
			'secondary-foreground': 'oklch(0.985 0.002 247.858)',
			accent: 'oklch(0.279 0.017 265.755)',
			'accent-foreground': 'oklch(0.985 0.002 247.858)',
			ring: 'oklch(0.623 0.214 259.815)',
			'chart-1': 'oklch(0.623 0.214 259.815)',
			'chart-2': 'oklch(0.707 0.165 254.624)',
			'chart-3': 'oklch(0.488 0.243 264.376)',
			'chart-4': 'oklch(0.808 0.105 251.813)',
			'chart-5': 'oklch(0.546 0.245 262.881)',
			'sidebar-primary': 'oklch(0.623 0.214 259.815)',
			'sidebar-primary-foreground': 'oklch(0.985 0.002 247.858)',
			'sidebar-ring': 'oklch(0.623 0.214 259.815)'
		}
	},
	{
		id: 'green',
		label: 'Green',
		light: {
			...defaultLight,
			primary: 'oklch(0.595 0.18 163.34)',
			'primary-foreground': 'oklch(0.985 0.002 247.858)',
			secondary: 'oklch(0.968 0.007 247.896)',
			'secondary-foreground': 'oklch(0.205 0.015 285.938)',
			accent: 'oklch(0.968 0.007 247.896)',
			'accent-foreground': 'oklch(0.205 0.015 285.938)',
			ring: 'oklch(0.595 0.18 163.34)',
			'chart-1': 'oklch(0.595 0.18 163.34)',
			'chart-2': 'oklch(0.532 0.157 155.995)',
			'chart-3': 'oklch(0.696 0.17 162.48)',
			'chart-4': 'oklch(0.792 0.139 164.978)',
			'chart-5': 'oklch(0.868 0.105 166.913)',
			'sidebar-primary': 'oklch(0.595 0.18 163.34)',
			'sidebar-primary-foreground': 'oklch(0.985 0.002 247.858)',
			'sidebar-ring': 'oklch(0.595 0.18 163.34)'
		},
		dark: {
			...defaultDark,
			primary: 'oklch(0.696 0.17 162.48)',
			'primary-foreground': 'oklch(0.145 0 0)',
			secondary: 'oklch(0.279 0.017 265.755)',
			'secondary-foreground': 'oklch(0.985 0.002 247.858)',
			accent: 'oklch(0.279 0.017 265.755)',
			'accent-foreground': 'oklch(0.985 0.002 247.858)',
			ring: 'oklch(0.696 0.17 162.48)',
			'chart-1': 'oklch(0.696 0.17 162.48)',
			'chart-2': 'oklch(0.792 0.139 164.978)',
			'chart-3': 'oklch(0.532 0.157 155.995)',
			'chart-4': 'oklch(0.868 0.105 166.913)',
			'chart-5': 'oklch(0.595 0.18 163.34)',
			'sidebar-primary': 'oklch(0.696 0.17 162.48)',
			'sidebar-primary-foreground': 'oklch(0.145 0 0)',
			'sidebar-ring': 'oklch(0.696 0.17 162.48)'
		}
	},
	{
		id: 'rose',
		label: 'Rose',
		light: {
			...defaultLight,
			primary: 'oklch(0.645 0.246 16.439)',
			'primary-foreground': 'oklch(0.985 0.002 247.858)',
			secondary: 'oklch(0.968 0.007 247.896)',
			'secondary-foreground': 'oklch(0.205 0.015 285.938)',
			accent: 'oklch(0.968 0.007 247.896)',
			'accent-foreground': 'oklch(0.205 0.015 285.938)',
			destructive: 'oklch(0.577 0.245 27.325)',
			ring: 'oklch(0.645 0.246 16.439)',
			'chart-1': 'oklch(0.645 0.246 16.439)',
			'chart-2': 'oklch(0.577 0.245 27.325)',
			'chart-3': 'oklch(0.718 0.202 15.341)',
			'chart-4': 'oklch(0.808 0.147 15.341)',
			'chart-5': 'oklch(0.894 0.084 14.838)',
			'sidebar-primary': 'oklch(0.645 0.246 16.439)',
			'sidebar-primary-foreground': 'oklch(0.985 0.002 247.858)',
			'sidebar-ring': 'oklch(0.645 0.246 16.439)'
		},
		dark: {
			...defaultDark,
			primary: 'oklch(0.718 0.202 15.341)',
			'primary-foreground': 'oklch(0.985 0.002 247.858)',
			secondary: 'oklch(0.279 0.017 265.755)',
			'secondary-foreground': 'oklch(0.985 0.002 247.858)',
			accent: 'oklch(0.279 0.017 265.755)',
			'accent-foreground': 'oklch(0.985 0.002 247.858)',
			destructive: 'oklch(0.704 0.191 22.216)',
			ring: 'oklch(0.718 0.202 15.341)',
			'chart-1': 'oklch(0.718 0.202 15.341)',
			'chart-2': 'oklch(0.808 0.147 15.341)',
			'chart-3': 'oklch(0.577 0.245 27.325)',
			'chart-4': 'oklch(0.894 0.084 14.838)',
			'chart-5': 'oklch(0.645 0.246 16.439)',
			'sidebar-primary': 'oklch(0.718 0.202 15.341)',
			'sidebar-primary-foreground': 'oklch(0.985 0.002 247.858)',
			'sidebar-ring': 'oklch(0.718 0.202 15.341)'
		}
	},
	{
		id: 'violet',
		label: 'Violet',
		light: {
			...defaultLight,
			primary: 'oklch(0.541 0.281 293.009)',
			'primary-foreground': 'oklch(0.985 0.002 247.858)',
			secondary: 'oklch(0.968 0.007 247.896)',
			'secondary-foreground': 'oklch(0.205 0.015 285.938)',
			accent: 'oklch(0.968 0.007 247.896)',
			'accent-foreground': 'oklch(0.205 0.015 285.938)',
			ring: 'oklch(0.541 0.281 293.009)',
			'chart-1': 'oklch(0.541 0.281 293.009)',
			'chart-2': 'oklch(0.627 0.265 303.9)',
			'chart-3': 'oklch(0.469 0.248 292.834)',
			'chart-4': 'oklch(0.726 0.191 306.383)',
			'chart-5': 'oklch(0.831 0.111 308.75)',
			'sidebar-primary': 'oklch(0.541 0.281 293.009)',
			'sidebar-primary-foreground': 'oklch(0.985 0.002 247.858)',
			'sidebar-ring': 'oklch(0.541 0.281 293.009)'
		},
		dark: {
			...defaultDark,
			primary: 'oklch(0.627 0.265 303.9)',
			'primary-foreground': 'oklch(0.985 0.002 247.858)',
			secondary: 'oklch(0.279 0.017 265.755)',
			'secondary-foreground': 'oklch(0.985 0.002 247.858)',
			accent: 'oklch(0.279 0.017 265.755)',
			'accent-foreground': 'oklch(0.985 0.002 247.858)',
			ring: 'oklch(0.627 0.265 303.9)',
			'chart-1': 'oklch(0.627 0.265 303.9)',
			'chart-2': 'oklch(0.726 0.191 306.383)',
			'chart-3': 'oklch(0.469 0.248 292.834)',
			'chart-4': 'oklch(0.831 0.111 308.75)',
			'chart-5': 'oklch(0.541 0.281 293.009)',
			'sidebar-primary': 'oklch(0.627 0.265 303.9)',
			'sidebar-primary-foreground': 'oklch(0.985 0.002 247.858)',
			'sidebar-ring': 'oklch(0.627 0.265 303.9)'
		}
	},
	{
		id: 'orange',
		label: 'Orange',
		light: {
			...defaultLight,
			primary: 'oklch(0.705 0.213 47.604)',
			'primary-foreground': 'oklch(0.985 0.002 247.858)',
			secondary: 'oklch(0.968 0.007 247.896)',
			'secondary-foreground': 'oklch(0.205 0.015 285.938)',
			accent: 'oklch(0.968 0.007 247.896)',
			'accent-foreground': 'oklch(0.205 0.015 285.938)',
			ring: 'oklch(0.705 0.213 47.604)',
			'chart-1': 'oklch(0.705 0.213 47.604)',
			'chart-2': 'oklch(0.646 0.222 41.116)',
			'chart-3': 'oklch(0.769 0.188 70.08)',
			'chart-4': 'oklch(0.828 0.152 74.044)',
			'chart-5': 'oklch(0.891 0.094 84.093)',
			'sidebar-primary': 'oklch(0.705 0.213 47.604)',
			'sidebar-primary-foreground': 'oklch(0.985 0.002 247.858)',
			'sidebar-ring': 'oklch(0.705 0.213 47.604)'
		},
		dark: {
			...defaultDark,
			primary: 'oklch(0.769 0.188 70.08)',
			'primary-foreground': 'oklch(0.145 0 0)',
			secondary: 'oklch(0.279 0.017 265.755)',
			'secondary-foreground': 'oklch(0.985 0.002 247.858)',
			accent: 'oklch(0.279 0.017 265.755)',
			'accent-foreground': 'oklch(0.985 0.002 247.858)',
			ring: 'oklch(0.769 0.188 70.08)',
			'chart-1': 'oklch(0.769 0.188 70.08)',
			'chart-2': 'oklch(0.828 0.152 74.044)',
			'chart-3': 'oklch(0.646 0.222 41.116)',
			'chart-4': 'oklch(0.891 0.094 84.093)',
			'chart-5': 'oklch(0.705 0.213 47.604)',
			'sidebar-primary': 'oklch(0.769 0.188 70.08)',
			'sidebar-primary-foreground': 'oklch(0.145 0 0)',
			'sidebar-ring': 'oklch(0.769 0.188 70.08)'
		}
	}
];

export const defaultTheme = themes[0];

/** Helper to clone tokens (for custom theme initialization) */
export function cloneTokens(tokens: ThemeTokens): ThemeTokens {
	return { ...tokens };
}
