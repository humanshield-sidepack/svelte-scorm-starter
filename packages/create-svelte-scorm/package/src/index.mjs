import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, basename } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ask, select } from './prompts.mjs';
import { copyTemplate } from './copy-template.mjs';
import { patchPackageJson } from './patch-pkg.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const TEMPLATES_DIR = resolve(__dirname, '..', 'templates');

// ANSI color helpers
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

/**
 * Detect which package manager invoked us.
 * @returns {string}
 */
function detectPackageManager() {
	const ua = process.env.npm_config_user_agent || '';
	if (ua.startsWith('pnpm')) return 'pnpm';
	if (ua.startsWith('yarn')) return 'yarn';
	if (ua.startsWith('bun')) return 'bun';
	return 'npm';
}

/**
 * Get the install command for a package manager.
 * @param {string} pm
 * @returns {string}
 */
function installCommand(pm) {
	if (pm === 'yarn') return 'yarn';
	return `${pm} install`;
}

/**
 * Discover available templates.
 * @returns {Promise<{ name: string; description: string; dir: string }[]>}
 */
async function discoverTemplates() {
	const entries = await readdir(TEMPLATES_DIR, { withFileTypes: true });
	const templates = [];

	for (const entry of entries) {
		if (!entry.isDirectory()) continue;
		const dir = join(TEMPLATES_DIR, entry.name);
		const metaPath = join(dir, '_template.json');
		let name = entry.name;
		let description = '';

		try {
			const meta = JSON.parse(await readFile(metaPath, 'utf-8'));
			name = meta.name || name;
			description = meta.description || '';
		} catch {
			// No metadata file, use directory name
		}

		templates.push({ name, description, dir });
	}

	return templates;
}

/**
 * Main CLI entry point.
 * @param {string[]} args
 */
export async function main(args) {
	console.log(`\n${bold('create-svelte-scorm')} ${dim('v0.1.0')}\n`);

	// Parse args
	let projectName = args[0];
	let templateFlag = null;
	for (let i = 0; i < args.length; i++) {
		if (args[i] === '--template' || args[i] === '-t') {
			templateFlag = args[i + 1];
			if (!projectName || projectName === args[i]) {
				projectName = undefined;
			}
		}
	}

	// Prompt for project name if not provided
	if (!projectName || projectName.startsWith('-')) {
		projectName = await ask('Project name', 'my-scorm-course');
	}

	// Validate project name
	if (!projectName || !/^[a-z0-9@][a-z0-9._\-/@]*$/i.test(projectName)) {
		throw new Error(`Invalid project name: "${projectName}"`);
	}

	const targetDir = resolve(process.cwd(), projectName);

	// Check target doesn't exist
	if (existsSync(targetDir)) {
		throw new Error(`Directory "${projectName}" already exists.`);
	}

	// Discover templates
	const templates = await discoverTemplates();
	if (templates.length === 0) {
		throw new Error('No templates found. The package may be corrupted.');
	}

	// Select template
	let template;
	if (templates.length === 1) {
		template = templates[0];
	} else if (templateFlag) {
		template = templates.find(
			(t) => t.name.toLowerCase() === templateFlag.toLowerCase() || basename(t.dir) === templateFlag
		);
		if (!template) {
			throw new Error(
				`Template "${templateFlag}" not found. Available: ${templates.map((t) => t.name).join(', ')}`
			);
		}
	} else {
		const index = await select('Select a template:', templates);
		template = templates[index];
	}

	console.log(`\nScaffolding project in ${cyan(targetDir)}...\n`);

	// Copy template
	await copyTemplate(template.dir, targetDir);
	console.log(`  ${green('✓')} Copied template: ${template.name}`);

	// Patch package.json
	await patchPackageJson(targetDir, projectName);
	console.log(`  ${green('✓')} Updated package.json`);

	// Git init
	try {
		execSync('git init', { cwd: targetDir, stdio: 'ignore' });
		console.log(`  ${green('✓')} Initialized git repository`);
	} catch {
		console.log(`  ${dim('⚠ Could not initialize git repository')}`);
	}

	// Install dependencies
	const pm = detectPackageManager();
	const cmd = installCommand(pm);
	console.log(`\n  Installing dependencies with ${bold(pm)}...\n`);

	try {
		execSync(cmd, { cwd: targetDir, stdio: 'inherit' });
		console.log(`\n  ${green('✓')} Dependencies installed`);
	} catch {
		console.log(`\n  ${dim('⚠ Failed to install dependencies. Run')} ${bold(cmd)} ${dim('manually.')}`);
	}

	// Done!
	console.log(`
${green('Done!')} Your project is ready.

  ${bold('cd')} ${projectName}
  ${bold(`${pm} run dev`)}

Happy building! 🎓
`);
}
