// import { scale } from './constants';
import rocinante from '../assets/artwork/spacecraft/rocinante.png';

export function makePlayer(k, posX, posY) {
  k.loadSprite('playerSprite', rocinante);

  const player = k.make([
    // k.sprite('assets', { anim: 'shipIdle' }),
    // k.area({ shape: new k.Rect(k.vec2(4, 5.9), 8, 10) }),
    k.sprite('playerSprite'),
    k.body(), // Getting error: "this.onCollideUpdate is not a function"
    // k.pos(posX * scale, posY * scale),
    k.pos(posX, posY),
    k.health(3),
    k.opacity(1),
    {
      speed: 32,
    },
    'player',
  ]);

  return player;
}

export function setControls(k, player) {
  k.onKeyPress((key) => {
    if (key === 'right') {
      player.pos.x += player.speed;
    }
    if (key === 'left') {
      player.pos.x -= player.speed;
    }
    if (key === 'up') {
      player.pos.y -= player.speed;
    }
    if (key === 'down') {
      player.pos.y += player.speed;
    }
  });
}
