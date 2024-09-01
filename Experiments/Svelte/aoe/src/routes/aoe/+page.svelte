<script lang="ts">
	import { MAP_WIDTH } from '$lib/constants';
	import Toolbar from './components/Toolbar.svelte';
	import { handleTileClick } from '$lib/handleTileClick.svelte';
	import { getMapContext, selectedToolContext } from '$lib/state.svelte';

	const worldMap = getMapContext();

	// let selectedToolTypeIndex = $state(0);
	// let selectedTool = $derived(TILE_TYPES[$selectedToolTypeIndex]);
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
	<tt>Selected tool: {$selectedToolContext.type}</tt>
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
</div>

<!-- ------------ -->
<!-- ------------ -->

<!-- ------------ -->
<!-- START STYLES -->
<!-- ------------ -->

<!-- ------------ -->
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
</style>
