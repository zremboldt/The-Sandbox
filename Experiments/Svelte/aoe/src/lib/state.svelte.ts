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
	let generatedMap = $state([]);

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
	return getContext<Tile[]>(INITIAL_MAP_CTX); // We're getting the store from the Svelte context
}

// export const selectedToolTypeIndex = writable(0);

export const selectedToolContext = writable(GAME_OBJECTS.land.grass);

// function generateMap() {
// 	const lands = Object.values(GAME_OBJECTS.land);
// 	const initialMapType = lands[Math.floor(Math.random() * lands.length)];
// 	return [...Array(MAP_WIDTH * MAP_WIDTH)].map((_, i) => ({
// 		id: i,
// 		land: { type: initialMapType.type, image: initialMapType.images[0] },
// 		building: { type: '', image: '' }
// 	}));
// }

// export const worldMap = writable(generateMap());

// ALL DEPRECATED 👇
// ALL DEPRECATED 👇
// ALL DEPRECATED 👇
// ALL DEPRECATED 👇
// ALL DEPRECATED 👇
// ALL DEPRECATED 👇
// ALL DEPRECATED 👇
// ALL DEPRECATED 👇
// ALL DEPRECATED 👇

function createMap() {
	const lands = Object.values(GAME_OBJECTS.land);
	const initialMapType = lands[Math.floor(Math.random() * lands.length)];
	return [...Array(MAP_WIDTH * MAP_WIDTH)].map((_, i) => ({
		id: i,
		land: initialMapType,
		building: { type: '', images: [] }
	}));
}

export const generatedMap = writable(createMap());

export function updateTile(index, newTileData) {
	generatedMap.update((map) => {
		map[index] = { ...map[index], ...newTileData };
		return map;
	});
}

export function saveMap() {
	// Implementation for saving the map
}

export function loadMap(savedMap) {
	generatedMap.set(savedMap);
}
