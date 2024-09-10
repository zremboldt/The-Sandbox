<script lang="ts">
	type Todo = {
		text: string;
		done: boolean;
	};
	type Filters = 'all' | 'active' | 'completed';

	let todos = $state<Todo[]>([
		{ text: 'Learn Svelte', done: false },
		{ text: 'Learn SvelteKit', done: false },
		{ text: 'Build something awesome', done: false }
	]);
	let filter = $state<Filters>('all');

	$effect(() => {
		// console.log(todos);
		console.log(JSON.stringify(todos));
		console.log(filter);
	});

	const addTodo = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;

		const inputElement = e.target as HTMLInputElement;
		const text = inputElement.value.trim();
		const done = false;

		todos = [...todos, { text, done }];
		inputElement.value = '';
	};

	const editTodo = (e: Event) => {
		const inputElement = e.target as HTMLInputElement;
		const index = Number(inputElement.dataset.index);

		todos[index].text = inputElement.value;
	};

	const toggleTodo = (e: Event) => {
		const checkboxElement = e.target as HTMLInputElement;
		const index = Number(checkboxElement.dataset.index);

		todos[index].done = !todos[index].done;
	};

	const setFilter = (newFilter: Filters) => {
		filter = newFilter;
	};

	const filterTodos = () => {
		if (filter === 'all') return todos;
		if (filter === 'active') return todos.filter((todo) => !todo.done);
		if (filter === 'completed') return todos.filter((todo) => todo.done);
	};

	let filteredTodos = $derived(filterTodos());

	const remaining = () => {
		return todos.filter((todo) => !todo.completed).length;
	};
</script>

<div class="app">
	<input type="text" onkeydown={addTodo} placeholder="Add todo" />

	<div class="todos">
		{#each filteredTodos as todo, i}
			<div class="todo" class:completed={todo.done}>
				<input onchange={toggleTodo} data-index={i} checked={todo.done} type="checkbox" />
				<input oninput={editTodo} data-index={i} value={todo.text} type="text" />
			</div>
		{/each}
	</div>

	<div class="filters">
		<button onclick={() => setFilter('all')}>All</button>
		<button onclick={() => setFilter('active')}>Active</button>
		<button onclick={() => setFilter('completed')}>Completed</button>
	</div>

	<p>{remaining()} remaining</p>
</div>

<style>
	:root {
		--card: hsl(0, 0%, 92%);
		--border: hsl(0, 0%, 80%);
	}

	.app {
		display: flex;
		flex-direction: column;
		gap: 40px;
		width: min(100%, 360px);
	}

	.todos {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: min(100%, 360px);
	}

	.todo {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 6px;
		background-color: var(--card);
		border-radius: 7px;

		&.completed {
			opacity: 0.4;
		}
	}

	input[type='text'] {
		flex: 1;
		padding: 10px 12px;
		border-radius: 4px;
		border: 1px solid var(--border);
		font-size: 1rem;
		box-shadow: 0 1px 3px -1px hsla(0, 0%, 0%, 0.25);
	}

	input[type='checkbox'] {
		margin: 6px;
		width: 18px;
		height: 18px;
		border: 1px solid var(--border);
		border-radius: 3px;
		cursor: pointer;
	}
</style>
