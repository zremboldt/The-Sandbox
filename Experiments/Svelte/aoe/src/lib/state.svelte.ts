import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';
import { MAP_WIDTH, GAME_OBJECTS } from './constants';
import type { Tile } from './constants';

// https://www.youtube.com/watch?v=EyDV5XLfagg

// type UserData = {
// 	name: string;
// 	email: string;
// };

// const USER_CTX = 'USER_CTX';

// // getContext and setContext can only be called during a component's initialization.
// export function setUserState(initialData: UserData) {
// 	const userState = $state(initialData); // We're writing our initial data to the store
// 	setContext(USER_CTX, userState); // We're adding the store to the Svelte context
// 	return userState;
// }

// export function getUserState() {
// 	return getContext<UserData>(USER_CTX); // We're getting the store from the Svelte context
// }

const INITIAL_MAP_CTX = 'INITIAL_MAP_CTX';

// getContext and setContext can only be called during a component's initialization.
export function initializeMapContext(initialData: Tile[] = []) {
	// Rename this function ☝️ to initializeWorldContext

	// initialData now contains an object that looks like this:
	// const initialData = {
	//   worldMap: [
	//     {
	//       id: 0,
	//       land: { type: 'grass', image: 'grass1' },
	//       building: { type: '', image: '' }
	//     },
	//     {
	//       id: 1,
	//       land: { type: 'grass', image: 'grass2' },
	//       building: { type: '', image: '' }
	//     }
	//     // ... more tiles
	//   ],
	//   inventory: {
	//     food: 150,
	//     wood: 300,
	//     stone: 0,
	//     population: 3
	//   }
	// };

	let generatedMap = $state([]);

	// if (initialData.worldMap.length) {
	// generatedMap = initialData.worldMap;

	// localStorage.setItem('worldMap', JSON.stringify(initialData));

	if (initialData.length) {
		generatedMap = initialData;
	} else {
		const lands = Object.values(GAME_OBJECTS.land);
		const initialMapType = lands[Math.floor(Math.random() * lands.length)];
		const selectRandomImage = (images: string[]) =>
			images[Math.floor(Math.random() * images.length)];

		// We're writing our initial data to the store
		generatedMap = [...Array(MAP_WIDTH * MAP_WIDTH)].map((_, i) => ({
			id: i,
			land: { type: initialMapType.type, image: selectRandomImage(initialMapType.images) },
			building: { type: '', image: '' }
		}));
	}

	setContext(INITIAL_MAP_CTX, generatedMap); // We're adding the store to the Svelte context
	return generatedMap;
}

export function getMapContext() {
	// Rename this function ☝️ to getWorldContext
	return getContext<Tile[]>(INITIAL_MAP_CTX); // We're getting the store from the Svelte context
}

// export const selectedToolTypeIndex = writable(0);

export const selectedToolContext = writable(GAME_OBJECTS.land.grass);

export const inventoryFood = writable(150);
export const inventoryWood = writable(300);
export const inventoryStone = writable(0);
export const inventoryPopulation = writable(3);

export const workBuildingCount = writable(0);

export const errorMessage = writable({ message: '', active: false });

let timeout; // storing the timeout reference prevents timeout stacking

// Subscribe to changes in the errorMessage store
errorMessage.subscribe((value) => {
	if (value.active) {
		clearTimeout(timeout); // Clear any existing timeout
		timeout = setTimeout(() => {
			// Update the store correctly by calling set
			errorMessage.update((current) => {
				return { ...current, active: false };
			});
		}, 4000);
	}
});
