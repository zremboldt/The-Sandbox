import grass1 from '$lib/images/tile/grass-1.png';
import grass2 from '$lib/images/tile/grass-2.png';
import water1 from '$lib/images/tile/water-1.png';
import water2 from '$lib/images/tile/water-2.png';
import sand1 from '$lib/images/tile/sand-1.png';
import sand2 from '$lib/images/tile/sand-2.png';
import dirt1 from '$lib/images/tile/dirt-1.png';
import dirt2 from '$lib/images/tile/dirt-2.png';
import forest1 from '$lib/images/tile/forest-1.png';
import forest2 from '$lib/images/tile/forest-2.png';
import forest3 from '$lib/images/tile/forest-3.png';
import forest4 from '$lib/images/tile/forest-4.png';

import farm1 from '$lib/images/structure/farm-1.png';
import farm2 from '$lib/images/structure/farm-2.png';
import house1 from '$lib/images/structure/house1.png';
import house2 from '$lib/images/structure/house2.png';
import stable from '$lib/images/structure/stable.png';
import blacksmith from '$lib/images/structure/blacksmith.png';

interface Land {
	type: string;
	image: string;
}

interface Building {
	type: string;
	image: string;
}

export interface Tile {
	id: number;
	land: Land;
	building: Building;
}

export const MAP_WIDTH = 30;

export const LANDS = [
	{
		type: 'grass',
		images: [grass1, grass2]
	},
	{
		type: 'water',
		images: [water1, water2]
	},
	{
		type: 'sand',
		images: [sand1, sand2]
	},
	{
		type: 'dirt',
		images: [dirt1, dirt2]
	},
	{
		type: 'forest',
		images: [forest1, forest2, forest3, forest4]
	}
];

export const BUILDINGS = [
	{
		type: 'farm',
		images: [farm1, farm2]
	},
	{
		type: 'stable',
		images: [stable]
	},
	{
		type: 'blacksmith',
		images: [blacksmith]
	},
	{
		type: 'house',
		images: [house1, house2]
	}
	// {
	// 	type: 'mine',
	// 	images: []
	// },
	// {
	// 	type: 'lumbercamp',
	// 	images: []
	// }
	// 'home',
	// 'dock',
	// 'wall',
	// 'tower',
	// 'castle',
	// 'blacksmith',
	// 'barracks',
	// 'stable'
];

export const TOOLS = [
	{
		type: 'delete',
		images: []
	}
];

export const TILE_TYPES = [...LANDS, ...BUILDINGS, ...TOOLS];
