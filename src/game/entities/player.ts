import { Input, defaultInput } from '@/core/entity';
import { Vector2 } from 'three';
import { Ship } from './ship';

export class Player extends Ship {
  input: Input = defaultInput;
  local = true;
  score = 0;

  constructor(position = new Vector2(0, 0)) {
    super(position, 0x0000ff);
  }

  toString() {
    return `Player: ${JSON.stringify(this.position)}, v=${JSON.stringify(this.velocity)}, r=${this.rotation}, shooting=${this.shooting}, health=${this.health}, mass=${this.physics.getMass()}`;
  }
}
