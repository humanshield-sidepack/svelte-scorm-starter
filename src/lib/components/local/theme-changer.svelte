<script lang="ts">
	import { IconSun, IconMoon, IconPalette } from '@tabler/icons-svelte';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as ScrollArea from '$lib/components/ui/scroll-area/index.js';
	import { Slider } from '$lib/components/ui/slider/index.js';
	import {
		themeState,
		themes,
		tokenGroups,
		oklchToHex,
		hexToOklch,
		isColorToken,
		type ThemeTokenKey
	} from '$lib/theme/index.js';

	let customDialogOpen = $state(false);
	let editMode = $state<'light' | 'dark'>('light');

	let radiusValue = $state<number>(10);

	// Sync radius slider from theme state
	$effect(() => {
		const tokens =
			editMode === 'light' ? themeState.customLightTokens : themeState.customDarkTokens;
		const match = tokens.radius.match(/([\d.]+)rem/);
		radiusValue = match ? parseFloat(match[1]) * 16 : 10;
	});

	function editingTokens(mode: 'light' | 'dark') {
		return mode === 'light' ? themeState.customLightTokens : themeState.customDarkTokens;
	}

	function handleThemeChange(value: string | undefined) {
		if (!value) return;
		themeState.setTheme(value);
	}

	function handleColorChange(key: ThemeTokenKey, hex: string) {
		const oklch = hexToOklch(hex);
		themeState.updateCustomToken(editMode, key, oklch);
	}

	function handleOklchInput(key: ThemeTokenKey, value: string) {
		themeState.updateCustomToken(editMode, key, value);
	}

	function commitRadius() {
		const rem = `${(radiusValue / 16).toFixed(3)}rem`;
		themeState.updateCustomToken('light', 'radius', rem);
		themeState.updateCustomToken('dark', 'radius', rem);
	}

	function openCustomizer() {
		if (themeState.activeThemeId !== 'custom') {
			themeState.resetCustomToTheme(themeState.activeThemeId);
			themeState.setTheme('custom');
		}
		customDialogOpen = true;
	}

	function tokenLabel(key: string): string {
		return key
			.split('-')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
	}
</script>

<div class="flex items-center gap-1.5">
	<!-- Theme Select Dropdown -->
	<Select.Root
		type="single"
		value={themeState.activeThemeId}
		onValueChange={handleThemeChange}
	>
		<Select.Trigger class="w-32.5 h-8 text-xs">
			<span data-slot="select-value" class="flex items-center gap-1.5">
				<span
					class="inline-block size-3 rounded-full border border-border shrink-0"
					style="background: {themeState.activeTheme.light.primary}"
				></span>
				{themeState.activeTheme.label}
			</span>
		</Select.Trigger>
		<Select.Content>
			{#each themes as theme (theme.id)}
				<Select.Item value={theme.id}>
					{#snippet children({ selected })}
						<span class="absolute inset-e-2 flex size-3.5 items-center justify-center">
							{#if selected}
								<span class="text-primary">✓</span>
							{/if}
						</span>
						<span class="flex items-center gap-2">
							<span
								class="inline-block size-3 rounded-full border border-border shrink-0"
								style="background: {theme.light.primary}"
							></span>
							{theme.label}
						</span>
					{/snippet}
				</Select.Item>
			{/each}
			<Select.Separator />
			<Select.Item value="custom">
				{#snippet children({ selected })}
					<span class="absolute inset-e-2 flex size-3.5 items-center justify-center">
						{#if selected}
							<span class="text-primary">✓</span>
						{/if}
					</span>
					<span class="flex items-center gap-2">
						<IconPalette class="size-3 shrink-0" />
						Custom
					</span>
				{/snippet}
			</Select.Item>
		</Select.Content>
	</Select.Root>

	<!-- Customize Button -->
	<Button variant="outline" size="icon" class="shadow-none size-8" onclick={openCustomizer}>
		<IconPalette class="size-4" />
		<span class="sr-only">Customize theme</span>
	</Button>

	<!-- Mode Toggle (light/dark) -->
	<Button onclick={toggleMode} variant="outline" size="icon" class="shadow-none size-8">
		<IconSun
			class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
		/>
		<IconMoon
			class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
</div>

<!-- Custom Theme Editor Dialog -->
<Dialog.Root bind:open={customDialogOpen}>
	<Dialog.Content class="sm:max-w-2xl max-h-[85vh] flex flex-col">
		<Dialog.Header>
			<Dialog.Title>Customize Theme</Dialog.Title>
			<Dialog.Description>
				Adjust colors and spacing to create your own theme.
			</Dialog.Description>
		</Dialog.Header>

		<!-- Copy from preset -->
		<div class="flex items-center gap-2">
			<span class="text-xs text-muted-foreground">Start from:</span>
			<div class="flex gap-1 flex-wrap">
				{#each themes as theme (theme.id)}
					<button
						class="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-accent transition-colors"
						onclick={() => themeState.resetCustomToTheme(theme.id)}
					>
						<span
							class="inline-block size-2 rounded-full shrink-0"
							style="background: {theme.light.primary}"
						></span>
						{theme.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Light / Dark Tabs -->
		<Tabs.Root bind:value={editMode}>
			<Tabs.List>
				<Tabs.Trigger value="light">
					<IconSun class="size-3.5 mr-1.5" />
					Light
				</Tabs.Trigger>
				<Tabs.Trigger value="dark">
					<IconMoon class="size-3.5 mr-1.5" />
					Dark
				</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="light">
				{@render tokenEditor('light')}
			</Tabs.Content>
			<Tabs.Content value="dark">
				{@render tokenEditor('dark')}
			</Tabs.Content>
		</Tabs.Root>
	</Dialog.Content>
</Dialog.Root>

{#snippet tokenEditor(mode: 'light' | 'dark')}
	{@const tokens = editingTokens(mode)}
	<ScrollArea.Root class="h-[50vh]">
		<div class="space-y-6 pr-4 pb-4">
			{#each tokenGroups as group (group.label)}
				<div>
					<h4
						class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3"
					>
						{group.label}
					</h4>
					<div class="space-y-2">
						{#each group.keys as key (key)}
							{#if isColorToken(key)}
								<!-- Color token row -->
								<div class="flex items-center gap-3">
									<label
										class="text-xs text-foreground/80 w-35 shrink-0 truncate"
										for="token-{mode}-{key}"
									>
										{tokenLabel(key)}
									</label>
									<div
										class="size-7 rounded-md border border-border shrink-0"
										style="background: {tokens[key]}"
									></div>
									<input
										type="color"
										class="size-7 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-border [&::-webkit-color-swatch]:border"
										value={oklchToHex(tokens[key])}
										onchange={(e) =>
											handleColorChange(
												key,
												(e.target as HTMLInputElement).value
											)}
									/>
									<input
										id="token-{mode}-{key}"
										type="text"
										class="flex-1 rounded-md border border-input bg-transparent px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
										value={tokens[key]}
										onchange={(e) =>
											handleOklchInput(
												key,
												(e.target as HTMLInputElement).value
											)}
									/>
								</div>
							{:else}
								<!-- Radius slider -->
								<div class="flex items-center gap-3">
									<label
										class="text-xs text-foreground/80 w-35 shrink-0"
										for="token-{mode}-{key}"
									>
										{tokenLabel(key)}
									</label>
									<div class="flex-1">
										<Slider
											type="single"
											bind:value={radiusValue}
											min={0}
											max={32}
											step={1}
											onValueCommit={commitRadius}
										/>
									</div>
									<span
										class="text-xs font-mono text-muted-foreground w-16 text-right"
									>
										{tokens[key]}
									</span>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<ScrollArea.Scrollbar orientation="vertical" />
	</ScrollArea.Root>
{/snippet}
