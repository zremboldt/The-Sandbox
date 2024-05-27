import { k } from './kaboomCtx';
import { makeMap } from './utils';
import { makePlayer, setControls } from './entities';
import gridBg from '../levels/grid_bg.png';
import galaxyBg from '../levels/galaxy_bg.png';
import 'the-new-css-reset/css/reset.css';
import '../styles/style.css';

const GRID_SIZE = 30;
const CELL_SIZE = 32;

async function gameSetup() {
  // k.add([k.rect(k.width(), k.height()), k.color(0, 0, 0), k.fixed()]);

  // const { map: level1Layout, spawnPoints: level1SpawnPoints } = await makeMap(
  //   k,
  //   "level-1"
  // );

  k.loadSprite('galaxy-1', galaxyBg);
  k.loadSprite('grid', gridBg);

  const { map: galaxy1Layout, grid } = await makeMap(k, 'galaxy-1');

  k.scene('level-1', async () => {
    k.add(galaxy1Layout);
    k.add(grid);

    // k.add([k.text('Hello, Kaboom!', 32), k.pos(20, 20)]);

    const playerPos = CELL_SIZE * (GRID_SIZE - 8);
    const player = makePlayer(
      k,
      playerPos,
      playerPos,
      // level1SpawnPoints.player[0].x,
      // level1SpawnPoints.player[0].y
    );

    setControls(k, player);
    k.add(player);
  });

  k.go('level-1');
}

gameSetup();
