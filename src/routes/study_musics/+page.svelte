<script lang="ts">
	// import 'virtual:uno.css';
	import audioData from '$lib/audio.json';
	import { RanInt } from '$lib/Utils';
	import MediaPlayer from '$lib/MediaPlayer.svelte';
	import { browser } from '$app/environment';
	import { storage } from 'svelte-legos';
	import { writable } from 'svelte/store';

	// let selectedFolder = '';
	const chosenFolder = storage(writable(''), 'selectedMusic');
	let currentAudioIndex: number,
		isNewFolder: boolean = true;
	let pause: boolean, loop: boolean;
	// let selectedFolder, selectedAudioIndex, selectedAudio: string;

	async function queryData() {
		const selectedFolder: string[] = await audioData[`${$chosenFolder}`];
		let newIndex = await RanInt(selectedFolder.length);
		while (!isNewFolder || newIndex !== currentAudioIndex)
			newIndex = await RanInt(selectedFolder.length);
		const selectedAudio = await selectedFolder[newIndex];

		return selectedAudio;
	}
	let fetchData = queryData();

	const handleSelectNewFolder = () => {
		fetchData = queryData();
		isNewFolder = true;
	};
</script>

<!-- <svelte:head>MP3 PLAYER</svelte:head> -->

<div class="bg-gradient-to-br from-[#fc4a1a] to-[#f7b733] flex-center h-screen w-screen">
	<main
		class="bg-blur grid grid-cols-2 grid-rows-1 min-h-40vh min-w-40vw place-content-center backdrop-filter backdrop-blur bg-white rounded-md bg-opacity-80"
	>
		<div
			class="grid grid-rows-[1.5fr_2fr] justify-items-stretch rounded-md h-full border-r-2 border-black-500"
		>
			<select bind:value={$chosenFolder} on:change={handleSelectNewFolder}>
				{#each ['Nhạc Thiền', 'Pops Musics'] as [folder]}
					<option value={folder}>
						{folder}
					</option>
				{/each}
			</select>

			{#await fetchData}
				<p>Loading</p>
			{:then selectedAudio}
				<p>{selectedAudio.replace(`audio\\${$chosenFolder}\\`, '').replace('.mp3', '')}</p>
				<audio src={selectedAudio} autoplay {loop} bind:paused={pause}>
					<track kind="captions" />
				</audio>
			{/await}

			<div
				class="bg-grandient-to-br from-[#00F260] rounded-tl-md px-4 pt-4 bg-green to-[#0575E6] flex justify-center items-end h-full w-full"
			>
				<img
					src="amitabha.webp"
					alt=""
					class="rounded-full transform translate-y-1/2 w-26 h-26 object-cover"
				/>
				<!-- TODO: spin -->
			</div>
			<MediaPlayer bind:loop bind:pause />
		</div>
	</main>
</div>
