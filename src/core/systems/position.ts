import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class PositionSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.Positionable]);
  }

  update() {
    this.entities.forEach((entity) => {
      entity.mesh.position.x = entity.position.x;
      entity.mesh.position.y = entity.position.y;
    });
  }
}
