import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class ShootingSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.Shooter, Component.Inputable]);
  }

  update() {
    this.entities.forEach((entity) => {
      entity.shooting = entity.input?.mouseState.left;
    });
  }
}
