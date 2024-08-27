<script lang="ts">
	import grass1 from '$lib/images/tile/grass-1.png';
	import grass2 from '$lib/images/tile/grass-2.png';
	import water1 from '$lib/images/tile/water-1.png';
	import water2 from '$lib/images/tile/water-2.png';
	import sand1 from '$lib/images/tile/sand-1.png';
	import sand2 from '$lib/images/tile/sand-2.png';
	import dirt1 from '$lib/images/tile/dirt-1.png';
	import dirt2 from '$lib/images/tile/dirt-2.png';
	import forest1 from '$lib/images/tile/forest-1.png';
	import forest2 from '$lib/images/tile/forest-2.png';
	import forest3 from '$lib/images/tile/forest-3.png';
	import forest4 from '$lib/images/tile/forest-4.png';

	import farm1 from '$lib/images/structure/farm-1.png';
	import farm2 from '$lib/images/structure/farm-2.png';
	import house1 from '$lib/images/structure/house1.png';
	import house2 from '$lib/images/structure/house2.png';
	import stable from '$lib/images/structure/stable.png';
	import blacksmith from '$lib/images/structure/blacksmith.png';

	const MAP_WIDTH = 30;

	const LANDS = [
		{
			type: 'grass',
			images: [grass1, grass2]
		},
		{
			type: 'water',
			images: [water1, water2]
		},
		{
			type: 'sand',
			images: [sand1, sand2]
		},
		{
			type: 'dirt',
			images: [dirt1, dirt2]
		},
		{
			type: 'forest',
			images: [forest1, forest2, forest3, forest4]
		}
	];
	const BUILDINGS = [
		{
			type: 'farm',
			images: [farm1, farm2]
		},
		{
			type: 'stable',
			images: [stable]
		},
		{
			type: 'blacksmith',
			images: [blacksmith]
		},
		{
			type: 'house',
			images: [house1, house2]
		}
		// {
		// 	type: 'mine',
		// 	images: []
		// },
		// {
		// 	type: 'lumbercamp',
		// 	images: []
		// }
		// 'home',
		// 'dock',
		// 'wall',
		// 'tower',
		// 'castle',
		// 'blacksmith',
		// 'barracks',
		// 'stable'
	];
	const TOOLS = [
		{
			type: 'delete',
			images: []
		}
	];
	const TILE_TYPES = [...LANDS, ...BUILDINGS, ...TOOLS];

	const saveMapPrefix = 'map__';

	let savedMaps = $state(
		typeof window !== 'undefined'
			? Object.keys(localStorage)?.filter((key) => key.includes(saveMapPrefix))
			: []
	);
	let mapNameToSave = $state('');
	let mapNameToLoad = $state('');

	let selectedTileTypeIndex = $state(0);
	let selectedTileType = $derived(TILE_TYPES[selectedTileTypeIndex]);

	const initialMapType = LANDS[Math.floor(Math.random() * LANDS.length)];

	let generatedMap = $state(
		[...Array(MAP_WIDTH * MAP_WIDTH)].map((_, i) => {
			return {
				id: i,
				land: initialMapType,
				building: { type: '', images: [] }
			};
		})
	);

	const handleTileClick = (event) => {
		if (event.buttons !== 1) return;

		const tileId = event.currentTarget.dataset.tileid;
		const tile = generatedMap[tileId];

		const isSelectedLand = LANDS.includes(selectedTileType);
		const isSelectedBuilding = BUILDINGS.includes(selectedTileType);

		// console.log(tile);
		console.log(selectedTileType);

		if (isSelectedLand) {
			tile.land = selectedTileType;
			// tile.image.type = selectedTileType.images[0];
			return;
		}
		if (isSelectedBuilding) {
			if (tile.land.type === 'water') return;
			if (tile.land.type === 'forest') {
				// if you place a building on forest, it will clear the forest
				tile.land = LANDS.find((land) => land.type === 'grass');
			}
			tile.building = selectedTileType;
			return;
		}
		if (selectedTileType.type === 'delete') {
			tile.building = { type: '', images: [] };
			return;
		}
	};

	const openSaveModal = () => {
		const saveModal = document.getElementById('save-modal');
		saveModal.showModal();
	};

	const openLoadModal = () => {
		const loadModal = document.getElementById('load-modal');
		loadModal.showModal();
	};

	const closeModal = () => {
		const modals = document.querySelectorAll('dialog');
		modals.forEach((modal) => modal.close());
	};

	const handleSave = () => {
		const map = generatedMap.map((tile) => {
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
		const map = JSON.parse(localStorage.getItem(mapNameToLoad));
		generatedMap = map;
		mapNameToSave = mapNameToLoad.replace(saveMapPrefix, '');
		closeModal();
	};

	const randomNumInRange = (itemCount: number) => {
		return Math.floor(Math.random() * itemCount);
	};
</script>

<svelte:head>
	<title>Tile Kingdoms</title>
	<meta
		name="description"
		content="The idea here is to build a little tile based, world building game, where you get a randomly generatied map to start and some resources, and you use those resources to build farms, lumber camps, quaries, etc to gain more resources and eventually build a nice little kingdom."
	/>
</svelte:head>

<header>
	<h2>Tile Kingdoms</h2>
	<tt>Selected tileType: {selectedTileType.type}</tt>
</header>
<div class="interface">
	<nav class="toolbar">
		{#each TILE_TYPES as tileType, i}
			{#if tileType === LANDS[0]}<h3>Terrain</h3>
			{:else if tileType === BUILDINGS[0]}<h3 style="margin-top: 10px">Buildings</h3>
			{:else if tileType === TOOLS[0]}<h3 style="margin-top: 10px">Tools</h3>
			{/if}
			<label>
				<input type="radio" name="tileType" value={i} bind:group={selectedTileTypeIndex} />
				<!-- <img src={tileType.images[0]} /> -->
				<span>{tileType.type}</span>
			</label>
		{/each}
		<div class="button-container">
			<button onclick={openSaveModal}>Save</button>
			<button onclick={openLoadModal}>Load</button>
		</div>
	</nav>

	<!-- svelte-ignore a11y_mouse_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->

	<main class="map" style="grid-template-columns: repeat({MAP_WIDTH}, 1fr)">
		{#each generatedMap as tile}
			<div
				class="tile"
				style={`background-image: url("${tile.land.images[randomNumInRange(tile.land.images.length)]}");`}
				data-tileId={tile.id}
				data-tileType={tile.land.type}
				onmouseover={handleTileClick}
				onmousedown={handleTileClick}
			>
				<span class="tile-number">{tile.id}</span>
				{#if tile.building.type}
					<img
						data-building={tile.building.type}
						src={tile.building.images[randomNumInRange(tile.building.images.length)]}
						alt="building"
					/>
					<!-- <div class="building" data-building={tile.building.type}></div> -->
				{/if}
			</div>
		{/each}
	</main>

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
</div>

<style>
	:root {
		--white: hsl(0, 0%, 100%);
		--water: hsl(207, 100%, 58%);
		--grass: hsl(105, 66%, 65%);
		--forest: hsl(153, 45%, 45%);
		--farm: hsl(49, 87%, 65%);
		--lumbercamp: hsl(24, 23%, 65%);

		--radius: 8px;
		--border: hsl(210, 21%, 81%);
		--surface: hsl(218, 21%, 90%);
		--grid: hsla(240, 100%, 50%, 0.1);
		--shadow: 0 4px 12px -2px hsla(0, 0%, 0%, 0.2);
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		padding: 10px;
	}

	.interface {
		display: flex;
		gap: 10px;
		width: 100%;
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

	.map {
		flex: 1;
		display: grid;
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		overflow: hidden;
		cursor: pointer;
	}

	.tile {
		aspect-ratio: 1;
		font-size: 8px;
		/* padding: 6%; */
		border-right: 1px solid var(--grid);
		border-bottom: 1px solid var(--grid);
		background-size: cover;
		user-select: none;

		& img {
			display: block;
			width: 100%;
			height: 100%;
			pointer-events: none;
		}

		/* &[data-tileType='forest'] {
			background-color: var(--forest);
		}
		&[data-tileType='water'] {
			background-color: var(--water);
		} */

		/* & .building {
			position: relative;
			z-index: 2;
			width: 100%;
			height: 100%;
			border-radius: 10%;
		} */

		/* & [data-building] {
			border: 1px solid hsla(0, 0%, 0%, 0.2);
		}
		& [data-building='farm'] {
			background-color: var(--farm);
		}
		& [data-building='mine'] {
			background-color: hsl(0, 0%, 79%);
		}
		& [data-building='lumbercamp'] {
			background-color: var(--lumbercamp);
		} */

		& .tile-number {
			user-select: none;
			position: absolute;
			display: none;
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
