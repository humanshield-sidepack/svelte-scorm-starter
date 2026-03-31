#!/usr/bin/env node

import { main } from './src/index.mjs';

main(process.argv.slice(2)).catch((err) => {
	console.error(`\n\x1b[31mError:\x1b[0m ${err.message}`);
	process.exit(1);
});
