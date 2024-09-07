import { Engine } from '../engine';
import { Component, Key } from '../entity';
import { System } from '../system';

export class PlayerMovementSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.Positionable, Component.Moving, Component.Inputable, Component.Rotatable]);
  }

  update(delta: number) {
    for (const entity of this.entities) {
      if (!entity.input) {
        continue;
      }

      if (entity.input.keyState[Key.W] === 'PRESSED') {
        entity.velocity.y = 1;
      }

      if (entity.input.keyState[Key.S] === 'PRESSED') {
        entity.velocity.y = -1;
      }

      if (entity.input.keyState[Key.A] === 'PRESSED') {
        entity.velocity.x = -1;
      }

      if (entity.input.keyState[Key.D] === 'PRESSED') {
        entity.velocity.x = 1;
      }

      if (entity.input.keyState[Key.W] === 'RELEASED' && entity.input.keyState[Key.S] === 'RELEASED') {
        entity.velocity.y = 0;
      }

      if (entity.input.keyState[Key.A] === 'RELEASED' && entity.input.keyState[Key.D] === 'RELEASED') {
        entity.velocity.x = 0;
      }

      // Calculate the rotation of the entity based on the mouse position
      const dx = entity.input.mouseState.position.x - entity.position.x;
      const dy = entity.input.mouseState.position.y - entity.position.y;

      entity.rotation = Math.atan2(dy, dx);
    }
  }
}
