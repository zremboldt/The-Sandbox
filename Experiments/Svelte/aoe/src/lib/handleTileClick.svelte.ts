import { LANDS, BUILDINGS, TILE_TYPES } from '$lib/constants';
import type { Tile } from '$lib/constants';
import { selectedToolTypeIndex } from './state.svelte';
import { get } from 'svelte/store';

const selectRandomImage = (images: string[]) => images[Math.floor(Math.random() * images.length)];

export const handleTileClick = (event: MouseEvent, clickedTile: Tile) => {
	if (event.buttons !== 1) return;

	const selectedToolProperties = TILE_TYPES[get(selectedToolTypeIndex)];

  const selectedTool = {
    type: selectedToolProperties.type,
    image: selectRandomImage(selectedToolProperties.images)
  }
  
  function checkToolSelected(typeToCheck: string) {
    if (LANDS.some(land => land.type === typeToCheck)) {
      return 'landTool';
    } else if (BUILDINGS.some(building => building.type === typeToCheck)) {
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
        type: LANDS[0].type,
        image: selectRandomImage(LANDS[0].images)
      }
    }
    clickedTile.building = selectedTool;
  } else if (toolTypeSelected === 'deleteTool') {
    clickedTile.building = { type: '', image: '' };
  }
};
