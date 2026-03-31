/**
 * Prepublish script: copies the template from the repo root into
 * this package's templates/ directory so it ships with the npm tarball.
 *
 * Because the destination is inside the source (repo root contains packages/),
 * we copy to a temp directory first, then move it into place.
 */

import { existsSync } from 'node:fs';
import { rm, mkdir, cp, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { resolve, basename, extname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PACKAGE_ROOT = resolve(__dirname, '..');
const REPO_ROOT = resolve(PACKAGE_ROOT, '..', '..');
const TEMPLATES_OUT = resolve(PACKAGE_ROOT, 'templates');

/** Names to exclude when copying the template */
const EXCLUDED_NAMES = new Set([
	'node_modules',
	'dist',
	'dist-ssr',
	'.git',
	'.DS_Store',
	'pnpm-lock.yaml',
	'scorm-packages',
	'.video-cache',
	'packages',
	'_template.json'
]);

/** File extensions to exclude (large media) */
const EXCLUDED_EXTENSIONS = new Set(['.mov', '.mp4', '.webm']);

async function main() {
	console.log('Preparing templates for publishing...\n');

	// Clean existing templates output
	if (existsSync(TEMPLATES_OUT)) {
		await rm(TEMPLATES_OUT, { recursive: true });
	}

	// Copy to a temp dir first (fs.cp cannot copy a dir into a subdirectory of itself)
	const tmpDir = await mkdtemp(join(tmpdir(), 'create-svelte-scorm-'));
	const tmpDest = join(tmpDir, 'default');

	await cp(REPO_ROOT, tmpDest, {
		recursive: true,
		filter(source) {
			const name = basename(source);
			if (EXCLUDED_NAMES.has(name)) return false;
			if (EXCLUDED_EXTENSIONS.has(extname(name).toLowerCase())) return false;
			return true;
		}
	});

	// Copy _template.json metadata into the template dir
	const metaSrc = resolve(REPO_ROOT, '_template.json');
	if (existsSync(metaSrc)) {
		const meta = await readFile(metaSrc, 'utf-8');
		await writeFile(join(tmpDest, '_template.json'), meta);
	}

	// Copy from temp to final location (can't rename across devices)
	const finalDest = join(TEMPLATES_OUT, 'default');
	await cp(tmpDest, finalDest, { recursive: true });

	// Cleanup temp dir
	await rm(tmpDir, { recursive: true }).catch(() => {});

	console.log('  ✓ Copied template: default');
	console.log(`\nTemplates ready in ${TEMPLATES_OUT}`);
}

main().catch((err) => {
	console.error('Failed to prepare templates:', err.message);
	process.exit(1);
});
