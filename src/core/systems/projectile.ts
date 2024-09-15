import { Vector2 } from 'three';
import { BULLET_FIRE_RATE, BULLET_SPEED, GAP } from '../../config';
import { BulletFactory } from '../../game/factories/bullet';
import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class ProjectileSystem extends System {
  timeSinceLastBullet = 0;

  constructor(engine: Engine) {
    super(engine, [Component.Shooter]);
  }

  update(delta: number) {
    this.entities.forEach((entity) => {
      // Change color of entity based on shooting state
      if (entity?.shooting) {
        // Entity size
        const { x, y } = entity.size;
        const rotation = entity.rotation;
        // In front-of position
        const radius = Math.max(x, y) / 2 + GAP;
        const position = entity.position
          .clone()
          .add(new Vector2(radius * Math.cos(rotation), radius * Math.sin(rotation)));

        // Spawn a bullet entity at a given fire rate
        if (this.timeSinceLastBullet > BULLET_FIRE_RATE) {
          this.engine.create(new BulletFactory(), {
            position: position,
            velocity: new Vector2(Math.cos(rotation), Math.sin(rotation)).multiplyScalar(BULLET_SPEED),
            rotation: rotation,
            parent: entity.id
          });
          this.timeSinceLastBullet = 0;
        }
      }
    });

    this.timeSinceLastBullet += delta;
  }
}
