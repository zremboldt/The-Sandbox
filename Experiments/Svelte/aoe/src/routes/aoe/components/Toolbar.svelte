<script lang="ts">
	import { goto } from '$app/navigation';
	import { GAME_OBJECTS } from '$lib/constants';
	import type { Tile } from '$lib/constants';
	import { getMapContext, selectedToolContext } from '$lib/state.svelte';

	const worldMap = getMapContext();

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

		// When the model opens, populate the input field with the current map name to make it easier to save over the current map.
		const currentURL = new URL(window.location.href);
		const mapName = currentURL.searchParams.get('map');
		mapNameToSave = mapName?.split('__')[1] || '';
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
		const map = worldMap.map((tile) => {
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
		const url = new URL(window.location.href);

		// Set the map query parameter to the selected map name
		url.searchParams.set('map', mapNameToLoad);

		// Refresh the page with the new query parameter. This will trigger the loadMapFromLocalStorage function in the layout file.
		window.location.href = `${url.pathname}?${url.searchParams.toString()}`;
	};
</script>

<!-- ------------ -->
<!-- START MARKUP -->
<!-- ------------ -->

<nav class="toolbar">
	{#each Object.keys(GAME_OBJECTS) as objType, i}
		{#if objType === 'land'}<h3>Terrain</h3>
		{:else if objType === 'building'}<h3 style="margin-top: 10px">Buildings</h3>
		{:else if objType === 'tool'}<h3 style="margin-top: 10px">Tools</h3>
		{/if}
		{#each Object.values(GAME_OBJECTS[objType]) as gameObject, j}
			<label>
				<input
					type="radio"
					name="tileType"
					value={j}
					onchange={() => ($selectedToolContext = gameObject)}
				/>
				<span>{gameObject.type}</span>
			</label>
		{/each}
	{/each}

	<div class="toolbar-footer">
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

<!-- ------------ -->
<!-- START STYLES -->
<!-- ------------ -->

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
	}

	.toolbar-footer {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
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
