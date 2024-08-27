<svelte:head>
	<title>Learn</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>
  import Nested from './Nested.svelte';
  import BigRedButton from './BigRedButton.svelte';

	let count = 0;
  $: doubled = count * 2;

  $: console.log(count);

  $: if (count === 10) {
    console.log(`count is ${count}!`);
    count = 0;
  }

	function increment() {
		count += 1;
	}

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  let selectedColor = colors[0];

  const getRandomNumber = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.2) {
        resolve(random);
      } else {
        reject(new Error('Request failed'));
      }
    }, 1000);
  });

  let promise = getRandomNumber();

  function handlePromise() {
    promise = getRandomNumber();
  }

  let mouse = { x: 0, y: 0 };

	function handleMove(event) {
		mouse.x = event.clientX.toFixed();
		mouse.y = event.clientY.toFixed();
	}

  let boundName = 'world';

  let a = 1;
  let b = 2;

	let doesConsentToEmail = false;
</script>

<main on:pointermove={handleMove}>
  <p class="pointer-data">x: {mouse.x}, y: {mouse.y}</p>

  <h1 style="color: {selectedColor}">Selected color</h1>

  {#each colors as color, i}
    <button
      style="background-color: {color}"
      on:click={() => selectedColor = color}
    >
      Color {i + 1}
    </button>
  {/each}
  
  <br />
  <br />
  
  <button on:click={increment}>
    Clicked {count}
    {count === 1 ? 'time' : 'times'}
  </button>
  
  <p>{count} doubled is {doubled}</p>
  
  {#if count < 4}
    <p>Count is less than 4</p>
  {:else if count < 6}
    <p>Count is less than 6</p>
  {:else}
    <p>Count is 6 or more</p>
  {/if}
  
  <Nested />
  <Nested answer={'42'} />
  
  
  <button on:click={handlePromise}>
    Fetch number
  </button>
  
  {#await promise}
    <p>loading...</p>
  {:then number}
    <p>The number is {number}</p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  
  <BigRedButton on:click={() => console.log('RED BUTTON CLICKED')} />
  
  <input bind:value={boundName} />
  
  <h1>Hello {boundName}!</h1>
  
  <label>
    <input type="number" bind:value={a} min="0" max="10" />
    <input type="range" bind:value={a} min="0" max="10" />
  </label>
  
  <label>
    <input type="number" bind:value={b} min="0" max="10" />
    <input type="range" bind:value={b} min="0" max="10" />
  </label>
  
  <p>{a} + {b} = {a + b}</p>


  <label>
    <input type="checkbox" bind:checked={doesConsentToEmail} />
    Yes! Send me regular email spam
  </label>
  
  {#if doesConsentToEmail}
    <p>
      Thank you. We will bombard your inbox and sell
      your personal details.
    </p>
  {:else}
    <p>
      You must opt in to continue. If you're not
      paying, you're the product.
    </p>
  {/if}
  
  <button disabled={!doesConsentToEmail}>Subscribe</button>
  
  
  I stopped at this page: <a href="https://learn.svelte.dev/tutorial/writable-stores">https://learn.svelte.dev/tutorial/writable-stores</a>
</main>


<style>
  main {
    display: flex;
    flex-direction: column;
  }
  button {
    background-color: mediumaquamarine;
    border: none;
    border-radius: 8px;
    width: 200px;
    height: 46px;
  }
  .pointer-data {
    position: fixed;
    left: 10px;
    bottom: 10px;
    padding: 10px;
    background-color: white;
    border-radius: 4px;
    margin: 0;
  }
</style>