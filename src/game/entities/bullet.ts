import { BoxGeometry, Mesh, MeshBasicMaterial, Vector2 } from 'three';
import { Entity } from '../../core/entity';

export class Bullet implements Entity {
  scale = new Vector2(1, 1);
  mesh: Mesh;
  projectile = true;

  constructor(
    public position = new Vector2(),
    public rotation = 0,
    public velocity = new Vector2()
  ) {
    const geometry = new BoxGeometry(10, 10);
    const material = new MeshBasicMaterial({ color: 0xff0000 });
    this.mesh = new Mesh(geometry, material);
  }

  toString() {
    return `Bullet: position=${JSON.stringify(this.position)}, velocity=${JSON.stringify(this.velocity)}, rotation=${this.rotation}`;
  }
}
