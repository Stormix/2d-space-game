import { GameStates } from '@/types/state';
import { Scene } from 'three';
import type { Engine } from './engine';

export class GameState {
  readonly engine: Engine;
  readonly name: GameStates; // The name of the state
  scene: Scene; // The scene to render

  constructor(name: GameStates, engine: Engine) {
    this.name = name;
    this.engine = engine;
    this.scene = new Scene();
  }

  enter() {
    // Called when entering the state
  }
  exit() {
    // Called when exiting the state
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_delta: number) {
    // Called every frame
  }

  render() {
    this.engine.renderer.render(this.scene, this.engine.camera);
  }
}
