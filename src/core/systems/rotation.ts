import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class RotationSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.Rotatable]);
  }

  update() {
    this.entities.forEach((entity) => {
      entity.mesh.rotation.z = entity.rotation;
    });
  }
}
