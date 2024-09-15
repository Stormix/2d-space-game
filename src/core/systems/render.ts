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
        const cachedColor = this.cache.get(id);
        if (!cachedColor) this.cache.set(id, entity.color);
        entity.color = 0xff0000;
      } else {
        const originalColor = this.cache.get(id);
        if (originalColor) {
          entity.color = originalColor;
        }
      }
    });
  }
}
