import { createInterface } from 'node:readline';

/**
 * Ask a question and return the answer (or a default value).
 * @param {string} query
 * @param {string} [defaultValue]
 * @returns {Promise<string>}
 */
export function ask(query, defaultValue) {
	const rl = createInterface({ input: process.stdin, output: process.stdout });
	const suffix = defaultValue ? ` \x1b[2m(${defaultValue})\x1b[0m` : '';
	return new Promise((resolve) => {
		rl.question(`${query}${suffix}: `, (answer) => {
			rl.close();
			resolve(answer.trim() || defaultValue || '');
		});
	});
}

/**
 * Show a numbered list and let the user pick one.
 * @param {string} query
 * @param {{ name: string; description?: string }[]} options
 * @returns {Promise<number>} index of the selected option
 */
export async function select(query, options) {
	console.log(`\n${query}\n`);
	for (let i = 0; i < options.length; i++) {
		const desc = options[i].description ? ` \x1b[2m- ${options[i].description}\x1b[0m` : '';
		console.log(`  \x1b[36m${i + 1}.\x1b[0m ${options[i].name}${desc}`);
	}
	console.log();

	const answer = await ask('Enter number', '1');
	const index = parseInt(answer, 10) - 1;
	if (isNaN(index) || index < 0 || index >= options.length) {
		console.log('Invalid selection, using first option.');
		return 0;
	}
	return index;
}
