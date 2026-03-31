import { parse, formatHex, oklch } from 'culori';

/**
 * Convert an OKLCH CSS string (e.g. "oklch(0.5 0.2 120)") to a hex color string.
 * Returns "#000000" if parsing fails.
 */
export function oklchToHex(value: string): string {
	try {
		const color = parse(value);
		if (!color) return '#000000';
		return formatHex(color);
	} catch {
		return '#000000';
	}
}

/**
 * Convert a hex color string (e.g. "#ff6600") to an OKLCH CSS string.
 */
export function hexToOklch(hex: string): string {
	try {
		const color = parse(hex);
		if (!color) return 'oklch(0 0 0)';
		const lch = oklch(color);
		if (!lch) return 'oklch(0 0 0)';
		const l = round(lch.l ?? 0, 3);
		const c = round(lch.c ?? 0, 3);
		const h = round(lch.h ?? 0, 3);
		return `oklch(${l} ${c} ${h})`;
	} catch {
		return 'oklch(0 0 0)';
	}
}

/** Check if a token value is a color (vs a spacing/size value like radius) */
export function isColorToken(key: string): boolean {
	return key !== 'radius';
}

function round(n: number, decimals: number): number {
	const factor = 10 ** decimals;
	return Math.round(n * factor) / factor;
}
