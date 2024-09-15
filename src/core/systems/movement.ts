import { Vec2 } from 'planck';
import { SHIP_SPEED } from '../../config';
import { Engine } from '../engine';
import { Component, Key } from '../entity';
import { System } from '../system';

export class PlayerMovementSystem extends System {
  constructor(engine: Engine) {
    super(engine, [
      Component.Positionable,
      Component.Moving,
      Component.Inputable,
      Component.Rotatable,
      Component.Physics
    ]);
  }

  update() {
    for (const entity of this.entities) {
      if (!entity.input || !entity.physics) {
        continue;
      }

      const forceToApply = new Vec2(0, 0);

      if (entity.input.keyState[Key.W] === 'PRESSED') {
        forceToApply.y = 1;
      }

      if (entity.input.keyState[Key.S] === 'PRESSED') {
        forceToApply.y = -1;
      }

      if (entity.input.keyState[Key.A] === 'PRESSED') {
        forceToApply.x = -1;
      }

      if (entity.input.keyState[Key.D] === 'PRESSED') {
        forceToApply.x = 1;
      }

      if (entity.input.keyState[Key.W] === 'RELEASED' && entity.input.keyState[Key.S] === 'RELEASED') {
        entity.velocity.y = 0;
      }

      if (entity.input.keyState[Key.A] === 'RELEASED' && entity.input.keyState[Key.D] === 'RELEASED') {
        entity.velocity.x = 0;
      }

      entity.lockCamera = entity.input.keyState[Key.Space] === 'PRESSED';

      // Calculate the rotation of the entity based on the mouse position
      const dx = entity.input.mouseState.position.x - entity.position.x;
      const dy = entity.input.mouseState.position.y - entity.position.y;

      entity.rotation = Math.atan2(dy, dx);

      // Apply the force to the entity
      entity.physics.applyForceToCenter(forceToApply.mul(SHIP_SPEED), true);
    }
  }
}
