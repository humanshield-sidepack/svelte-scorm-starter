import { cp } from 'node:fs/promises';
import { basename, extname } from 'node:path';

/** Directory and file names to always exclude */
const EXCLUDED_NAMES = new Set([
	'node_modules',
	'dist',
	'dist-ssr',
	'.git',
	'.DS_Store',
	'pnpm-lock.yaml',
	'scorm-packages',
	'.video-cache',
	'_template.json',
	'packages'
]);

/** File extensions to exclude (large media) */
const EXCLUDED_EXTENSIONS = new Set(['.mov', '.mp4', '.webm']);

/**
 * Copy a template directory to a target, excluding unwanted files.
 * @param {string} src - Source template directory
 * @param {string} dest - Target directory
 */
export async function copyTemplate(src, dest) {
	await cp(src, dest, {
		recursive: true,
		filter(source) {
			const name = basename(source);
			if (EXCLUDED_NAMES.has(name)) return false;
			if (EXCLUDED_EXTENSIONS.has(extname(name).toLowerCase())) return false;
			return true;
		}
	});
}
