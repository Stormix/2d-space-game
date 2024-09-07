import { Engine } from './engine';
import { Component, Entity } from './entity';

export abstract class System {
  engine: Engine;
  components: Component[];

  constructor(engine: Engine, components: Component[]) {
    this.engine = engine;
    this.components = components;
  }

  get entities(): Entity[] {
    return this.engine.world.with(...this.components).entities;
  }

  abstract update(delta: number): void;
}
