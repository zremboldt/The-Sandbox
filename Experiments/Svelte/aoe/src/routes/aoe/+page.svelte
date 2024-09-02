<script lang="ts">
	import { GAME_OBJECTS, MAP_WIDTH } from '$lib/constants';
	import Toolbar from './components/Toolbar.svelte';
	import { handleTileClick } from '$lib/handleTileClick.svelte';
	import {
		getMapContext,
		selectedToolContext,
		inventoryFood,
		inventoryWood,
		inventoryStone,
		inventoryPopulation,
		errorMessage
	} from '$lib/state.svelte';

	const worldMap = getMapContext();

	// Maybe resources should be stored in local storage???
	const gameLoop = () => {
		$inventoryPopulation = 0; // Reset population count

		worldMap.forEach((tile) => {
			const buildingType = tile.building.type;

			// if building has stats.collectionRate then check the key and add the value to the inventory
			if (buildingType && GAME_OBJECTS.building[buildingType]?.stats?.collectionRate) {
				const collectionRate = GAME_OBJECTS.building[buildingType].stats.collectionRate;
				$inventoryFood += collectionRate.food ?? 0;
				$inventoryWood += collectionRate.wood ?? 0;
				$inventoryStone += collectionRate.stone ?? 0;
			}

			if (buildingType && GAME_OBJECTS.building[buildingType]?.stats?.population) {
				$inventoryPopulation += GAME_OBJECTS.building[buildingType].stats.population;
			}
		});
	};

	// Call the function when the component initializes
	setInterval(() => {
		console.log('tick');
		gameLoop();
	}, 2000);
</script>

<!-- ------------ -->
<!-- START MARKUP -->
<!-- ------------ -->

<svelte:head>
	<title>Tile Kingdoms</title>
	<meta
		name="description"
		content="The idea here is to build a little tile based, world building game, where you get a randomly generatied map to start and some resources, and you use those resources to build farms, lumber camps, quaries, etc to gain more resources and eventually build a nice little kingdom."
	/>
</svelte:head>

<header>
	<h2>Tile Kingdoms</h2>
	<!-- <tt>Selected tool: {$selectedToolContext.type}</tt> -->
	<div class="resources">
		<p><span>🥩</span>{$inventoryFood}</p>
		<p><span>🪵</span>{$inventoryWood}</p>
		<p><span>🪨</span>{$inventoryStone}</p>
		<p><span>👤</span>{$inventoryPopulation}</p>
	</div>
</header>

<div class="interface">
	<Toolbar />

	<!-- svelte-ignore a11y_mouse_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->

	<main class="map" style="grid-template-columns: repeat({MAP_WIDTH}, 1fr)">
		{#each worldMap as tile}
			<div
				class="tile"
				style={`background-image: url("${tile.land.image}");`}
				data-tileId={tile.id}
				data-tileType={tile.land.type}
				onmouseover={(e) => handleTileClick(e, $selectedToolContext, tile)}
				onmousedown={(e) => handleTileClick(e, $selectedToolContext, tile)}
			>
				{#if tile.building.type}
					<img data-building={tile.building.type} src={tile.building.image} alt="building" />
				{/if}
			</div>
		{/each}
	</main>
	<div class={`toast ${$errorMessage.active && 'active'}`}>
		<p>{$errorMessage.message}</p>
	</div>
</div>

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
		--easeOutQuart: cubic-bezier(0.165, 0.85, 0.45, 1);
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

	.resources {
		display: flex;
		gap: 30px;

		p {
			display: flex;
			align-items: center;
			gap: 5px;
		}
		span {
			font-size: 24px;
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
	}

	.toast {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto 20px;
		padding: 16px 28px;
		width: fit-content;
		text-align: center;
		border-radius: 999px;
		background-color: var(--white);
		box-shadow: var(--shadow);
		pointer-events: none;
		transition: transform 0.2s var(--easeOutQuart);
		transform: translateY(80px);

		&.active {
			transform: translateY(0);
		}
	}
</style>
