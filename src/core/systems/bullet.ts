import { Vector2 } from 'three';
import { BulletFactory } from '../../game/factories/bullet-factory';
import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

const BULLET_SPEED = 0.1;
const BULLET_FIRE_RATE = 50; // 1 bullet every 50ms

export class BulletSystem extends System {
  timeSinceLastBullet = 0;

  constructor(engine: Engine) {
    super(engine, [Component.Shooter]);
  }

  update(delta: number) {
    this.entities.forEach((entity) => {
      // Change color of entity based on shooting state
      if (entity?.shooting) {
        // Spawn a bullet entity at a given fire rate
        if (this.timeSinceLastBullet > BULLET_FIRE_RATE) {
          this.engine.createEntity(new BulletFactory(), {
            position: entity.position.clone(),
            velocity: new Vector2(Math.cos(entity.rotation) * BULLET_SPEED, Math.sin(entity.rotation) * BULLET_SPEED),
            rotation: entity.rotation
          });
          this.timeSinceLastBullet = 0;
        }
      }
    });

    this.timeSinceLastBullet += delta;
  }
}
