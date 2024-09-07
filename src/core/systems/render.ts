import { MeshBasicMaterial } from 'three';
import { Engine } from '../engine';
import { Component } from '../entity';
import { System } from '../system';

export class RenderSystem extends System {
  cache = new Map<number, number>();

  constructor(engine: Engine) {
    super(engine, [Component.Shooter, Component.Renderable]);
  }

  update() {
    this.entities.forEach((entity) => {
      const id = this.engine.world.id(entity)!;
      // Change color of entity based on shooting state
      if (entity?.shooting) {
        const originalColor = (entity.mesh.material as MeshBasicMaterial).color.getHex();
        const cachedColor = this.cache.get(id);
        if (!cachedColor) this.cache.set(id, originalColor);
        (entity.mesh.material as MeshBasicMaterial).color.setHex(0xff0000);
      } else {
        const originalColor = this.cache.get(id);
        if (originalColor) (entity.mesh.material as MeshBasicMaterial).color.setHex(originalColor);
      }
    });
  }
}
