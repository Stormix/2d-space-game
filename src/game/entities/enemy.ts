import { BoxGeometry, Mesh, MeshBasicMaterial, Vector2 } from 'three';
import { Entity } from '../../core/entity';

export class Enemy implements Entity {
  position = new Vector2();
  rotation = 0;
  scale = new Vector2(1, 1);
  velocity = new Vector2();
  mesh: Mesh;
  shooting = false;
  enemy = true;

  constructor() {
    const geometry = new BoxGeometry(50, 50);
    const material = new MeshBasicMaterial({ color: 0xb94a44 });
    this.mesh = new Mesh(geometry, material);
  }

  toString() {
    return `Enemy: position=${JSON.stringify(this.position)}, velocity=${JSON.stringify(this.velocity)}, rotation=${this.rotation}, shooting=${this.shooting}`;
  }
}
