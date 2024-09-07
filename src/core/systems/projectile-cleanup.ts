import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class ProjectileCleanupSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.Projectile]);
  }

  update(delta: number) {
    for (const entity of this.entities) {
      // Remove the entity if it's out of bounds
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;

      if (
        entity.position.x > halfWidth ||
        entity.position.x < -halfWidth ||
        entity.position.y > halfHeight ||
        entity.position.y < -halfHeight
      ) {
        this.engine.removeEntity(entity);
      }
    }
  }
}
