<script lang="ts">
	import FastBackward from '$lib/Icons/FastBackward.svelte';
	import FastForward from '$lib/Icons/FastForward.svelte';
	import SkipBackward from '$lib/Icons/SkipBackward.svelte';
	import SkipForward from '$lib/Icons/SkipForward.svelte';
	import Loop from '$lib/Icons/Loop.svelte';
	import Play from '$lib/Icons/Play.svelte';
	import Sound from '$lib/Sound.svelte';
	export let pause: boolean,
		loop: boolean,
		extended: boolean = false,
		containerClass: string = '',
		iconScale: string = '',
		playButtonSize: string = 'h-20 w-20',
		playIconScale: string = 'text-4xl';
</script>

<div class="flex-col flex-center mx-1/2 mt-10 h-50 bg-white text-dark gap-4 {containerClass}">
	<div class="text-xl flex-center gap-4">
		{#if extended}
			<div class="cursor-pointer {iconScale}">
				<SkipBackward />
			</div>

			<div class="cursor-pointer {iconScale}">
				<FastBackward />
			</div>
		{/if}
		<!-- Play button -->
		<div
			class="bg-red {playIconScale} flex-center rounded-full text-white text-opacity-100 opacity-100 cursor-pointer {playButtonSize} overflow-hidden"
		>
			<Play bind:isPlaying={pause} />
		</div>

		{#if extended}
			<div class="cursor-pointer {iconScale}">
				<FastForward />
			</div>

			<div class="cursor-pointer {iconScale}">
				<SkipForward />
			</div>
		{/if}
	</div>

	<div class="text-lg flex-center">
		<div class={iconScale}>
			<Sound />
		</div>
		<!-- Replay one -->
		<!-- TODO: fix  -->
		<div class="cursor-pointer {iconScale}" on:click={() => (loop = !loop)}>
			<Loop bind:loop />
		</div>
	</div>
	<slot />
</div>
