import { Vector2 } from 'three';
import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class ObjectMovementSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.Positionable, Component.Moving, Component.Rotatable]);
  }

  update(delta: number) {
    for (const entity of this.entities) {
      const newPosition = new Vector2(
        entity.position.x + entity.velocity.x * delta,
        entity.position.y + entity.velocity.y * delta
      );

      const shouldWrapAround = !!entity.input || !!entity.enemy;

      if (shouldWrapAround) {
        // Only wrap around if the entity has input (player)
        const halfWidth = window.innerWidth / 2;
        const halfHeight = window.innerHeight / 2;
        entity.position.x =
          newPosition.x > halfWidth ? -halfWidth : newPosition.x < -halfWidth ? halfWidth : newPosition.x;
        entity.position.y =
          newPosition.y > halfHeight ? -halfHeight : newPosition.y < -halfHeight ? halfHeight : newPosition.y;
      } else {
        entity.position.x = newPosition.x;
        entity.position.y = newPosition.y;
      }
    }
  }
}
