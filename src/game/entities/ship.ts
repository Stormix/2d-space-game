import { BoxGeometry, Mesh, MeshBasicMaterial, Vector2 } from 'three';
import { defaultInput, Entity, Input } from '../../core/entity';

export class Ship implements Entity {
  position = new Vector2();
  rotation = 0;
  scale = new Vector2(1, 1);
  velocity = new Vector2();
  mesh: Mesh;
  input: Input = defaultInput;
  shooting = false;
  local = true;

  constructor() {
    const geometry = new BoxGeometry(50, 50);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.mesh = new Mesh(geometry, material);
  }

  toString() {
    return `Ship: position=${JSON.stringify(this.position)}, velocity=${JSON.stringify(this.velocity)}, rotation=${this.rotation}, shooting=${this.shooting}`;
  }
}
