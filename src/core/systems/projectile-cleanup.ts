import { BOUNDS } from '../../config';
import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class ProjectileCleanupSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.Projectile, Component.Expires]);
  }

  update() {
    for (const entity of this.entities) {
      // Remove the entity if it's out of bounds
      if (
        entity.lifetime! <= 0 ||
        entity.position.x > BOUNDS[1] ||
        entity.position.x < BOUNDS[0] ||
        entity.position.y > BOUNDS[1] ||
        entity.position.y < BOUNDS[0]
      ) {
        this.engine.remove(entity);
      }

      if (entity.lifetime) {
        entity.lifetime -= 1;
      }
    }
  }
}
