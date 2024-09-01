<script lang="ts">
	import { TILE_TYPES, LANDS, BUILDINGS, TOOLS } from '$lib/constants';
	import type { Tile } from '$lib/constants';
	import { selectedToolTypeIndex, generatedMap, getMapContext } from '$lib/state.svelte';

  // const worldMap = getMapContext();

	type Props = {
		selectedToolTypeIndex: number;
		generatedMap: Tile[];
	};

	const saveMapPrefix = 'map__';

	let savedMaps = $state(
		typeof window !== 'undefined'
			? Object.keys(localStorage)?.filter((key) => key.includes(saveMapPrefix))
			: []
	);

	let mapNameToSave = $state('');
	let mapNameToLoad = $state('');

	const openSaveModal = () => {
		const saveModal = document.getElementById('save-modal') as HTMLDialogElement;
		saveModal.showModal();
	};

	const openLoadModal = () => {
		const loadModal = document.getElementById('load-modal') as HTMLDialogElement;
		loadModal.showModal();
	};

	const closeModal = () => {
		const modals = document.querySelectorAll('dialog');
		modals.forEach((modal) => modal.close());
	};

	const handleSave = () => {
		const map = $generatedMap.map((tile) => {
			return {
				id: tile.id,
				land: tile.land,
				building: tile.building
			};
		});

		localStorage.setItem(`${saveMapPrefix}${mapNameToSave}`, JSON.stringify(map));
		closeModal();
	};

	const handleLoad = () => {
		const mapDataAsString = localStorage.getItem(mapNameToLoad);
		if (!mapDataAsString) return;

		// assign the loaded map to the current map on screen
		$generatedMap = JSON.parse(mapDataAsString);

		// After loading and updating a map, it's likely that the user will want to save thier changes.
		// This next line makes that easy by prepopulating the save modal with the name of the currently loaded map.
		mapNameToSave = mapNameToLoad.replace(saveMapPrefix, '');
		closeModal();
	};
</script>

<nav class="toolbar">
	{#each TILE_TYPES as tileType, i}
		{#if tileType === LANDS[0]}<h3>Terrain</h3>
		{:else if tileType === BUILDINGS[0]}<h3 style="margin-top: 10px">Buildings</h3>
		{:else if tileType === TOOLS[0]}<h3 style="margin-top: 10px">Tools</h3>
		{/if}
		<label>
			<input type="radio" name="tileType" value={i} bind:group={$selectedToolTypeIndex} />
			<!-- <img src={tileType.images[0]} /> -->
			<span>{tileType.type}</span>
		</label>
	{/each}
	<div class="button-container">
		<button onclick={openSaveModal}>Save</button>
		<button onclick={openLoadModal}>Load</button>
	</div>

	<dialog id="save-modal">
		<div class="dialog-inner">
			<h2>Save Map</h2>
			<input bind:value={mapNameToSave} type="text" />
			<div class="button-row">
				<button onclick={closeModal}>Cancel</button>
				<button onclick={handleSave}>Save</button>
			</div>
		</div>
	</dialog>

	<dialog id="load-modal">
		<div class="dialog-inner">
			<h2>Load Map</h2>

			<select bind:value={mapNameToLoad} onchange={handleLoad}>
				<option value="">--Select a map--</option>
				{#each savedMaps as savedMap}
					<option value={savedMap}>
						{savedMap}
					</option>
				{/each}
			</select>

			<button onclick={closeModal}>Cancel</button>
		</div>
	</dialog>
</nav>

<style>
	:root {
		--white: hsl(0, 0%, 100%);

		--radius: 8px;
		--border: hsl(210, 21%, 81%);
		--surface: hsl(218, 21%, 90%);
		--grid: hsla(240, 100%, 50%, 0.1);
		--shadow: 0 4px 12px -2px hsla(0, 0%, 0%, 0.2);
	}

	.toolbar {
		display: flex;
		flex-direction: column;
		width: 200px;
		padding: 10px;
		border-radius: var(--radius);
		background-color: var(--white);
		box-shadow: var(--shadow);

		& .button-container {
			margin-top: auto;
			display: flex;
			gap: 4px;
		}
		& button {
			flex: 1;
		}
	}

	dialog {
		width: min(100%, 350px);
		padding: 30px;
		background-color: var(--white);
		border-radius: var(--radius);
		border: none;
		box-shadow: var(--shadow);
	}

	.dialog-inner {
		display: flex;
		flex-direction: column;
		gap: 10px;

		& .button-row {
			display: flex;
			gap: 10px;

			& button {
				flex: 1;
			}
		}
	}
</style>
