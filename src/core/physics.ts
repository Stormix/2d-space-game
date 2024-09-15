import { Settings, World } from 'planck';

export class PhysicsEngine {
  static #instance: PhysicsEngine;
  readonly world: World = new World();

  private constructor() {
    Settings.lengthUnitsPerMeter = 100;
  }

  static get instance() {
    if (!this.#instance) {
      this.#instance = new PhysicsEngine();
    }

    return this.#instance;
  }

  update(delta: number) {
    this.world.step(delta);
    // this.world.clearForces();
  }
}
