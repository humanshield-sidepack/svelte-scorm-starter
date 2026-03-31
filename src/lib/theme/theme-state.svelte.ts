import {
	themes,
	defaultTheme,
	cloneTokens,
	type ThemeDefinition,
	type ThemeTokens,
	type ThemeTokenKey
} from './themes.js';

const STORAGE_KEY = 'app-theme';
const CUSTOM_TOKENS_KEY = 'app-theme-custom';

class ThemeState {
	activeThemeId = $state<string>('default');
	customLightTokens = $state<ThemeTokens>(cloneTokens(defaultTheme.light));
	customDarkTokens = $state<ThemeTokens>(cloneTokens(defaultTheme.dark));

	activeTheme = $derived.by((): ThemeDefinition => {
		if (this.activeThemeId === 'custom') {
			return {
				id: 'custom',
				label: 'Custom',
				light: this.customLightTokens,
				dark: this.customDarkTokens
			};
		}
		return themes.find((t) => t.id === this.activeThemeId) ?? themes[0];
	});

	constructor() {
		this.load();
	}

	setTheme(id: string) {
		this.activeThemeId = id;
		this.persist();
		this.apply();
	}

	updateCustomToken(mode: 'light' | 'dark', key: ThemeTokenKey, value: string) {
		if (mode === 'light') {
			this.customLightTokens = { ...this.customLightTokens, [key]: value };
		} else {
			this.customDarkTokens = { ...this.customDarkTokens, [key]: value };
		}
		if (this.activeThemeId === 'custom') this.apply();
		this.persist();
	}

	/** Copy a preset theme's tokens into the custom slots */
	resetCustomToTheme(themeId: string) {
		const source = themes.find((t) => t.id === themeId) ?? defaultTheme;
		this.customLightTokens = cloneTokens(source.light);
		this.customDarkTokens = cloneTokens(source.dark);
		if (this.activeThemeId === 'custom') this.apply();
		this.persist();
	}

	apply() {
		if (typeof document === 'undefined') return;

		const theme = this.activeTheme;

		// Use a single <style> tag for both light and dark overrides.
		// Inline styles on :root would beat .dark {} rules, breaking the mode toggle.
		let styleEl = document.getElementById('theme-override') as HTMLStyleElement | null;
		if (!styleEl) {
			styleEl = document.createElement('style');
			styleEl.id = 'theme-override';
			document.head.appendChild(styleEl);
		}

		const lightRules = Object.entries(theme.light)
			.map(([key, value]) => `  --${key}: ${value};`)
			.join('\n');
		const darkRules = Object.entries(theme.dark)
			.map(([key, value]) => `  --${key}: ${value};`)
			.join('\n');

		styleEl.textContent = `:root {\n${lightRules}\n}\n.dark {\n${darkRules}\n}`;
	}

	private persist() {
		try {
			localStorage.setItem(STORAGE_KEY, this.activeThemeId);
			localStorage.setItem(
				CUSTOM_TOKENS_KEY,
				JSON.stringify({
					light: this.customLightTokens,
					dark: this.customDarkTokens
				})
			);
		} catch {
			// localStorage may not be available
		}
	}

	private load() {
		try {
			const savedId = localStorage.getItem(STORAGE_KEY);
			if (savedId) this.activeThemeId = savedId;

			const savedCustom = localStorage.getItem(CUSTOM_TOKENS_KEY);
			if (savedCustom) {
				const parsed = JSON.parse(savedCustom);
				if (parsed.light) this.customLightTokens = parsed.light;
				if (parsed.dark) this.customDarkTokens = parsed.dark;
			}
		} catch {
			// localStorage may not be available
		}
		this.apply();
	}
}

export const themeState = new ThemeState();
