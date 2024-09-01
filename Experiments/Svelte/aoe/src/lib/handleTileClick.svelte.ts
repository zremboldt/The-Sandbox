import { GAME_OBJECTS } from '$lib/constants';
import type { Tool, Tile } from '$lib/constants';

const selectRandomImage = (images: string[]) => images[Math.floor(Math.random() * images.length)];

export const handleTileClick = (
	event: MouseEvent,
	selectedToolContext: Tool,
	clickedTile: Tile
) => {
	if (event.buttons !== 1) return;

	const selectedTool = {
		type: selectedToolContext.type,
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
	} else if (toolTypeSelected === 'deleteTool') {
		clickedTile.building = { type: '', image: '' };
	}
};
