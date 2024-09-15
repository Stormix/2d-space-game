import { Vector2 } from 'three';
import { Ship } from './ship';

export class Enemy extends Ship {
  shooting = false;
  enemy = true;

  constructor(position: Vector2) {
    super(position, 0x454545);
  }

  toString() {
    return `Enemy: position=${JSON.stringify(this.position)}, velocity=${JSON.stringify(this.velocity)}, rotation=${this.rotation}, shooting=${this.shooting}, health=${this.health}`;
  }
}
