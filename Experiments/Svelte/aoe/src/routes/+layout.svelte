<script>
	import '../app.css';
	import { initializeMapContext } from '$lib/state.svelte';

	function loadWorldFromLocalStorage() {
		if (typeof window === 'undefined') return;

		const urlParams = new URLSearchParams(window.location.search);
		const savedWorldName = urlParams.get('map');

		if (!savedWorldName) return;

		const savedWorldData = localStorage.getItem(savedWorldName);

		if (!savedWorldData) return;

		return JSON.parse(savedWorldData);
	}

	initializeMapContext(loadWorldFromLocalStorage());
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
