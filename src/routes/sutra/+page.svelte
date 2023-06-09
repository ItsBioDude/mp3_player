<script lang="ts">
	import fullAudioData from '$lib/audio.json';
	import { slide } from 'svelte/transition';
	import MediaPlayer from '$lib/MediaPlayer.svelte';
	import { browser } from '$app/environment';

	const audioData = {
		'Làng Mai': fullAudioData['Làng Mai'],
		Kinh: fullAudioData.Kinh
	};
	const audioDataEntries = Object.entries(audioData);
	// DATAs

	let accordionIsOpen: boolean[] = [];
	audioDataEntries.forEach(() => {
		accordionIsOpen.push(false);
	});

	const openAccordion = (index: number) => {
		if (accordionIsOpen[index] == true) {
			accordionIsOpen[index] = false;
			console.log('accordionIsOpen', accordionIsOpen, index);
		} else {
			audioDataEntries.forEach((e, i) => {
				accordionIsOpen[i] = false;
			});
			accordionIsOpen[index] = true;
		}
	};

	// accordionIsOpen

	let chosenFolder: string = audioDataEntries[0][0];
	let pause: boolean = false,
		loop: boolean;

	if (browser) {
		if (!('chosenSutraFolder' in localStorage) || localStorage.chosenSutraFolder == '') {
			localStorage.setItem('chosenSutraFolder', chosenFolder);
		} else {
			chosenFolder = localStorage.chosenSutraFolder;
		}

		if (!('chosenSutraIndex' in localStorage)) {
			localStorage.setItem('chosenSutraIndex', '0');
		}
	}

	async function queryData(index: number | string = 0) {
		const selectedFolder: string[] = await audioData[`${chosenFolder}`];
		// const a =
		if (!index) {
			index = localStorage.chosenSutraIndex;
		} else {
			localStorage.chosenSutraIndex = index;
		}

		const selectedAudio = await selectedFolder[index];

		return selectedAudio;
	}

	let fetchData = queryData();

	const handleSelectNewFile = (folder: string, index: number) => {
		chosenFolder = folder;
		localStorage.chosenSutraFolder = chosenFolder;
		fetchData = queryData(index);
	};
</script>

<div class="bg-gradient-to-br from-[#fc4a1a] to-[#f7b733] flex-center h-screen w-screen">
	<main
		class="bg-blur grid grid-cols-2 grid-rows-1 h-60vh w-60vw place-content-center backdrop-filter backdrop-blur bg-white rounded-md bg-opacity-80 overflow-hidden"
	>
		<div
			class="grid grid-rows-[1.5fr_2fr] justify-items-stretch items-stretch rounded-md h-full border-r-10 border-black-500"
		>
			<div class="bg-gradient-to-br from-[#191a2e] rounded-tl-md to-[#221841] text-white flex">
				<img
					src="https://source.unsplash.com/random"
					alt=""
					class="h-45 aspect-square object-cover"
				/>
				<!-- TODO: spin -->
				{#await fetchData}
					<p>Loading</p>
				{:then selectedAudio}
					<h3 class="mx-2 self-center font-bold font-title">
						{selectedAudio.replace(`audio\\${chosenFolder}\\`, '').replace('.mp3', '')}
					</h3>
					<audio src={selectedAudio} autoplay {loop} bind:paused={pause} class="display-none">
						<track kind="captions" />
					</audio>
				{/await}
			</div>
			<MediaPlayer bind:loop bind:pause playIconScale="text-6xl" iconScale="text-4xl" />
		</div>
		<div
			class="max-w-60vw overflow-y-scroll scrollbar scrollbar-w-10px scrollbar-rounded bg-white bg-opacity-90"
		>
			<!-- <Accordion> -->

			{#each audioDataEntries as [title, content], i}
				<div class="mt-2 mr-4">
					<button
						on:click={() => openAccordion(i)}
						aria-expanded={accordionIsOpen[i]}
						class="font-title flex-center text-2xl"
						><svg
							style="tran"
							width="20"
							height="20"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
						>
						{title}
					</button>
					{#if accordionIsOpen[i]}
						<ul transition:slide={{ duration: 300 }} class="text-base">
							{#each content as item, fileIndex}
								<li
									class="hover:decoration-underline cursor-pointer decoration-none list-decimal mb-2"
									on:click={() => handleSelectNewFile(title, fileIndex)}
								>
									{item.replace(`audio\\${title}\\`, '').replace(`.mp3`, '')}
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</main>
</div>

<style>
	button {
		border: none;
		background: none;
		/* display: block; */
		color: inherit;
		/* font-size: 36px; */
		cursor: pointer;
	}

	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
</style>
