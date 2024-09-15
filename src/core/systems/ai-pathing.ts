import { Vector2 } from 'three';
import { ENEMY_SPEED } from '../../config';
import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class AiPathingSystem extends System {
  lastPosition: Vector2 | null = null;

  constructor(engine: Engine) {
    super(engine, [Component.Positionable, Component.Moving, Component.Rotatable, Component.Physics]);
  }

  update() {
    for (const entity of this.entities) {
      if (entity?.local) {
        // player
        this.lastPosition = entity.position.clone();
        continue;
      }

      if (entity.enemy) {
        if (!this.lastPosition) {
          continue;
        }
        const distance = entity.position.distanceTo(this.lastPosition);

        if (distance < 500) {
          entity.physics!.setLinearVelocity(new Vector2(0, 0));
          continue;
        }

        const velocity = new Vector2(this.lastPosition.x - entity.position.x, this.lastPosition.y - entity.position.y);
        velocity.normalize();
        velocity.multiplyScalar(ENEMY_SPEED);

        entity.physics!.applyForceToCenter(velocity, true);
      } else continue;
    }
  }
}
