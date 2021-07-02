import { downTo, pluralize } from './helpers';

export class Bottles {
  verse(count) {
    const firstVessel = pluralize('bottle', count, 'bottles');
    const secondVessel = pluralize('bottle', count - 1, 'bottles');

    return (
      `${count} ${firstVessel} of milk on the wall, ` +
      `${count} ${firstVessel} of milk.\n` +
      'Take one down and pass it around, ' +
      `${count - 1} ${secondVessel} of milk on the wall.\n`
    );
  }
}
