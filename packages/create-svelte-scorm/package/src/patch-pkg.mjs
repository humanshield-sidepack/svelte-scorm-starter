import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Update the scaffolded project's package.json with the user's project name.
 * @param {string} targetDir
 * @param {string} projectName
 */
export async function patchPackageJson(targetDir, projectName) {
	const pkgPath = join(targetDir, 'package.json');
	const raw = await readFile(pkgPath, 'utf-8');
	const pkg = JSON.parse(raw);

	pkg.name = projectName;
	pkg.version = '0.0.1';
	delete pkg.private;

	await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}
