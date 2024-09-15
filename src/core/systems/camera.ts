import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class CameraSystem extends System {
  constructor(engine: Engine) {
    super(engine, [Component.CameraLocked]);
  }

  update() {
    for (const entity of this.entities) {
      if (entity.lockCamera) {
        this.engine.camera.position.set(entity.position.x, entity.position.y, 6);
      }
    }
  }
}
