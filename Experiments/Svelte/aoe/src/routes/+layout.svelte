<script>
	import '../app.css';
	import { initializeMapContext } from '$lib/state.svelte';

	function loadMapFromLocalStorage() {
		if (typeof window === 'undefined') return;

		const urlParams = new URLSearchParams(window.location.search);
		const savedMapName = urlParams.get('map');

		if (!savedMapName) return;

		const mapDataAsString = localStorage.getItem(savedMapName);

		if (!mapDataAsString) return;

		return JSON.parse(mapDataAsString);
	}

	initializeMapContext(loadMapFromLocalStorage());
</script>

<div class="app">
	<div class="wrap">
		<slot />
	</div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		min-height: 100svh;
	}
	.wrap {
		width: min(100%, 1000px);
	}
</style>
