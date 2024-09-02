import { GAME_OBJECTS } from '$lib/constants';
import type { Tool, Tile } from '$lib/constants';
import { inventoryFood, inventoryStone, inventoryWood, errorMessage } from './state.svelte';
import { get } from 'svelte/store';

const selectRandomImage = (images: string[]) => images[Math.floor(Math.random() * images.length)];

const mapResourceToInventory = {
	wood: inventoryWood,
	stone: inventoryStone,
	food: inventoryFood
};

const canAffordBuilding = (selectedTool: Tool) => {
	if (!selectedTool.stats?.cost) return true;

	for (const [resource, amount] of Object.entries(selectedTool.stats.cost)) {
		const amountInInventory = get(mapResourceToInventory[resource]);
		if (amountInInventory < amount) {
			errorMessage.set({
				message: `❌ You need ${amount - amountInInventory} more ${resource} to build this ${selectedTool.type}`,
				active: true
			});
			return false;
		}
	}
	return true;
};

const payBuildingCost = (selectedTool: Tool) => {
	for (const [resource, amount] of Object.entries(selectedTool.stats.cost)) {
		mapResourceToInventory[resource].update((inventoryTotal) => inventoryTotal - amount);
	}
};

export const handleTileClick = (
	event: MouseEvent,
	selectedToolContext: Tool,
	clickedTile: Tile
) => {
	if (event.buttons !== 1) return;

	const selectedTool = {
		...selectedToolContext,
		image: selectRandomImage(selectedToolContext.images)
	};

	function checkToolSelected(typeToCheck: string) {
		if (Object.keys(GAME_OBJECTS.land).includes(typeToCheck)) {
			return 'landTool';
		} else if (Object.keys(GAME_OBJECTS.building).includes(typeToCheck)) {
			return 'buildingTool';
		} else {
			return 'deleteTool';
		}
	}

	const toolTypeSelected = checkToolSelected(selectedTool.type);

	if (toolTypeSelected === 'landTool') {
		clickedTile.land = selectedTool;
	} else if (toolTypeSelected === 'buildingTool') {
		if (!canAffordBuilding(selectedTool)) return;
		if (clickedTile.land.type === 'water') return;
		if (clickedTile.land.type === 'forest') {
			// if you place a building on forest, it will clear the forest
			clickedTile.building = selectedTool;
			clickedTile.land = {
				type: GAME_OBJECTS.land.grass.type,
				image: selectRandomImage(GAME_OBJECTS.land.grass.images)
			};
		}
		clickedTile.building = selectedTool;
		payBuildingCost(selectedTool);
	} else if (toolTypeSelected === 'deleteTool') {
		clickedTile.building = { type: '', image: '' };
	}
};
