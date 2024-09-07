import { Vector2 } from 'three';
import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

const ENEMY_SPEED = 0.5;

export class EnemyMovementSystem extends System {
  lastPosition: Vector2 | null = null;

  constructor(engine: Engine) {
    super(engine, [Component.Positionable, Component.Moving, Component.Rotatable]);
  }

  update(delta: number) {
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

        const velocity = new Vector2(this.lastPosition.x - entity.position.x, this.lastPosition.y - entity.position.y);
        velocity.normalize();

        entity.velocity.x = velocity.x * ENEMY_SPEED;
        entity.velocity.y = velocity.y * ENEMY_SPEED;
      } else continue;
    }
  }
}
