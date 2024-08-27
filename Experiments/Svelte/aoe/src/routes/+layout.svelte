<script>
	import '../app.css';
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
