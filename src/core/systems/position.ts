import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class PositionSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.Positionable, Component.Physics]);
  }

  update() {
    this.entities.forEach((entity) => {
      if (entity.mesh.position.x !== entity.position.x || entity.mesh.position.y !== entity.position.y) {
        entity.mesh.position.set(entity.position.x, entity.position.y, 0);
      }
    });
  }
}
