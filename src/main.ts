import { mount } from 'svelte';
import './app.css';
import '$lib/theme/index.js';
import App from './App.svelte';

const app = mount(App, {
	target: document.querySelector('#app')!
});

export default app;
